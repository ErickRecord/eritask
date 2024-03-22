import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private router: Router
  ) { }

  async fakeEmailValidation(email: string): Promise<boolean> {
    const validEmails = ['eri@outlook.com', 'example@example.com'];
    await new Promise(resolve => setTimeout(resolve, 1000));

    return validEmails.includes(email);
  }

  async login() {
    // Login logic
    this.router.navigate(["/home"]);

  }
  async register() {
    // Register logic
    this.router.navigate(["/home"]);

  }
  async forgotPassword() {
    // Register logic
    this.router.navigate(["/authentication/login"]);

  }

}
