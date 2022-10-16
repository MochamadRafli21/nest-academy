import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../service/prisma/prisma.service';
import { utilsService } from 'src/utils/utils';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, PrismaService, utilsService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
