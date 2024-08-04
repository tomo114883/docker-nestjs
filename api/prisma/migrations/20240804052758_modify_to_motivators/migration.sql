/*
  Warnings:

  - You are about to drop the `Motivation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TypesOnMotivations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Motivation";

-- DropTable
DROP TABLE "TypesOnMotivations";

-- CreateTable
CREATE TABLE "Motivator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "weight" INTEGER,
    "userId" INTEGER NOT NULL,
    "typeId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Motivator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TypesOnMotivators" (
    "id" SERIAL NOT NULL,
    "motivatorId" INTEGER NOT NULL,
    "typeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "TypesOnMotivators_pkey" PRIMARY KEY ("id")
);
