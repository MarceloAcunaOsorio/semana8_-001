import { AbstractControl, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ErrorStateMatcher } from '@angular/material/core';

const patternPassword = new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\\W).{8}');



/*La contraseña debe contener al menos un número y al menos una letra en mayúscula */
export const customPasswordValidator = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!patternPassword.test(value)) {
        return { customPasswordValidator: true }
    }

    return null
}


/* 
 * Funcion para validar los campos del password1 y password2
 * @param formGroupControl
 * @returns
*/
export const crossPasswordMatchingValidatior: ValidatorFn = (
    formGroupControl: AbstractControl<{ password1: string; password2: string }>
): ValidationErrors | null => {
    const password1 = formGroupControl.value.password1;
    const password2 = formGroupControl.value.password2;

    return password1 !== password2 ? { crossConfirmPasswordError: true } : null
}


export class PasswordStateMatcher implements ErrorStateMatcher {
	isErrorState(control: AbstractControl, form: FormGroupDirective | NgForm): boolean {
		if (!control || !control.parent) {
			return false;
		}
		return control.parent.hasError('crossConfirmPasswordError');
	}
}