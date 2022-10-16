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
  import { Questions as QuestionsModel } from '@prisma/client';
  import { CreateQuestionsDto } from '../dto/questions-create.dto';
  
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
      @Body() questionsData: CreateQuestionsDto ): Promise<QuestionsModel> {
      const { title, sections, options, answer } = questionsData;
      return this.questionsService.createQuestion({
        title,
        section:{
          createMany:{
            data: sections
          }
        },
        options: {
          createMany:{
            data: options
          }
        },
        answer
      });
    }

  
    @Put(':id')
    async editQuestion(@Param('id') id: string, @Body() questionsData: CreateQuestionsDto): Promise<QuestionsModel> {
      await this.questionsService.deleteRelatedOptions(Number(id))
      return this.questionsService.updateQuestion({
        where: { id: Number(id) },
        data: { 
          title: questionsData.title,
          section: {
            createMany:{
              data: questionsData.sections
            }
          },
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
  