-- DropForeignKey
ALTER TABLE `UserSchedules` DROP FOREIGN KEY `UserSchedules_schedulePatternId_fkey`;

-- DropForeignKey
ALTER TABLE `UserSchedules` DROP FOREIGN KEY `UserSchedules_schedulePreferencesId_fkey`;

-- AlterTable
ALTER TABLE `UserSchedules` MODIFY `isDefault` BOOLEAN NULL DEFAULT true,
    MODIFY `schedulePatternId` INTEGER NULL,
    MODIFY `schedulePreferencesId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `UserSchedules` ADD CONSTRAINT `UserSchedules_schedulePatternId_fkey` FOREIGN KEY (`schedulePatternId`) REFERENCES `SchedulePattern`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSchedules` ADD CONSTRAINT `UserSchedules_schedulePreferencesId_fkey` FOREIGN KEY (`schedulePreferencesId`) REFERENCES `SchedulePreference`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
