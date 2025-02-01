/*
  Warnings:

  - Made the column `variable` on table `Stressor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Stressor" ALTER COLUMN "variable" SET NOT NULL;
