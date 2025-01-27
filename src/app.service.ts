import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private readonly jwtService: JwtService) {}

  decodeJwt(token: string): any {
    return this.jwtService.decode(token);
  }

  verifyJwt(token: string): any {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET || 'default_secret',
      });
    } catch (err) {
      throw new Error('Invalid token');
    }
  }

  generateJwt(payload: any): string {
    return this.jwtService.sign(payload);
  }
}
