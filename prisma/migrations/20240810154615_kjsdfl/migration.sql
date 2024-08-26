-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `shop` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `isOnline` BOOLEAN NOT NULL DEFAULT false,
    `scope` VARCHAR(191) NULL,
    `expires` DATETIME(3) NULL,
    `accessToken` VARCHAR(191) NOT NULL,
    `userId` BIGINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Button_style` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shop` VARCHAR(191) NOT NULL,
    `btn_enabled` BOOLEAN NOT NULL DEFAULT false,
    `text` VARCHAR(191) NOT NULL,
    `btn_sticky` BOOLEAN NOT NULL DEFAULT false,
    `hide_shopify_buynow` BOOLEAN NOT NULL DEFAULT false,
    `hide_addtocart` BOOLEAN NOT NULL,
    `background_color` VARCHAR(191) NOT NULL,
    `text_color` VARCHAR(191) NOT NULL,
    `font_size` DOUBLE NOT NULL,
    `animation` VARCHAR(191) NOT NULL,
    `border_color` VARCHAR(191) NOT NULL,
    `border_width` DOUBLE NOT NULL,
    `button_width` DOUBLE NOT NULL,
    `button_padding` DOUBLE NOT NULL,
    `button_fontfamily` VARCHAR(191) NOT NULL DEFAULT 'Theme Default',

    UNIQUE INDEX `shop`(`shop`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `button_analytics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shop` VARCHAR(191) NOT NULL,
    `click_count` INTEGER NOT NULL,
    `date` VARCHAR(191) NOT NULL DEFAULT '',
    `convertion_count` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
