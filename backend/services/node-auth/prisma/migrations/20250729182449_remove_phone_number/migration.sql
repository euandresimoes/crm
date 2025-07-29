/*
  Warnings:

  - You are about to drop the column `phone_number` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_phone_number_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `phone_number`;
