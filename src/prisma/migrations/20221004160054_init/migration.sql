-- CreateTable
CREATE TABLE "Options" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "questionsId" INTEGER,

    CONSTRAINT "Options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" SERIAL NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Materials" (
    "id" SERIAL NOT NULL,
    "video_url" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sessions" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session_Materials" (
    "id" SERIAL NOT NULL,
    "materialId" INTEGER,
    "questionId" INTEGER,
    "sessionId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "Session_Materials_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Options" ADD CONSTRAINT "Options_questionsId_fkey" FOREIGN KEY ("questionsId") REFERENCES "Questions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session_Materials" ADD CONSTRAINT "Session_Materials_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Materials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session_Materials" ADD CONSTRAINT "Session_Materials_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session_Materials" ADD CONSTRAINT "Session_Materials_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Sessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
