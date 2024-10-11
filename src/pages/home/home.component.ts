import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from './../../environments/environment';
import { NavbarComponent } from '@components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  currentEnvironment = environment;
}
