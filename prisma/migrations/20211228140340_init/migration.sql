-- CreateTable
CREATE TABLE `personal_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_of_company` VARCHAR(191) NOT NULL,
    `full_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `street_name` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `other_profile_text` VARCHAR(191) NULL,
    `other_glass_text` VARCHAR(191) NULL,
    `other_aluminum_text` VARCHAR(191) NULL,
    `quantity_remark` VARCHAR(191) NULL,
    `sales_rep` VARCHAR(191) NOT NULL,
    `ltz_profile` BOOLEAN NOT NULL,
    `curtain_profile` BOOLEAN NOT NULL,
    `fasha_zocolo` BOOLEAN NOT NULL,
    `oval_flat_ferma` BOOLEAN NOT NULL,
    `sliding_cup` BOOLEAN NOT NULL,
    `pressure_plate` BOOLEAN NOT NULL,
    `RHS` BOOLEAN NOT NULL,
    `external_internal_profile` BOOLEAN NOT NULL,
    `clear` BOOLEAN NOT NULL,
    `reflective` BOOLEAN NOT NULL,
    `tinted` BOOLEAN NOT NULL,
    `tempered` BOOLEAN NOT NULL,
    `laminated` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
