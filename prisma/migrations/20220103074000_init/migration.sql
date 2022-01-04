-- AlterTable
ALTER TABLE `personal_details` ADD COLUMN `created_time` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `isContacted` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `refresh_tokens` (
    `refresh_token` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `refresh_tokens_refresh_token_key`(`refresh_token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `clearance` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `user_username_key`(`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `refresh_tokens` ADD CONSTRAINT `refresh_tokens_username_fkey` FOREIGN KEY (`username`) REFERENCES `user`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
