/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `createdBy` INTEGER NULL,
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `deletedBy` INTEGER NULL,
    ADD COLUMN `password` VARCHAR(255) NOT NULL,
    ADD COLUMN `phoneNumber` VARCHAR(20) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `updatedBy` INTEGER NULL,
    ADD COLUMN `userType` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    MODIFY `name` VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE `RideSchedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `rideUserType` ENUM('rider', 'passenger', 'partnership') NOT NULL DEFAULT 'rider',
    `departureLat` DOUBLE NOT NULL,
    `departureLng` DOUBLE NOT NULL,
    `destinationLat` DOUBLE NOT NULL,
    `destinationLng` DOUBLE NOT NULL,
    `departureTime` DATETIME(3) NOT NULL,
    `arrivalTime` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RideSchedule` ADD CONSTRAINT `RideSchedule_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
