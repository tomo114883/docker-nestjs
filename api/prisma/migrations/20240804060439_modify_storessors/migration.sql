/*
  Warnings:

  - You are about to drop the `TypesOnStresses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TypesOnStresses";

-- CreateTable
CREATE TABLE "TypesOnStressors" (
    "id" SERIAL NOT NULL,
    "stressId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "TypesOnStressors_pkey" PRIMARY KEY ("id")
);
