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
    UseGuards
  } from '@nestjs/common';
  import { QuestionsService } from './questions.service';
  import { Questions as QuestionsModel } from '@prisma/client';
  import { CreateQuestionsDto } from '../dto/questions-create.dto';
  import { JwtAuthGuard } from '../auth/jwt-authguard';

  
  @Controller('questions')
  export class QuestionsController {
    constructor(
      private readonly questionsService: QuestionsService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getQuestions(): Promise<QuestionsModel[]> {
      const data = this.questionsService.questions();
      return data
    }
  
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getQuestion(@Param('id') id: string): Promise<any> {
      const data = this.questionsService.question({ id: Number(id) });
      if (data === null){
        throw new HttpException ("Question not found", HttpStatus.NOT_FOUND)
      }

      return data
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createQuestions(
      @Body() questionsData: CreateQuestionsDto ): Promise<QuestionsModel> {
      const { title, sections, options_a, options_b, options_c, options_d, options_e , answer } = questionsData;
      return this.questionsService.createQuestion({
        title,
        section:{
          createMany:{
            data: sections
          }
        },
        options_a,
        options_b,
        options_c,
        options_d,
        options_e,
        answer
      });
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async editQuestion(@Param('id') id: string, @Body() questionsData: CreateQuestionsDto): Promise<QuestionsModel> {
      return this.questionsService.updateQuestion({
        where: { id: Number(id) },
        data: { 
          title: questionsData.title,
          section: {
            createMany:{
              data: questionsData.sections
            }
          },
          options_a:questionsData.options_a,
          options_b:questionsData.options_b,
          options_c:questionsData.options_c,
          options_d:questionsData.options_d,
          options_e:questionsData.options_e,
          answer:questionsData.answer
         },
      });
    }
  
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deletePost(@Param('id') id: string): Promise<QuestionsModel> {
      return this.questionsService.deleteQuestion({ id: Number(id) });
    }
  }
  