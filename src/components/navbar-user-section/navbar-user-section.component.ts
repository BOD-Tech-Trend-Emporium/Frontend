import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserEntity } from '@entities/User.entity';
import { AuthService } from '@services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { routes } from 'src/app/app.routes';
import { environment } from 'src/environments/environment.local';

@Component({
  selector: 'app-navbar-user-section',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar-user-section.component.html',
  styleUrl: './navbar-user-section.component.css'
})
export class NavbarUserSectionComponent {
  authService: AuthService = inject(AuthService);
  toastr: ToastrService = inject(ToastrService);
  router: Router = inject(Router);

  user: UserEntity= {
    email : "Example@Email",
    id: "8EF5E519-C5A0-47BA-3D0B-08DCEF596F78",
    userName: "JohnDoe",
    role:'Shooper',
    createdAt:'2024-05-17',
    name: 'Diego'
  }



  async handleLogout() {
    const response: any = await this.authService.logout();
    if (response.data) {
      this.toastr.success('Logout successfully');
    } else {
      this.toastr.error('Somethign went wrong, try again');
    }
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 500);
  }


}
