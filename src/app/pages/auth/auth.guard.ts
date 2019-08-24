import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(
      (resolve, reject) => {
        if (this.authService.checkLogged()) {
          resolve(true);
        } else {
          this.authService.checkAuth().subscribe(
            (response) => {
              resolve(true);
            },
            (error) => {
              this.router.navigate(['/auth/login']);
              resolve(false);
            }
          );
        }
      }
    );
  }
}
