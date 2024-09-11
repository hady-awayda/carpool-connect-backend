/*
  Warnings:

  - You are about to drop the column `userType` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `userType`,
    ADD COLUMN `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user';
