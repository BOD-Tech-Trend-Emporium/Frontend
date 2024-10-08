import { Component, inject } from '@angular/core';
import { User } from '../../entities/User.entity';
import { UserService } from '../../services/user.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [ProductComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent {
  users: User[] = [];
  userService: UserService = inject(UserService);

  constructor() {
    this.users = this.userService.getAllUsers();
  }
}
