import { 
  Injectable,
  HttpException,
  HttpStatus,
 } from '@nestjs/common';
import { utilsService } from 'src/utils/utils';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private utilsService:utilsService
    ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user){
      throw new HttpException ("User not found", HttpStatus.NOT_FOUND)
    }
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(data:any){
    const user = await this.usersService.findOne(data.email);
    const payload = { username:user.fullname, sub: user.id}
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}