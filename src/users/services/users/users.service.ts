import { Injectable } from '@nestjs/common';
import { CreateUserType } from 'src/users/utils/types';

@Injectable()
export class UsersService {
  private users = [{ username: 'keevsz', email: 'kevsz@gmail.com' }];
  fetchUsers() {
    return this.users;
  }
  createUser(user: CreateUserType) {
    return this.users.push(user);
  }
  fetchUserById(id: number) {
    return { id, username: 'kevsz', email: 'asd@gmail.com' };
  }
}
