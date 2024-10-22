import { CommonModule } from '@angular/common';
import { Component, inject, Input, input } from '@angular/core';
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
  @Input() user: any = {}

  
}
