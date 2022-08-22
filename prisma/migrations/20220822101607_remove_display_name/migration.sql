/*
  Warnings:

  - You are about to drop the column `displayName` on the `role` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "RoleType" AS ENUM ('USER', 'SELLER', 'ADMIN');

-- AlterTable
ALTER TABLE "role" DROP COLUMN "displayName";
