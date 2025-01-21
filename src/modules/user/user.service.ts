import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private users = [{ id: '1', name: 'John Doe' }];

  getUserById(id: string) {
    return this.users.find((user) => user.id === id);
  }
}
