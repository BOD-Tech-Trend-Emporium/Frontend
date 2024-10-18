import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserDataEntity } from '@entities/UserData.entity';
import { AuthService } from '@services/auth/auth.service';
import { environment } from '@environments/environment.local';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  userData: UserDataEntity | null = null;
  title = 'Frontend';
  authService: AuthService = inject(AuthService);

  ngOnInit(): void {
    this.authService.loadUserTokenFromStorage();
    this.authService.getUserData().subscribe((i) => {
      this.userData = i;
      this.handleReloadPage(this.userData);
    });
  }

  handleReloadPage = (userData: UserDataEntity | null) => {
    const storedUser = localStorage.getItem('userData');
    if (!storedUser && userData) {
      window.addEventListener('beforeunload', function (event) {
        event.preventDefault();
        fetch(`${environment.apiUrl}/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.token}`,
          },
          body: '',
          keepalive: true, // Hace que la petición continúe incluso si la página se está cerrando
        });
      });
    }
  };
}
