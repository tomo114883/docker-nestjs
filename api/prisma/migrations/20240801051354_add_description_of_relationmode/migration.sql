-- DropForeignKey
ALTER TABLE "Motivation" DROP CONSTRAINT "Motivation_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Motivation" DROP CONSTRAINT "Motivation_userId_fkey";

-- DropForeignKey
ALTER TABLE "Stress" DROP CONSTRAINT "Stress_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Stress" DROP CONSTRAINT "Stress_userId_fkey";

-- DropForeignKey
ALTER TABLE "TypesOnMotivations" DROP CONSTRAINT "TypesOnMotivations_motivationId_fkey";

-- DropForeignKey
ALTER TABLE "TypesOnMotivations" DROP CONSTRAINT "TypesOnMotivations_typeId_fkey";

-- DropForeignKey
ALTER TABLE "TypesOnStresses" DROP CONSTRAINT "TypesOnStresses_stressId_fkey";

-- DropForeignKey
ALTER TABLE "TypesOnStresses" DROP CONSTRAINT "TypesOnStresses_typeId_fkey";
