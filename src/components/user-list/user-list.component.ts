import { Component, inject } from '@angular/core';
import { UserService } from '@services/user/user.service';
import { ProductComponent } from '@components/product/product.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  users: any = [];
  userService: UserService = inject(UserService);

  constructor() {
    this.users = this.userService.getAllUsers();
  }
}
