import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserDataEntity } from '@entities/UserData.entity';
import { AuthService } from '@services/auth/auth.service';
import { decodeToken } from '@utils/jwt';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  userData: UserDataEntity | null = null;
  authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.authService.getUserData().subscribe((i) => {
      this.userData = i;
    });
  }

  getOptionsList() {
    const tokenData = decodeToken(this.userData?.token);
    const userRole =
      tokenData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    if (userRole === 'Admin') {
      return this.optionsForAdmin;
    }
    return this.optionsForEmployee;
  }

  optionsForEmployee = [
    {
      name: 'Create Product',
      link: '/create-product',
    },
    {
      name: 'Create Category',
      link: '/create-category',
    },
    {
      name: 'List Products',
      link: '/products-list',
    },
    {
      name: 'List Categories',
      link: '/categories-list',
    },
  ];

  optionsForAdmin = [
    {
      name: 'Create Product',
      link: '/create-product',
    },
    {
      name: 'Create Category',
      link: '/create-category',
    },
    {
      name: 'List Products',
      link: '/products-list',
    },
    {
      name: 'List Categories',
      link: '/categories-list',
    },
    {
      name: 'Create Employee',
      link: '/create-employee',
    },
    {
      name: 'View All Users',
      link: '/users-list',
    },
  ];
}
