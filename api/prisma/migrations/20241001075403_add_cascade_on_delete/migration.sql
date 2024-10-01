/*
  Warnings:

  - You are about to drop the column `StressorId` on the `TypesOnStressors` table. All the data in the column will be lost.
  - Added the required column `stressorId` to the `TypesOnStressors` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "TypesOnStressors_StressorId_idx";

-- AlterTable
ALTER TABLE "TypesOnStressors" DROP COLUMN "StressorId",
ADD COLUMN     "stressorId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "TypesOnStressors_stressorId_idx" ON "TypesOnStressors"("stressorId");
