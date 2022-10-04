import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    Put,
    Delete,
  } from '@nestjs/common';
  import { QuestionsService } from './questions.service';
  import { Questions as QuestionsModel } from '@prisma/client';
  
  @Controller()
  export class AppController {
    constructor(
      private readonly questionsService: QuestionsService,
    ) {}
  
    @Get(':id')
    async getPostById(@Param('id') id: string): Promise<QuestionsModel> {
      return this.questionsService.question({ id: Number(id) });
    }
  
    @Post()
    async createDraft(
      @Body() postData: { title: string; content?: string; authorEmail: string },
    ): Promise<QuestionsModel> {
      const { title, content, authorEmail } = postData;
      return this.questionsService.createQuestion({
        title,
        content,
        author: {
          connect: { email: authorEmail },
        },
      });
    }

  
    @Put(':id')
    async publishPost(@Param('id') id: string, @Body() postData: { options: string[], answer:string}): Promise<QuestionsModel> {
        // todo create options 

      return this.questionsService.updateQuestion({
        where: { id: Number(id) },
        data: { 
            answer: postData.answer,
            options:[1,2]
         },
      });
    }
  
    @Delete(':id')
    async deletePost(@Param('id') id: string): Promise<QuestionsModel> {
      return this.questionsService.deleteQuestion({ id: Number(id) });
    }
  }
  