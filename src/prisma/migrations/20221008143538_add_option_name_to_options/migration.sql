-- CreateEnum
CREATE TYPE "option_name" AS ENUM ('A', 'B', 'C', 'D', 'E');

-- AlterTable
ALTER TABLE "Options" ADD COLUMN     "option_name" "option_name" NOT NULL DEFAULT 'A';
