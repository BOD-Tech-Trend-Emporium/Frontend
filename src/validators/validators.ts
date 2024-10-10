import { AbstractControl, ValidationErrors } from '@angular/forms';

export const upperCaseValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const hasUpperCase = /[A-Z]+/.test(control.value);
  return hasUpperCase ? null : { upperCase: true };
};

export const lowerCaseValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const hasLowerCase = /[a-z]+/.test(control.value);
  return hasLowerCase ? null : { lowerCase: true };
};

export const numberValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const hasNumber = /[0-9]+/.test(control.value);
  return hasNumber ? null : { number: true };
};

export const specialCharValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const hasSpecialChar = /[@$!%*?&]+/.test(control.value);
  return hasSpecialChar ? null : { specialChar: true };
};

export const passwordsMatchValidator = (control: AbstractControl) => {
  const password = control.get('password');
  const repeatPassword = control.get('repeatPassword');

  if (!password || !repeatPassword) {
    return null;
  }
  console.log(repeatPassword);

  if (!repeatPassword.touched) {
    return null;
  }

  return password.value === repeatPassword.value
    ? null
    : { passwordsMismatch: true };
};
