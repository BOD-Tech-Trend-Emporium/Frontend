import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: boolean = true;  // You would fetch this from an authentication service
  isShopper: boolean = true;   // Define user role based on user data
  isEmployee: boolean = false; // Define user role based on user data
  username: string = 'JohnDoe'; // Fetch username dynamically

  logout() {
    // Handle logout logic here
  }
}
