import { Controller, Request, Post, Get, UseGuards, Body } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-guard';
import { JwtAuthGuard } from './auth/jwt-authguard';
import { UserLoginDto } from './dto/user-login.dto';
@Controller()
export class AppController {
  constructor(
    private authService : AuthService,
  ){}

  @Post('auth/login')
  async login(  @Body() user: UserLoginDto) {
    return this.authService.login(user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    console.log(req)
    return req.user;
  }
}
