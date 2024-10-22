import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarUserSectionComponent } from '@components/navbar-user-section/navbar-user-section.component';
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
  isDropdownOpen = false; 

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen; // Toggle the dropdown
    console.log(this.isDropdownOpen)
  }

}
