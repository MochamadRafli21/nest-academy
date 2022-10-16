import { Controller, Request, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-guard';
import { JwtAuthGuard } from './auth/jwt-authguard';


@Controller()
export class AppController {
  constructor(
    private authService : AuthService,
  ){}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
