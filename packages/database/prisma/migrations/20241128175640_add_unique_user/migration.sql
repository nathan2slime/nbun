/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `QuizResponse` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[quizId]` on the table `QuizResponse` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "QuestionResponse" ADD COLUMN     "pontuation" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "QuizResponse_userId_key" ON "QuizResponse"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "QuizResponse_quizId_key" ON "QuizResponse"("quizId");
