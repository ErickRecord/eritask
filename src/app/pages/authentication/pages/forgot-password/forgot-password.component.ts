import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent  implements OnInit {
  opt:number = 0;
  form: FormGroup;
  isObscure = true;
  constructor(
    private formBuilder: FormBuilder,
    private authentication: AuthenticationService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      code: [''],
      newPassword: [''],
    });
  }
  ngOnInit() {}

  onSubmit() {
    
    if (this.form.valid) {
      this.opt++;
      if(this.opt == 3){
        this.authentication.forgotPassword()
      }
    }
    console.log(this.opt);
    
  }

}
