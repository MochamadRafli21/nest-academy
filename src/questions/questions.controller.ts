import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    Put,
    Delete,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { QuestionsService } from './questions.service';
  import { Questions as QuestionsModel, Prisma } from '@prisma/client';
  
  @Controller('questions')
  export class QuestionsController {
    constructor(
      private readonly questionsService: QuestionsService,
    ) {}

    @Get()
    async getQuestions(): Promise<QuestionsModel[]> {
      const data = this.questionsService.questions();
      return data
    }
  
    @Get(':id')
    async getQuestion(@Param('id') id: string): Promise<any> {
      const data = this.questionsService.question({ id: Number(id) });
      if (data === null){
        throw new HttpException ("Question not found", HttpStatus.NOT_FOUND)
      }

      return data
    }

    @Post()
    async createQuestions(
      @Body() questionsData: { title:string, question:string, answer:string , options: Prisma.OptionsCreateManyQuestionsInput},
    ): Promise<QuestionsModel> {
      const { title, question, options, answer } = questionsData;
      return this.questionsService.createQuestion({
        title,
        question,
        options: {
          createMany:{
            data: options
          }
        },
        answer
      });
    }

  
    @Put(':id')
    async editQuestion(@Param('id') id: string, @Body() questionsData: { title:string, question:string, answer:string , options: Prisma.OptionsCreateManyQuestionsInput}): Promise<QuestionsModel> {
      await this.questionsService.deleteRelatedOptions(Number(id))
      return this.questionsService.updateQuestion({
        where: { id: Number(id) },
        data: { 
          title: questionsData.title,
          question: questionsData.question,
          options: {
            createMany:{
              data: questionsData.options
            }
          },
          answer:questionsData.answer
         },
      });
    }
  
    @Delete(':id')
    async deletePost(@Param('id') id: string): Promise<QuestionsModel> {
      return this.questionsService.deleteQuestion({ id: Number(id) });
    }
  }
  