import { Injectable } from '@nestjs/common';
import { PrismaService } from '../service/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        let result =this.prisma.user.create({
          data
        });
        if(!result){
          throw new console.error("create failed");
        }
    
        return result;
      }
}
