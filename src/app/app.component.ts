import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Frontend';
  authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.authService.loadUserTokenFromStorage();
    this.authService.getUserToken().subscribe();
  }
}
