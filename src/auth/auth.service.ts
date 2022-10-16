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

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user){
      throw new HttpException ("User not found", HttpStatus.NOT_FOUND)
    }
    const decryptedText = await this.utilsService.decrypt(user.password)
    if (user && decryptedText === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user:any){
    const payload = { email:user.email, sub: user.id}
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}