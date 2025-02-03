/*
  Warnings:

  - Made the column `variable` on table `Motivator` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Motivator" ALTER COLUMN "variable" SET NOT NULL;
