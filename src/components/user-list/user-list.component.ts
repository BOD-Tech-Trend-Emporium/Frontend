import { Component, inject } from '@angular/core';
import { User } from '../../entities/User.entity';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  users: User[] = [];
  userService: UserService = inject(UserService);

  constructor() {
    this.users = this.userService.getAllUsers();
  }
}
