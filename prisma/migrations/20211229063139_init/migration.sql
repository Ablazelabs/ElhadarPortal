/*
  Warnings:

  - Added the required column `region` to the `personal_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `personal_details` ADD COLUMN `region` VARCHAR(191) NOT NULL;
