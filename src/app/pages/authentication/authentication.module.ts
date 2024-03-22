import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthenticationPageRoutingModule } from './authentication-routing.module';

import { AuthenticationPage } from './authentication.page';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthenticationService } from './services/authentication.service';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthenticationPageRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationService],
  declarations: [AuthenticationPage, LoginComponent, RegisterComponent, ForgotPasswordComponent]
})
export class AuthenticationPageModule { }
