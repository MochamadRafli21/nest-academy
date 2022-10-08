/*
  Warnings:

  - You are about to drop the `Session_Materials` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Session_Materials" DROP CONSTRAINT "Session_Materials_materialId_fkey";

-- DropForeignKey
ALTER TABLE "Session_Materials" DROP CONSTRAINT "Session_Materials_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Session_Materials" DROP CONSTRAINT "Session_Materials_sessionId_fkey";

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "quizId" INTEGER;

-- DropTable
DROP TABLE "Session_Materials";

-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sessions_Materials" (
    "id" SERIAL NOT NULL,
    "quizId" INTEGER NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "materialsId" INTEGER NOT NULL,
    "positions" INTEGER NOT NULL,
    "sessionsId" INTEGER NOT NULL,

    CONSTRAINT "Sessions_Materials_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessions_Materials" ADD CONSTRAINT "Sessions_Materials_sessionsId_fkey" FOREIGN KEY ("sessionsId") REFERENCES "Sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessions_Materials" ADD CONSTRAINT "Sessions_Materials_materialsId_fkey" FOREIGN KEY ("materialsId") REFERENCES "Materials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessions_Materials" ADD CONSTRAINT "Sessions_Materials_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
