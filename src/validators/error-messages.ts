import { AbstractControl } from '@angular/forms';

export const basicErrorMessage = (
  control: AbstractControl | null
): string | null => {
  if (control?.errors) {
    if (control.errors['required']) {
      return 'This field is required';
    }
    if (control.errors['minlength']) {
      return `Include at least ${control.errors['minlength'].requiredLength} characteres`;
    }
    if (control.errors['upperCase']) {
      return 'Include uppercase characters';
    }
    if (control.errors['lowerCase']) {
      return 'Include lowercase characters';
    }
    if (control.errors['number']) {
      return 'Include numbers';
    }
    if (control.errors['specialChar']) {
      return 'Include an special character';
    }
    if (control.errors['email']) {
      return 'Email not valid';
    }
    if (control.errors['passwordsMismatch']) {
      return "Passwords don't match";
    }
  }

  return null;
};
