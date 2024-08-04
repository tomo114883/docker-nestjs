/*
  Warnings:

  - You are about to drop the column `stressId` on the `TypesOnStressors` table. All the data in the column will be lost.
  - You are about to drop the `Stress` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `StressorId` to the `TypesOnStressors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TypesOnStressors" DROP COLUMN "stressId",
ADD COLUMN     "StressorId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Stress";

-- CreateTable
CREATE TABLE "Stressor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" INTEGER,
    "userId" INTEGER NOT NULL,
    "typeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Stressor_pkey" PRIMARY KEY ("id")
);
