/*
  Warnings:

  - Added the required column `departureName` to the `UserSchedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationName` to the `UserSchedules` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `UserSchedules` ADD COLUMN `departureName` VARCHAR(255) NOT NULL,
    ADD COLUMN `destinationName` VARCHAR(255) NOT NULL;
