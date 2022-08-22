/*
  Warnings:

  - You are about to drop the column `permissionId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `_PermissionToRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserPermissionRole" AS ENUM ('USER', 'ADMIN', 'SELLER');

-- DropForeignKey
ALTER TABLE "_PermissionToRole" DROP CONSTRAINT "_PermissionToRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_PermissionToRole" DROP CONSTRAINT "_PermissionToRole_B_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_permissionId_fkey";

-- DropForeignKey
ALTER TABLE "user" DROP CONSTRAINT "user_roleId_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "permissionId",
DROP COLUMN "roleId",
ADD COLUMN     "role" "UserPermissionRole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "_PermissionToRole";

-- DropTable
DROP TABLE "permission";

-- DropTable
DROP TABLE "role";

-- DropEnum
DROP TYPE "RoleType";
