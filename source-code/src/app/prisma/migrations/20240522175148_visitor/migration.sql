/*
  Warnings:

  - The `visitCount` column on the `visitor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "visitor" DROP COLUMN "visitCount",
ADD COLUMN     "visitCount" INTEGER NOT NULL DEFAULT 0;
