/*
  Warnings:

  - You are about to drop the `cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cartItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_userId_fkey";

-- DropForeignKey
ALTER TABLE "cartItem" DROP CONSTRAINT "cartItem_cart_id_fkey";

-- DropForeignKey
ALTER TABLE "cartItem" DROP CONSTRAINT "cartItem_product_id_fkey";

-- DropTable
DROP TABLE "cart";

-- DropTable
DROP TABLE "cartItem";

-- CreateTable
CREATE TABLE "wishlistItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "wishlistItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WishlistItem_userId_fkey" ON "wishlistItem"("userId");

-- AddForeignKey
ALTER TABLE "wishlistItem" ADD CONSTRAINT "wishlistItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wishlistItem" ADD CONSTRAINT "wishlistItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
