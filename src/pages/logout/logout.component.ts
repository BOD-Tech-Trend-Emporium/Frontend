import { Component, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { AuthService } from '@services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  authService: AuthService = inject(AuthService);
  toastr: ToastrService = inject(ToastrService);
  router: Router = inject(Router);

  ngOnInit() {
    this.handleLogout();
  }

  async handleLogout() {
    const response: any = await this.authService.logout();
    if (response.data) {
      this.toastr.success('Logout successfully');
    } else {
      this.toastr.error('Somethign went wrong, try again');
    }
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 500);
  }
}
