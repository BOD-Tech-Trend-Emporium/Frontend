import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '@entities/User.entity';
import { routes } from 'src/app/app.routes';
import { environment } from 'src/environments/environment.local';

@Component({
  selector: 'app-navbar-user-section',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './navbar-user-section.component.html',
  styleUrl: './navbar-user-section.component.css'
})
export class NavbarUserSectionComponent {

  user: User= {
    email : "Example@Email",
    id: "8EF5E519-C5A0-47BA-3D0B-08DCEF596F78",
    username: "JohnDoe",
    role:'Admin'
  }

  logout() {
    const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage

    fetch(`${environment.apiUrl}/api/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Logout failed');
      }
      return response.json(); // You can process the response if needed
    })
    .then(() => {
      // Clear user data on successful logout
      localStorage.removeItem('token'); // Remove token from local storage
      // Reload
    })
    .catch(err => {
      console.error('Error:', err); // Handle error if necessary
    });
  }


}
