import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { UserModel } from 'src/models/user.model';

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

  async onSubmit() {
    if (this.form.valid) {
      const email = this.form.get('email')?.value ?? "";
      const password = this.form.get('password')?.value ?? "";
      const name = this.form.get('name')?.value ?? "";
      let user: UserModel = {
        name,
        email,
        password
      };
      await this.authentication.register(user);
    }
  }
}
