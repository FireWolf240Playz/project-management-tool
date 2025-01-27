import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('generate-token')
  generateToken(@Body() payload: any): string {
    return this.appService.generateJwt(payload);
  }

  @Get('decode-token')
  decodeToken(@Query('token') token: string): any {
    return this.appService.decodeJwt(token);
  }

  @Get('verify-token')
  verifyToken(@Query('token') token: string): any {
    return this.appService.verifyJwt(token);
  }
}
