/*
  Warnings:

  - Changed the type of `isEngineeringManager` on the `visitor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `isTechRecruiter` on the `visitor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `isFellowDeveloper` on the `visitor` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "visitor" DROP COLUMN "isEngineeringManager",
ADD COLUMN     "isEngineeringManager" BOOLEAN NOT NULL,
DROP COLUMN "isTechRecruiter",
ADD COLUMN     "isTechRecruiter" BOOLEAN NOT NULL,
DROP COLUMN "isFellowDeveloper",
ADD COLUMN     "isFellowDeveloper" BOOLEAN NOT NULL;
