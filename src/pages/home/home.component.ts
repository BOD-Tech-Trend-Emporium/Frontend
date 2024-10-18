import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
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
