import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      map(user => {
        if (user) {
          return true; // Si hay un usuario autenticado, permitir la navegación
        } else {
          // Si no hay un usuario autenticado, redirigir al usuario a la página de autenticación y denegar la navegación
          this.router.navigate(['/authentication']);
          return false;
        }
      })
    );
  }
}
