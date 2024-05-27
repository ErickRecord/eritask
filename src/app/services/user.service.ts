import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserModel } from 'src/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user?: UserModel;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  // Verifica si el usuario está autenticado.
  async isLogin() {
    return this.afAuth.authState.subscribe(user => { // Se subscribe al estado de autenticación de AngularFire
      return this.user = user ? { // Si hay un usuario autenticado, asigna sus datos al usuario actual
        idUser: user.uid,
        name: user.displayName || '',
        email: user.email || '',
        password: ''
      } : undefined; // Si no hay un usuario autenticado, asigna undefined al usuario actual
    });
  }

  // Cierra la sesión del usuario.
  async logout() {
    try {
      await this.afAuth.signOut(); // Cierra la sesión usando AngularFireAuth
      this.router.navigate(["/authentication"]); // Navega al componente de autenticación
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

}
