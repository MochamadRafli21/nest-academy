import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsService } from './questions/questions.service';
import { PrismaService } from './service/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [AppController, QuestionsController],
  providers: [AppService, QuestionsService , PrismaService],
})
export class AppModule {}
