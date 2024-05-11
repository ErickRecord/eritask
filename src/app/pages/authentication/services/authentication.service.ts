import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { UserModel } from 'src/models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from 'src/app/common/services/firebase.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    private router: Router,
    private authFirebase: AngularFireAuth,
    private firebase: FirebaseService,
  ) { }

  async login(email: string, password: string) {
    try {
      const userCredential = await this.authFirebase.signInWithEmailAndPassword(email, password);
      const token = (await userCredential.user?.getIdTokenResult())!.token;
      localStorage.setItem("token", token);
      this.router.navigate(['/home']);
    } catch (_) { }
  }
  async register(user: UserModel) {
    // Register logic
    try {
      const userCredential = await this.authFirebase.createUserWithEmailAndPassword(user.email, user.password);
      const token = (await userCredential.user?.getIdTokenResult())!.token;
      localStorage.setItem("token", token);
      user.idUser = userCredential.user?.uid;
      this.firebase.createDoc(user, "Users", user.idUser!);
      console.log(userCredential);

      this.router.navigate(["/home"]);
    } catch (_) { }
  }
  async forgotPassword() {
    // Register logic
    this.router.navigate(["/authentication/login"]);

  }

}
