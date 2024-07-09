import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebasUnitariasComponent } from './pruebas-unitarias.component';
import { FormGroup } from '@angular/forms';

describe('PruebasUnitariasComponent', () => {
  let component: PruebasUnitariasComponent;
  let fixture: ComponentFixture<PruebasUnitariasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebasUnitariasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PruebasUnitariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('debe crear un formulario de registro valido', () => 
    {
      expect(component.miFormulario).toBeDefined();
      expect(component.miFormulario instanceof FormGroup).toBeTruthy();
      expect(component.miFormulario.get('nombre')).toBeDefined();
      expect(component.miFormulario.get('usuario')).toBeDefined();
      expect(component.miFormulario.get('email')).toBeDefined();
      expect(component.miFormulario.get('password1')).toBeDefined();
      expect(component.miFormulario.get('password2')).toBeDefined();
      expect(component.miFormulario.get('fechanac')).toBeDefined();
      expect(component.miFormulario.get('direccion')).toBeDefined();
    })



    it('debe marcar los campos como invalidos cuando estan vacios',() =>
      {
        const nombreControl = component.miFormulario.get('nombre');
        const usuarioControl = component.miFormulario.get('usuario');
        const emailControl = component.miFormulario.get('email');
        const password1Control = component.miFormulario.get('password1');
        const password2Control = component.miFormulario.get('password2');
        const fechanacControl = component.miFormulario.get('fechanac');
        const direccionControl = component.miFormulario.get('direccion');
    
        expect(nombreControl?.invalid).toBeTruthy();
        expect(usuarioControl?.invalid).toBeTruthy();
        expect(emailControl?.invalid).toBeTruthy();
        expect(password1Control?.invalid).toBeTruthy();
        expect(password2Control?.invalid).toBeTruthy();
        expect(fechanacControl?.invalid).toBeTruthy();
        expect(direccionControl?.invalid).toBeTruthy();
      })
    

      it('debe marcar el campo email como valido con una direccion de correo electronico valido',() =>
        {
          const emailControl = component.miFormulario.get('email');
          emailControl?.setValue('test@ejemplo.com');
          expect(emailControl?.valid).toBeTruthy();
        })
      
      
        it('debe marcar el campo password como valido con una contraseña de al menos 6 caracteres',() =>
        {
          const password1Control = component.miFormulario.get('password1');
          password1Control?.setValue('@passwordAA234%');
          expect(password1Control?.valid).toBeTruthy();
        })
      
      
      
        it('debe llamar a la funcion submitForm cuando el formulario se envia con datos validos',()=>
        {
          spyOn(component, 'submitForm');
          const nombreControl = component.miFormulario.get('nombre');
          const usuarioControl = component.miFormulario.get('usuario');
          const emailControl = component.miFormulario.get('email');
          const password1Control = component.miFormulario.get('password1');
          const password2Control = component.miFormulario.get('password2');
          const fechanacControl = component.miFormulario.get('fechanac');
          const direccionControl = component.miFormulario.get('direccion');
      
      
          nombreControl?.setValue('Juan Pedro');
          usuarioControl?.setValue('jpedro');
          emailControl?.setValue('juanpedro@ejemplo.com');
          password1Control?.setValue('A23wsder@4%');
          password2Control?.setValue('A23wsder@4%');
          fechanacControl?.setValue('03/05/2000');
          direccionControl?.setValue('');
      
          const formsElement: HTMLFormElement = fixture.nativeElement.querySelector('form')
          formsElement.dispatchEvent(new Event('submit'));
          fixture.detectChanges();
          expect(component.submitForm).toHaveBeenCalled();
      
        });

});
