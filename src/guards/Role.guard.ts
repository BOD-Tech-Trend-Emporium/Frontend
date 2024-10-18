import { Injectable } from '@angular/core';
import { decodeToken } from '@utils/jwt';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const validRoles = route.data['validRoles'];
    return this.authService.getUserData().pipe(
      map((userData) => {
        if (userData) {
          const tokenData = decodeToken(userData?.token);
          const userRole =
            tokenData[
              'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
            ];
          if (validRoles.includes(userRole)) {
            return true;
          }
          this.router.navigate(['/login']);
          return false;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
