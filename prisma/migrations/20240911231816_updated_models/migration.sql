/*
  Warnings:

  - Added the required column `ridePreferencesId` to the `RideSchedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `RideSchedule` ADD COLUMN `ridePreferencesId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `RidePreferences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `maxProximityKm` DOUBLE NOT NULL DEFAULT 5.00,
    `maxTimeDeviationMin` INTEGER NOT NULL DEFAULT 10,
    `preferredRideDeparture` DATETIME(3) NULL,
    `preferredRideArrival` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserMatch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId1` INTEGER NOT NULL,
    `userId2` INTEGER NOT NULL,
    `status` ENUM('requested', 'approved', 'declined', 'active', 'ended') NOT NULL DEFAULT 'requested',
    `requestedBy` INTEGER NOT NULL,
    `responseBy` INTEGER NULL,
    `requestedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `approvedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatchedRide` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rideScheduleId1` INTEGER NOT NULL,
    `rideScheduleId2` INTEGER NOT NULL,
    `routeDeviationTimeMin` INTEGER NOT NULL DEFAULT 0,
    `routeDeviationDistanceKm` DOUBLE NOT NULL DEFAULT 0.00,
    `agreedDepartureTime` DATETIME(3) NOT NULL,
    `agreedArrivalTime` DATETIME(3) NOT NULL,
    `carDetails` VARCHAR(191) NULL,
    `user1AgreementStatus` ENUM('pending', 'agreed', 'modified', 'canceled') NOT NULL DEFAULT 'pending',
    `user2AgreementStatus` ENUM('pending', 'agreed', 'modified', 'canceled') NOT NULL DEFAULT 'pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `createdBy` INTEGER NULL,
    `updatedBy` INTEGER NULL,
    `deletedBy` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RideAgreement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `matchedRideId` INTEGER NOT NULL,
    `proposedBy` INTEGER NOT NULL,
    `proposedRouteDeviationTimeMin` INTEGER NOT NULL DEFAULT 0,
    `proposedRouteDeviationDistanceKm` DOUBLE NOT NULL DEFAULT 0.00,
    `proposedDepartureTime` DATETIME(3) NOT NULL,
    `proposedArrivalTime` DATETIME(3) NOT NULL,
    `status` ENUM('pending', 'accepted', 'rejected') NOT NULL DEFAULT 'pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,
    `updatedBy` INTEGER NULL,
    `deletedBy` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RideSchedule` ADD CONSTRAINT `RideSchedule_ridePreferencesId_fkey` FOREIGN KEY (`ridePreferencesId`) REFERENCES `RidePreferences`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMatch` ADD CONSTRAINT `UserMatch_userId1_fkey` FOREIGN KEY (`userId1`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMatch` ADD CONSTRAINT `UserMatch_userId2_fkey` FOREIGN KEY (`userId2`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchedRide` ADD CONSTRAINT `MatchedRide_rideScheduleId1_fkey` FOREIGN KEY (`rideScheduleId1`) REFERENCES `RideSchedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchedRide` ADD CONSTRAINT `MatchedRide_rideScheduleId2_fkey` FOREIGN KEY (`rideScheduleId2`) REFERENCES `RideSchedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RideAgreement` ADD CONSTRAINT `RideAgreement_matchedRideId_fkey` FOREIGN KEY (`matchedRideId`) REFERENCES `MatchedRide`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RideAgreement` ADD CONSTRAINT `RideAgreement_proposedBy_fkey` FOREIGN KEY (`proposedBy`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
