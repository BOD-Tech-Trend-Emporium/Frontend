import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  protected UsersList: any[] = [];

  constructor() {}

  getAllUsers(): any[] {
    //Mock fetched data
    const data = [
      { id: '1', email: 'uno@gmail.com', username: 'uno' },
      { id: '2', email: 'dos@gmail.com', username: 'dos' },
    ];

    this.UsersList = data;
    return this.UsersList;
  }
}
