import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarUserSectionComponent } from '@components/navbar-user-section/navbar-user-section.component';
import { UserEntity } from '@entities/User.entity';
import { AuthService } from '@services/auth/auth.service';
import { decodeToken } from '@utils/jwt';
import { firstValueFrom, take } from 'rxjs';
import { ActionButtonComponent } from '../buttons/action-button/action-button.component';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NavbarUserSectionComponent,
    CommonModule,
    RouterLink,
    ActionButtonComponent,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  router: Router = inject(Router);
  isLoggedIn: boolean = true;
  user: any = {};
  isDropdownOpen = false;
  private authService: AuthService = inject(AuthService);

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen; // Toggle the dropdown
    console.log(this.isDropdownOpen);
  }
  async getUserData() {
    try {
      const response = await firstValueFrom(
        this.authService.getUserData().pipe(take(1))
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  searchProduct(value: string) {
    this.router.navigate(['/shoplist'], { queryParams: { title: value } });
  }

  ngOnInit(): void {
    this.authService.getUserData().subscribe((i) => {
      if (i == null) {
        this.isLoggedIn = false;
        return;
      }
      const decodedToken = decodeToken(i?.token);
      this.user = {
        role: decodedToken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ],
        id: decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ],
        email:
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
          ],
        userName: i.userName,
      };
      this.isLoggedIn = true;
    });
  }
}
