import { 
  Injectable,
  HttpException,
  HttpStatus,
 } from '@nestjs/common';
import { PrismaService } from '../service/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';


@Injectable()
export class UsersService {
    constructor(
      private prisma: PrismaService,
      ) {}

    async createUser(data: Prisma.UserCreateInput): Promise<{
      email: string, fullname: string
    } > {
      try {
        const result = await this.prisma.user.create({
          data:{
            email : data.email, 
            fullname: data.fullname,
            password: data.password
          },
          select: {
            email: true,
            fullname:true,
            password:false
          },
        });
        if(!result){
          throw new HttpException ("User Cant Be created", HttpStatus.BAD_REQUEST)
        }

        return result;
        
      } catch (error) {
        if(error.code === "P2002"){
          throw new HttpException ("Email Is Used", HttpStatus.CONFLICT)
        }else{
          throw new HttpException ("User Cant Be created", HttpStatus.BAD_REQUEST)
        }
      }
      }
    
      async findOne(email: string): Promise<User | undefined> {
        return await this.prisma.user.findUnique({
          where:{
            email
          },
        }
        );
      }
}
