import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserDataEntity } from '@entities/UserData.entity';
import { AuthService } from '@services/auth/auth.service';
import { environment } from '@environments/environment.local';
import { NavbarComponent } from '@components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
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
    });
  }
}
