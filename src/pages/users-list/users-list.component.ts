import { Component, inject } from '@angular/core';
import { LoaderComponent } from '../../components/loader/loader.component';
import { CustomTableComponent } from '../../components/custom-table/custom-table.component';
import { UserService } from '@services/user/user.service';
import { UserEntity } from '@entities/User.entity';
import { AxiosError } from 'axios';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [LoaderComponent, CustomTableComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  isLoading: boolean = false;
  userService: UserService = inject(UserService);
  toastr: ToastrService = inject(ToastrService);
  rows = ['ID', 'EMAIL', 'TYPE', 'CREATED'];
  usersList: Partial<UserEntity>[] = [];

  transformUsers(users: UserEntity[]) {
    return users.map((i) => {
      return {
        id: i.id,
        emai: i.email,
        type: i.role,
        created: i.createdAt,
      };
    });
  }

  async getUsersList() {
    const users: UserEntity[] | AxiosError = await this.userService.getAll();
    if ('message' in users) {
      this.toastr.error(users.message, 'Error');
    } else {
      const transformedProducts = this.transformUsers(users);
      this.usersList = transformedProducts;
    }
    this.isLoading = false;
  }

  ngOnInit() {
    this.getUsersList();
  }
}
