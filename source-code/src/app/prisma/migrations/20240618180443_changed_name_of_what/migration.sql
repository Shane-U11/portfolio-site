/*
  Warnings:

  - You are about to drop the column `what` on the `subscribers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "subscribers" DROP COLUMN "what",
ADD COLUMN     "description" TEXT;
