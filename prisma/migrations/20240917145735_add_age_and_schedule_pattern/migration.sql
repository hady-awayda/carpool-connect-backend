/*
  Warnings:

  - Added the required column `schedulePatternId` to the `RideSchedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `age` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `RideSchedule` ADD COLUMN `schedulePatternId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `age` TINYINT NOT NULL;

-- CreateTable
CREATE TABLE `SchedulePattern` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `mondayFlag` BOOLEAN NOT NULL DEFAULT false,
    `tuesdayFlag` BOOLEAN NOT NULL DEFAULT false,
    `wednesdayFlag` BOOLEAN NOT NULL DEFAULT false,
    `thursdayFlag` BOOLEAN NOT NULL DEFAULT false,
    `fridayFlag` BOOLEAN NOT NULL DEFAULT false,
    `saturdayFlag` BOOLEAN NOT NULL DEFAULT false,
    `sundayFlag` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RideSchedule` ADD CONSTRAINT `RideSchedule_schedulePatternId_fkey` FOREIGN KEY (`schedulePatternId`) REFERENCES `SchedulePattern`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SchedulePattern` ADD CONSTRAINT `SchedulePattern_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
