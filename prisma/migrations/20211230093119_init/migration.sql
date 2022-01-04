/*
  Warnings:

  - Added the required column `black` to the `personal_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coffee` to the `personal_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `grey` to the `personal_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ivory` to the `personal_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `silver` to the `personal_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `personal_details` ADD COLUMN `black` BOOLEAN NOT NULL,
    ADD COLUMN `coffee` BOOLEAN NOT NULL,
    ADD COLUMN `grey` BOOLEAN NOT NULL,
    ADD COLUMN `ivory` BOOLEAN NOT NULL,
    ADD COLUMN `silver` BOOLEAN NOT NULL;
