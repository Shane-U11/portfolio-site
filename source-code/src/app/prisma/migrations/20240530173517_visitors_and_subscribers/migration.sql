/*
  Warnings:

  - You are about to drop the column `email` on the `visitor` table. All the data in the column will be lost.
  - You are about to drop the column `isEngineeringManager` on the `visitor` table. All the data in the column will be lost.
  - You are about to drop the column `isFellowDeveloper` on the `visitor` table. All the data in the column will be lost.
  - You are about to drop the column `isTechRecruiter` on the `visitor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "visitor" DROP COLUMN "email",
DROP COLUMN "isEngineeringManager",
DROP COLUMN "isFellowDeveloper",
DROP COLUMN "isTechRecruiter";

-- CreateTable
CREATE TABLE "subscribers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT,
    "phoneNumber" TEXT,
    "updatedAt" DATE,
    "isEngineeringManager" BOOLEAN,
    "isTechRecruiter" BOOLEAN,
    "isFellowDeveloper" BOOLEAN,

    CONSTRAINT "subscribers_pkey" PRIMARY KEY ("id")
);
