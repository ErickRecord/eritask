import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form: FormGroup;
  isObscure = true;
  constructor(
    private formBuilder: FormBuilder,
    private authentication: AuthenticationService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.pattern("[a-zA-ZáéíóúÁÉÍÓÚüÜ\s]+")]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordsNotMatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }

  }

  changeObscureText() {
    this.isObscure = !this.isObscure;
  }

  onSubmit() {
    if (this.form.valid) {
      this.authentication.register()
    }
  }
}
