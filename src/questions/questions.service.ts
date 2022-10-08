import { Injectable } from '@nestjs/common';
import { PrismaService } from '../service/prisma/prisma.service';
import { Questions, Prisma } from '@prisma/client';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async question(
    questionsWhereUniqueInput: Prisma.QuestionsWhereUniqueInput,
  ): Promise<Questions | null> {
    return this.prisma.questions.findUnique({
      where: questionsWhereUniqueInput,
      include:{
        options: true,
        section: true,
      }
    });
  }

  async questions(): Promise<Questions[]> {
    return this.prisma.questions.findMany({});
  }

  async createQuestion(data: Prisma.QuestionsCreateInput): Promise<Questions> {
    let result =this.prisma.questions.create({
      data,
      include:{
        options: true,
        section: true
      }
    });
    if(!result){
      throw new console.error("create failed");
    }

    return result;
  }

  async updateQuestion(params: {
    where: Prisma.QuestionsWhereUniqueInput;
    data: Prisma.QuestionsUpdateInput;
  }): Promise<Questions> {
    const { data, where } = params;

    return this.prisma.questions.update({
      data,
      where,
      include:{
        options: true,
        section: true
      }
    });
  }

  async deleteRelatedOptions(id: number): Promise<Prisma.BatchPayload> {
    return this.prisma.options.deleteMany({
      where: {
        questionsId:id
      }
    });
  }

  async deleteQuestion(where: Prisma.QuestionsWhereUniqueInput): Promise<Questions> {
    return this.prisma.questions.delete({
      where,
    });
  }
}