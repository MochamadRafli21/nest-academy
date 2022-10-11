import { 
    Controller,
    Post,
    Body
 } from '@nestjs/common';
 import { User as UsersModel } from '@prisma/client';
 import { UsersService } from './users.service';
 import { CreateUserDto } from '../dto/user-create.dto';
 import { utilsService } from 'src/utils/utils';


@Controller('users')
export class UsersController {
    constructor(
        private readonly userService: UsersService,
        private readonly utils: utilsService,
    ) {}

    @Post()
    async createQuestions(
      @Body() questionsData: CreateUserDto ): Promise<UsersModel> {
      const { email, fullname, password } = questionsData;
      const hashedPassword = await this.utils.encrypt(password)
      return this.userService.createUser({
        email,
        fullname,
        password :hashedPassword,
      });
    }

}
