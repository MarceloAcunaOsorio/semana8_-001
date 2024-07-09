const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} = require("firebase/storage");
const cors = require("cors");

const app = express();

//CORS
app.use(cors());

// Middleware
app.use(express.json());


//Configuracion de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAKGXF1Ag5ZDOMkHo1sGB6_O3sYaOISdnE",
    authDomain: "json-8e5a0.firebaseapp.com",
    databaseURL: "https://json-8e5a0-default-rtdb.firebaseio.com",
    projectId: "json-8e5a0",
    storageBucket: "json-8e5a0.appspot.com",
    messagingSenderId: "245756611457",
    appId: "1:245756611457:web:b9d2d9b57bd005639c7680"
  };


  // Inicializar Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

// Configuración de Multer para subir archivos
const upload = multer({ storage: multer.memoryStorage() });

// Conexión a MongoDB Atlas
const dbName = "users";
mongoose
  .connect(
     `mongodb+srv://macuna:Perseo30@cluster0.biq3f4m.mongodb.net/${dbName}`
    //`mongodb+srv://carlvalverde:Dp82TP3WKKQANTyM@instaclone.lxylzcp.mongodb.net/${dbName}`
  )
  .then(() => console.log(`Conexión exitosa a MongoDB Atlas: ${dbName}`))
  .catch((err) => console.error("Error de conexión a MongoDB:", err));

  // Modelo de Usuario actualizado
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  name: String,
  token: String,
  profileInfo: {
    birthdate: Date,
    title: String,
    description: String,
  },
  profilePicUrl: String,
  followers: String,
  following: String,
  postPhotos: [String],
});

const User = mongoose.model("User", UserSchema);

// Funciones auxiliares
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "tu_secreto_jwt", { expiresIn: "3h" });
};

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Acceso denegado" });
  jwt.verify(token, "tu_secreto_jwt", (err, user) => {
    if (err) return res.status(403).json({ error: "Token inválido" });
    req.user = user;
    next();
  });
};

async function uploadFileToFirebase(file, path) {
    const fileBuffer = file.buffer;
    const filename = Date.now() + "-" + file.originalname;
    const fullPath = path + "/" + filename;
    const storageRef = ref(storage, fullPath);
    await uploadBytes(storageRef, fileBuffer);
    return await getDownloadURL(storageRef);
  }
  
  // Endpoints
  
  // Registro de usuario
  app.post("/register", async (req, res) => {
    try {
      const { username, password, email, name, birthdate } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const token = generateToken(username);
  
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        name,
        token,
        profileInfo: {
          birthdate,
          title: "",
          description: "",
        },
        profilePicUrl: "",
        followers: "0",
        following: "0",
        postPhotos: [],
      });
  
      await newUser.save();
      res.status(201).json({ message: "Usuario registrado exitosamente", token });
    } catch (error) {
      res.status(500).json({ error: "Error al registrar usuario" });
    }
  });
  
  // Login
  app.post("/login", async (req, res) => {
    try {
      const { userOrEmail, password } = req.body;
      const user = await User.findOne({
        $or: [{ username: userOrEmail }, { email: userOrEmail }],
      });
  
      if (!user) return res.status(400).json({ error: "Usuario no encontrado" });
  
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(400).json({ error: "Contraseña incorrecta" });
  
      const token = generateToken(user._id);
      user.token = token;
      await user.save();
  
      res.json({ message: "Login exitoso", token });
    } catch (error) {
      res.status(500).json({ error: "Error en el login" });
    }
  });
  
  // Obtener perfil de usuario
  app.get("/profile", authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener perfil" });
    }
  });
  
  // Actualizar datos de usuario
  app.put("/profile", authenticateToken, async (req, res) => {
    try {
      const { name, email, username, profileInfo } = req.body;
  
      if (username) {
        const existingUser = await User.findOne({ username });
        if (existingUser && existingUser._id.toString() !== req.user.id) {
          return res.status(400).json({ error: "Nombre de usuario ya existe" });
        }
      }
  
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { name, email, username, profileInfo },
        { new: true, runValidators: true }
      ).select("-password");
  
      if (!updatedUser) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
  
      res.json(updatedUser);
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Error al actualizar perfil" });
    }
  });
  
  // Cambiar contraseña
  app.put("/change-password", authenticateToken, async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = await User.findById(req.user.id);
  
      const validPassword = await bcrypt.compare(oldPassword, user.password);
      if (!validPassword)
        return res.status(400).json({ error: "Contraseña actual incorrecta" });
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      res.json({ message: "Contraseña actualizada exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al cambiar la contraseña" });
    }
  });
  
  // Subir foto de perfil
  app.post(
    "/upload-profile-pic",
    authenticateToken,
    upload.single("profilePic"),
    async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({ error: "No se subió ningún archivo" });
        }
  
        const user = await User.findById(req.user.id);
        const profilePicUrl = await uploadFileToFirebase(
          req.file,
          `users/${user.username}/profile`
        );
  
        user.profilePicUrl = profilePicUrl;
        await user.save();
  
        res.json({ message: "Foto de perfil actualizada", profilePicUrl });
      } catch (error) {
        res
          .status(500)
          .json({ error: "Error al subir la foto de perfil - " + error.message });
      }
    }
  );
  
  // Subir foto de post
  app.post(
    "/upload-post-photo",
    authenticateToken,
    upload.single("postPhoto"),
    async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({ error: "No se subió ningún archivo" });
        }
  
        const user = await User.findById(req.user.id);
        const postPhotoUrl = await uploadFileToFirebase(
          req.file,
          `users/${user.username}/posts`
        );
  
        user.postPhotos.push(postPhotoUrl);
        await user.save();
  
        res.json({ message: "Foto de post subida", postPhotoUrl });
      } catch (error) {
        res.status(500).json({ error: "Error al subir la foto del post" });
      }
    }
  );
  
  // Eliminar usuario
  app.delete("/profile", authenticateToken, async (req, res) => {
    try {
      await User.findByIdAndDelete(req.user.id);
      // Aquí podrías agregar lógica para eliminar las carpetas del usuario en Firebase Storage
      res.json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar usuario" });
    }
  });
  
  // Eliminar foto de post
  app.delete("/delete-post-photo", authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const photoUrl = req.body.photoUrl;
      
      const index = user.postPhotos.indexOf(photoUrl);
      if (index > -1) {
        // Eliminar la foto de Firebase Storage
        const storage = getStorage(firebaseApp);
        const photoRef = ref(storage, photoUrl);
        
        try {
          await deleteObject(photoRef);
          console.log('Foto eliminada de Firebase Storage');
        } catch (firebaseError) {
          console.error('Error al eliminar la foto de Firebase Storage:', firebaseError);
        }
  
        // Eliminar la referencia de la foto en la base de datos
        user.postPhotos.splice(index, 1);
        await user.save();
        
        res.json({ message: "Foto de post eliminada exitosamente" });
      } else {
        res.status(404).json({ error: "Foto no encontrada" });
      }
    } catch (error) {
      console.error('Error al eliminar la foto del post:', error);
      res.status(500).json({ error: "Error al eliminar la foto del post" });
    }
  });
  
  // Iniciar el servidor
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
  