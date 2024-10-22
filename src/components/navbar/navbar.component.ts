import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarUserSectionComponent } from '@components/navbar-user-section/navbar-user-section.component';
import { UserEntity } from '@entities/User.entity';
import { AuthService } from '@services/auth/auth.service';
import { decodeToken } from '@utils/jwt';
import { firstValueFrom, take } from 'rxjs';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NavbarUserSectionComponent,
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: boolean = true;
  user: any = {} 
  isDropdownOpen = false;
  private authService: AuthService = inject(AuthService);

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen; // Toggle the dropdown
    console.log(this.isDropdownOpen)
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

  async handleUserData(){
    const userData = await this.getUserData()
    console.log(userData)
    if (userData){
      //const user = decodeToken(userData?.token)
    }
  }

  ngOnInit(): void {
    this.authService.getUserData().subscribe((i) => {
      console.log(i)
      if( i == null){
        this.isLoggedIn = false
        return
      }
      const decodedToken = decodeToken(i?.token)
      this.user = {
        role: decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        id: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
        email: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        userName: i.userName,
      };
      console.log(this.user)
      this.isLoggedIn = true
    });
  }

}
