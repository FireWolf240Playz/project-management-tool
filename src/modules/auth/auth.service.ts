import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login(loginDto: any) {
    return { message: 'Login successful', user: loginDto };
  }
}
