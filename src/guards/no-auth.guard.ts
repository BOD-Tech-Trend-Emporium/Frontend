import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.getUserData().pipe(
      map((userData) => !userData),
      tap((isNotAuthenticated) => {
        if (!isNotAuthenticated) {
          this.router.navigate(['/']);
        }
      })
    );
  }
}
