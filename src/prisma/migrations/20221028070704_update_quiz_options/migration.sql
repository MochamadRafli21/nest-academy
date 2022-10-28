/*
  Warnings:

  - You are about to drop the `Options` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `options_a` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `options_b` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `options_c` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `options_d` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `options_e` to the `Questions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Options" DROP CONSTRAINT "Options_questionsId_fkey";

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "options_a" TEXT NOT NULL,
ADD COLUMN     "options_b" TEXT NOT NULL,
ADD COLUMN     "options_c" TEXT NOT NULL,
ADD COLUMN     "options_d" TEXT NOT NULL,
ADD COLUMN     "options_e" TEXT NOT NULL;

-- DropTable
DROP TABLE "Options";

-- DropEnum
DROP TYPE "option_name";
