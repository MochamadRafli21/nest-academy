import { Injectable } from '@nestjs/common';
import { PrismaService } from '../service/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { utilsService } from 'src/utils/utils';


@Injectable()
export class UsersService {
    constructor(
      private prisma: PrismaService,
      private utils: utilsService
      ) {}

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
      const hashedPass = await this.utils.encrypt(data.password)
        let result =this.prisma.user.create({
          data:{
            email : data.email, 
            fullname: data.fullname,
            password: hashedPass
          }

        });
        if(!result){
          throw new console.error("create failed");
        }

        return result;
      }
    
      async findOne(email: string): Promise<User | undefined> {
        let res = await this.prisma.user.findUnique({
          where:{
            email
          },
        }
        );

        res.password = await this.utils.decrypt(res.password);

        return res
      }
}
