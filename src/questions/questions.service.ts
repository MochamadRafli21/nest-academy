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
    });
  }

  async questions(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.QuestionsWhereUniqueInput;
    where?: Prisma.QuestionsWhereInput;
    orderBy?: Prisma.QuestionsOrderByWithRelationInput;
  }): Promise<Questions[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.questions.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createQuestion(data: Prisma.QuestionsCreateInput): Promise<Questions> {
    return this.prisma.questions.create({
      data,
    });
  }

  async updateQuestion(params: {
    where: Prisma.QuestionsWhereUniqueInput;
    data: Prisma.QuestionsUpdateInput;
  }): Promise<Questions> {
    const { data, where } = params;
    return this.prisma.questions.update({
      data,
      where,
    });
  }

  async deleteQuestion(where: Prisma.QuestionsWhereUniqueInput): Promise<Questions> {
    return this.prisma.questions.delete({
      where,
    });
  }
}