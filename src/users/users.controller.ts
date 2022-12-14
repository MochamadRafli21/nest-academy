import { 
    Controller,
    Post,
    Body
 } from '@nestjs/common';
 import { UsersService } from './users.service';
 import { CreateUserDto } from '../dto/user-create.dto';


@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
    ) {}

    @Post()
    async registerUser(
      @Body() questionsData: CreateUserDto ): Promise<string> {
      const { email, fullname, password } = questionsData;
      const result = await this.userService.createUser({
        email,
        fullname,
        password,
      });

      console.log(result)      

      return "success"
    }

}
