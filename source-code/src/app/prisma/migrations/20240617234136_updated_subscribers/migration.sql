/*
  Warnings:

  - The `other` column on the `subscribers` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "subscribers" ADD COLUMN     "what" TEXT,
DROP COLUMN "other",
ADD COLUMN     "other" BOOLEAN;
