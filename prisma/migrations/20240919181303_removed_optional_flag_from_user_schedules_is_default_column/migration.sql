/*
  Warnings:

  - Made the column `isDefault` on table `UserSchedules` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `UserSchedules` MODIFY `isDefault` BOOLEAN NOT NULL DEFAULT true;
