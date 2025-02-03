/*
  Warnings:

  - A unique constraint covering the columns `[factorsSetId]` on the table `Template` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Template_factorsSetId_key" ON "Template"("factorsSetId");
