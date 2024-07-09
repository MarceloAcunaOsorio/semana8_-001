import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordStateMatcher, crossPasswordMatchingValidatior, customPasswordValidator } from '../registrar/register-custom-Validators';

@Component({
  selector: 'app-pruebas-unitarias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pruebas-unitarias.component.html',
  styleUrl: './pruebas-unitarias.component.css'
})
export class PruebasUnitariasComponent {


  passwordStateMatcher = new PasswordStateMatcher();
  miFormulario!: FormGroup;
  constructor(private fb: FormBuilder) { }



  ngOnInit(): void {
    this.miFormulario = this.fb.group({
      nombre   : ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      usuario  : ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      correo   : ['', [Validators.required, Validators.email]],
      password1: ['', [customPasswordValidator, Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      password2: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      fechanac : ['', [Validators.required]],
      Direccion: ['']
    }, 
    {validators: crossPasswordMatchingValidatior})
  }



  submitForm() {
    if (this.miFormulario.valid) {
      console.log("Nombre: " + this.miFormulario.get('nombre')!.value);
      console.log("Usuario: " + this.miFormulario.get('usuario')!.value);
      console.log("Email: " + this.miFormulario.get('correo')!.value);
      console.log("Fecha Nacimiento: " + this.miFormulario.get('fechanac')!.value);
      console.log("Direccion: " + this.miFormulario.get('direccion')!.value);
    }
  }

}
