/*
  Warnings:

  - You are about to drop the column `question` on the `Questions` table. All the data in the column will be lost.
  - Added the required column `timeout` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "section_type" AS ENUM ('PARAGRAPH', 'VIDEO', 'IMAGE');

-- AlterTable
ALTER TABLE "Questions" DROP COLUMN "question";

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "timeout" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Sections" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "type" "section_type" NOT NULL DEFAULT 'PARAGRAPH',
    "position" INTEGER NOT NULL,

    CONSTRAINT "Sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_in_sessions" BOOLEAN NOT NULL DEFAULT false,
    "sessionId" TEXT,
    "is_admin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- AddForeignKey
ALTER TABLE "Sections" ADD CONSTRAINT "Sections_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
