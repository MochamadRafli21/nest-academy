/*
  Warnings:

  - Added the required column `question` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "question" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
