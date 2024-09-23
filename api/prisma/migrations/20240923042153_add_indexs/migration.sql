-- CreateIndex
CREATE INDEX "Stressor_userId_idx" ON "Stressor"("userId");

-- CreateIndex
CREATE INDEX "Stressor_typeId_idx" ON "Stressor"("typeId");

-- CreateIndex
CREATE INDEX "TypesOnMotivators_motivatorId_idx" ON "TypesOnMotivators"("motivatorId");

-- CreateIndex
CREATE INDEX "TypesOnMotivators_typeId_idx" ON "TypesOnMotivators"("typeId");

-- CreateIndex
CREATE INDEX "TypesOnStressors_StressorId_idx" ON "TypesOnStressors"("StressorId");

-- CreateIndex
CREATE INDEX "TypesOnStressors_typeId_idx" ON "TypesOnStressors"("typeId");
