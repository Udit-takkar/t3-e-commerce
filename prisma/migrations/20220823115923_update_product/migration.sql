/*
  Warnings:

  - You are about to drop the column `sale_price` on the `product` table. All the data in the column will be lost.
  - Added the required column `salePrice` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "sale_price",
ADD COLUMN     "salePrice" DOUBLE PRECISION NOT NULL;
