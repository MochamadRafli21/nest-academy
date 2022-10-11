/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_name_key";

-- AlterTable
ALTER TABLE "Sections" ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "paragraph" TEXT,
ADD COLUMN     "video_url" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User_Session" (
    "id" SERIAL NOT NULL,
    "sessionsId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "User_Session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User_Session" ADD CONSTRAINT "User_Session_sessionsId_fkey" FOREIGN KEY ("sessionsId") REFERENCES "Sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User_Session" ADD CONSTRAINT "User_Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
