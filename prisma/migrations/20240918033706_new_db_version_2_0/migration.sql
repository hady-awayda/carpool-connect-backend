/*
  Warnings:

  - You are about to drop the column `userId` on the `SchedulePattern` table. All the data in the column will be lost.
  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdBy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `deletedBy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedBy` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `requestedBy` on the `UserMatch` table. All the data in the column will be lost.
  - You are about to drop the column `responseBy` on the `UserMatch` table. All the data in the column will be lost.
  - You are about to drop the `MatchedRide` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RideAgreement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RidePreferences` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RideSchedule` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId1,userId2]` on the table `UserMatch` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `requestedById` to the `UserMatch` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `MatchedRide` DROP FOREIGN KEY `MatchedRide_rideScheduleId1_fkey`;

-- DropForeignKey
ALTER TABLE `MatchedRide` DROP FOREIGN KEY `MatchedRide_rideScheduleId2_fkey`;

-- DropForeignKey
ALTER TABLE `RideAgreement` DROP FOREIGN KEY `RideAgreement_matchedRideId_fkey`;

-- DropForeignKey
ALTER TABLE `RideAgreement` DROP FOREIGN KEY `RideAgreement_proposedBy_fkey`;

-- DropForeignKey
ALTER TABLE `RideSchedule` DROP FOREIGN KEY `RideSchedule_ridePreferencesId_fkey`;

-- DropForeignKey
ALTER TABLE `RideSchedule` DROP FOREIGN KEY `RideSchedule_schedulePatternId_fkey`;

-- DropForeignKey
ALTER TABLE `RideSchedule` DROP FOREIGN KEY `RideSchedule_userId_fkey`;

-- DropForeignKey
ALTER TABLE `SchedulePattern` DROP FOREIGN KEY `SchedulePattern_userId_fkey`;

-- AlterTable
ALTER TABLE `SchedulePattern` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `age`,
    DROP COLUMN `createdBy`,
    DROP COLUMN `deletedBy`,
    DROP COLUMN `role`,
    DROP COLUMN `updatedBy`,
    ADD COLUMN `userType` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    MODIFY `email` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `UserMatch` DROP COLUMN `requestedBy`,
    DROP COLUMN `responseBy`,
    ADD COLUMN `approvedById` INTEGER NULL,
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `deletedById` INTEGER NULL,
    ADD COLUMN `endedAt` DATETIME(3) NULL,
    ADD COLUMN `matchedRouteId` INTEGER NULL,
    ADD COLUMN `partnershipEnd` DATETIME(3) NULL,
    ADD COLUMN `partnershipStart` DATETIME(3) NULL,
    ADD COLUMN `requestedById` INTEGER NOT NULL,
    ADD COLUMN `updatedById` INTEGER NULL;

-- DropTable
DROP TABLE `MatchedRide`;

-- DropTable
DROP TABLE `RideAgreement`;

-- DropTable
DROP TABLE `RidePreferences`;

-- DropTable
DROP TABLE `RideSchedule`;

-- CreateTable
CREATE TABLE `MatchedSchedules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userScheduleId1` INTEGER NOT NULL,
    `userScheduleId2` INTEGER NOT NULL,
    `routeDeviationTimeMin` INTEGER NOT NULL DEFAULT 0,
    `routeDeviationDistanceKm` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    `agreedDepartureTime` TIME NOT NULL,
    `agreedArrivalTime` TIME NOT NULL,
    `carDetails` VARCHAR(255) NULL,
    `schedulePatternId` INTEGER NULL,
    `matchedRideType` ENUM('rider_passenger', 'partnership') NOT NULL DEFAULT 'rider_passenger',
    `contactInfoId` INTEGER NOT NULL,
    `user1AgreementStatus` ENUM('pending', 'agreed', 'modified', 'canceled') NOT NULL DEFAULT 'pending',
    `user2AgreementStatus` ENUM('pending', 'agreed', 'modified', 'canceled') NOT NULL DEFAULT 'pending',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSchedules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `scheduleType` ENUM('rider', 'passenger', 'partnership') NOT NULL DEFAULT 'rider',
    `departureLat` DECIMAL(10, 7) NOT NULL,
    `departureLng` DECIMAL(10, 7) NOT NULL,
    `destinationLat` DECIMAL(10, 7) NOT NULL,
    `destinationLng` DECIMAL(10, 7) NOT NULL,
    `departureTime` TIME NOT NULL,
    `arrivalTime` TIME NOT NULL,
    `selectedCar` VARCHAR(255) NULL,
    `isDefault` BOOLEAN NULL,
    `schedulePatternId` INTEGER NOT NULL,
    `schedulePreferencesId` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `idx_user_id`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SchedulePreference` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `maxProximityKm` DECIMAL(5, 2) NOT NULL DEFAULT 5.00,
    `maxTimeDeviationMin` INTEGER NOT NULL DEFAULT 10,
    `preferredRideDeparture` TIME NULL,
    `preferredRideArrival` TIME NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPreferences` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `prefersRideSharing` BOOLEAN NOT NULL DEFAULT true,
    `carPreferences` VARCHAR(255) NULL,
    `routePreferences` VARCHAR(255) NULL,
    `smokingPreferences` VARCHAR(255) NULL,
    `temperaturePreferences` VARCHAR(255) NULL,
    `musicPreferences` VARCHAR(255) NULL,
    `languagePreferences` VARCHAR(255) NULL,
    `politicsPreferences` VARCHAR(255) NULL,
    `petPreferences` VARCHAR(255) NULL,
    `chattingPreferences` VARCHAR(255) NULL,
    `commutingFrequency` VARCHAR(255) NULL,
    `commuteFrequencyPreferences` VARCHAR(255) NULL,
    `defaultCarId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `UserPreferences_userId_unique`(`userId`),
    INDEX `idx_user_id`(`userId`),
    UNIQUE INDEX `UserPreferences_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserInformation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `personalInformationId` INTEGER NULL,
    `contactInformationId` INTEGER NULL,
    `userAddressId` INTEGER NULL,
    `carInformationId` INTEGER NULL,
    `userPaymentsId` INTEGER NULL,
    `userBalanceId` INTEGER NULL,
    `userWithdrawalsId` INTEGER NULL,
    `userDocumentsId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `UserInformation_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPersonalInformation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `age` INTEGER NULL,
    `gender` ENUM('male', 'female') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `UserPersonalInformation_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactInformation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `phoneNumber` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `ContactInformation_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserAddress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `phoneNumber` VARCHAR(255) NULL,
    `contactInfo` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `UserAddress_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CarInformation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `carModel` VARCHAR(255) NULL,
    `carBrand` VARCHAR(255) NULL,
    `modelYear` VARCHAR(255) NULL,
    `plateNumber` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conversation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId1` INTEGER NOT NULL,
    `userId2` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `Conversation_userId1_userId2_key`(`userId1`, `userId2`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `conversationId` INTEGER NOT NULL,
    `senderId` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `read` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `content` TEXT NOT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    INDEX `idx_user_id`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScheduleAgreement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `matchedRideId` INTEGER NOT NULL,
    `proposedRouteDeviationTimeMin` INTEGER NOT NULL DEFAULT 0,
    `proposedRouteDeviationDistanceKm` DECIMAL(5, 2) NOT NULL DEFAULT 0.00,
    `proposedDepartureTime` TIME NOT NULL,
    `proposedArrivalTime` TIME NOT NULL,
    `status` ENUM('pending', 'accepted', 'rejected') NOT NULL DEFAULT 'pending',
    `proposedById` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPayments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `phoneNumber` VARCHAR(255) NULL,
    `contactInfo` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `UserPayments_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserBalance` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `phoneNumber` VARCHAR(255) NULL,
    `contactInfo` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `UserBalance_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserWithdrawals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `phoneNumber` VARCHAR(255) NULL,
    `contactInfo` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `UserWithdrawals_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserDocument` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `documentsUrl` VARCHAR(255) NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deletedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `UserDocument_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `reputationScoreId` INTEGER NOT NULL,
    `punctualityScoreId` INTEGER NOT NULL,
    `carbonFootprintReductionId` INTEGER NOT NULL,
    `recentReviewsId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `UserProfile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserReputation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reputationRating` DECIMAL(10, 7) NOT NULL,
    `reputationDetails` VARCHAR(255) NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserPunctuality` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `punctualityRating` DECIMAL(10, 7) NOT NULL,
    `punctualityDetails` VARCHAR(255) NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserCarbonFootprint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `carbonFootprintRating` DECIMAL(10, 7) NOT NULL,
    `carbonFootprintDetails` VARCHAR(255) NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserReviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reviewRating` DECIMAL(10, 7) NOT NULL,
    `reviewDetails` VARCHAR(255) NULL,
    `userId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `idx_status` ON `UserMatch`(`status`);

-- CreateIndex
CREATE UNIQUE INDEX `UserMatch_userId1_userId2_key` ON `UserMatch`(`userId1`, `userId2`);

-- AddForeignKey
ALTER TABLE `MatchedSchedules` ADD CONSTRAINT `MatchedSchedules_userScheduleId1_fkey` FOREIGN KEY (`userScheduleId1`) REFERENCES `UserSchedules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchedSchedules` ADD CONSTRAINT `MatchedSchedules_userScheduleId2_fkey` FOREIGN KEY (`userScheduleId2`) REFERENCES `UserSchedules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchedSchedules` ADD CONSTRAINT `MatchedSchedules_contactInfoId_fkey` FOREIGN KEY (`contactInfoId`) REFERENCES `ContactInformation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSchedules` ADD CONSTRAINT `UserSchedules_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSchedules` ADD CONSTRAINT `UserSchedules_schedulePatternId_fkey` FOREIGN KEY (`schedulePatternId`) REFERENCES `SchedulePattern`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSchedules` ADD CONSTRAINT `UserSchedules_schedulePreferencesId_fkey` FOREIGN KEY (`schedulePreferencesId`) REFERENCES `SchedulePreference`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPreferences` ADD CONSTRAINT `UserPreferences_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPreferences` ADD CONSTRAINT `UserPreferences_defaultCarId_fkey` FOREIGN KEY (`defaultCarId`) REFERENCES `CarInformation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInformation` ADD CONSTRAINT `UserInformation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInformation` ADD CONSTRAINT `UserInformation_personalInformationId_fkey` FOREIGN KEY (`personalInformationId`) REFERENCES `UserPersonalInformation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInformation` ADD CONSTRAINT `UserInformation_contactInformationId_fkey` FOREIGN KEY (`contactInformationId`) REFERENCES `ContactInformation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInformation` ADD CONSTRAINT `UserInformation_userAddressId_fkey` FOREIGN KEY (`userAddressId`) REFERENCES `UserAddress`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInformation` ADD CONSTRAINT `UserInformation_carInformationId_fkey` FOREIGN KEY (`carInformationId`) REFERENCES `CarInformation`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInformation` ADD CONSTRAINT `UserInformation_userPaymentsId_fkey` FOREIGN KEY (`userPaymentsId`) REFERENCES `UserPayments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInformation` ADD CONSTRAINT `UserInformation_userBalanceId_fkey` FOREIGN KEY (`userBalanceId`) REFERENCES `UserBalance`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInformation` ADD CONSTRAINT `UserInformation_userWithdrawalsId_fkey` FOREIGN KEY (`userWithdrawalsId`) REFERENCES `UserWithdrawals`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserInformation` ADD CONSTRAINT `UserInformation_userDocumentsId_fkey` FOREIGN KEY (`userDocumentsId`) REFERENCES `UserDocument`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPersonalInformation` ADD CONSTRAINT `UserPersonalInformation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactInformation` ADD CONSTRAINT `ContactInformation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserAddress` ADD CONSTRAINT `UserAddress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CarInformation` ADD CONSTRAINT `CarInformation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_userId1_fkey` FOREIGN KEY (`userId1`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Conversation` ADD CONSTRAINT `Conversation_userId2_fkey` FOREIGN KEY (`userId2`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_conversationId_fkey` FOREIGN KEY (`conversationId`) REFERENCES `Conversation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScheduleAgreement` ADD CONSTRAINT `ScheduleAgreement_matchedRideId_fkey` FOREIGN KEY (`matchedRideId`) REFERENCES `MatchedSchedules`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ScheduleAgreement` ADD CONSTRAINT `ScheduleAgreement_proposedById_fkey` FOREIGN KEY (`proposedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPayments` ADD CONSTRAINT `UserPayments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserBalance` ADD CONSTRAINT `UserBalance_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserWithdrawals` ADD CONSTRAINT `UserWithdrawals_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserDocument` ADD CONSTRAINT `UserDocument_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProfile` ADD CONSTRAINT `UserProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProfile` ADD CONSTRAINT `UserProfile_reputationScoreId_fkey` FOREIGN KEY (`reputationScoreId`) REFERENCES `UserReputation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProfile` ADD CONSTRAINT `UserProfile_punctualityScoreId_fkey` FOREIGN KEY (`punctualityScoreId`) REFERENCES `UserPunctuality`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProfile` ADD CONSTRAINT `UserProfile_carbonFootprintReductionId_fkey` FOREIGN KEY (`carbonFootprintReductionId`) REFERENCES `UserCarbonFootprint`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserProfile` ADD CONSTRAINT `UserProfile_recentReviewsId_fkey` FOREIGN KEY (`recentReviewsId`) REFERENCES `UserReviews`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserReputation` ADD CONSTRAINT `UserReputation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserPunctuality` ADD CONSTRAINT `UserPunctuality_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCarbonFootprint` ADD CONSTRAINT `UserCarbonFootprint_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserReviews` ADD CONSTRAINT `UserReviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMatch` ADD CONSTRAINT `UserMatch_requestedById_fkey` FOREIGN KEY (`requestedById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMatch` ADD CONSTRAINT `UserMatch_approvedById_fkey` FOREIGN KEY (`approvedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMatch` ADD CONSTRAINT `UserMatch_updatedById_fkey` FOREIGN KEY (`updatedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserMatch` ADD CONSTRAINT `UserMatch_deletedById_fkey` FOREIGN KEY (`deletedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
