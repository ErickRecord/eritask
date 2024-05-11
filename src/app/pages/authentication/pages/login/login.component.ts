import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isObscure = true;

  isLoading = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() { }

  changeObscureText() {
    this.isObscure = !this.isObscure;

  }

  async onSubmit() {
    const email = this.form.controls["email"].value;
    const password = this.form.controls["password"].value;
    try {
      if (this.form.controls["password"].valid) {
        this.authenticationService.login(email, password);
      }
    } catch (error) {
      console.error("Error al validar el correo:", error);
    }
  }


  async snackBar(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }


}
