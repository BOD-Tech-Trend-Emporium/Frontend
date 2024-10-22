import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarUserSectionComponent } from '@components/navbar-user-section/navbar-user-section.component';
import { User } from '@entities/User.entity';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NavbarUserSectionComponent,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isLoggedIn: boolean = false;  
  isDropdownOpen = false; 

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen; // Toggle the dropdown
    console.log(this.isDropdownOpen)
  }

}
