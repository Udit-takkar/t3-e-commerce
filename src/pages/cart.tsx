import React from "react";
import useCart from "../store/cart/Cart";
import { ButtonCounter } from "../components/Products/ProductCard";
import Image from "next/image";
import ShoppingCart from "../assets/cart.jpeg";
import type { ProductType } from "../store/cart";
import { useHasMounted } from "../hooks/usHasMounted";

interface handleCartActionstProps {
  product: ProductType;
  action: "increase" | "decrease";
}

const DELIVERY_CHARGE: number = 30;

function Cart() {
  const hasMounted = useHasMounted();
  const total = useCart((state) => state.total);
  const totalItems = useCart((state) => state.totalQty);
  const cart = useCart((state) => state.items);
  const removeFromCart = useCart((state) => state.remove);
  const updateCart = useCart((state) => state.update);

  if (!hasMounted) return "Loading...";

  const handleCartActions = ({ product, action }: handleCartActionstProps) => {
    if (action === "decrease" && product?.quantity === 1) {
      removeFromCart({
        productId: product.id,
        productPrice: product.salePrice ? product.salePrice : product.price,
        productQuantity: product.quantity,
      });
    } else if (product.quantity) {
      updateCart({
        productId: product.id,
        productPrice: product.salePrice ? product.salePrice : product.price,
        productQuantity: product.quantity,
        action,
      });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="header-landing">
        <div className="flex">
          <div className="SCartHeading text-2xl font-bold">Checkout</div>
          <div className="SBadge  text-2xl font-bold ml-2 text-blue-500">
            (0)
          </div>
        </div>
        <div className="flex items-center justify-center flex-col">
          <Image src={ShoppingCart} height={500} width={500} alt="empty-cart" />
          <h1 className="text-center text-xl">
            <span className="font-bold text-3xl">Your Cart is empty</span>
            <br /> You don&apos;t have any products in your cart.
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-transparent	pt-32 pb-16 px-4 lg:px-16">
      <div className="grid grid-cols-12 gap-4">
        <div className="flex grid-cols-1">
          <div className="text-3xl font-bold">Checkout</div>
          {totalItems && (
            <div className="text-3xl font-bold ml-2 text-blue-500">
              ({totalItems})
            </div>
          )}
        </div>
        <div className="SCartRow mt-8">
          {cart.map((product) => (
            <div className="flex mt-0 mb-8" key={product.id}>
              <Image
                className="SCartImage mr-8"
                src={product.image}
                width="100%"
                height="100%"
                alt="product-cart"
              />
              <div className="ml-5">
                <h2 className="text-xl text-400">
                  {product.name.toLowerCase()}
                </h2>

                <div className="text-xs font-bold mb-4 mt-2">
                  <span>₹</span>
                  {` ${product.salePrice.toFixed(2)}`}
                </div>

                <ButtonCounter
                  count={product.quantity ?? 0}
                  increaseProductInCart={() => {
                    handleCartActions({
                      product,
                      action: "increase",
                    });
                  }}
                  decreaseProductInCart={() => {
                    handleCartActions({
                      product,
                      action: "decrease",
                    });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="SCartCheckout ">
          <div className="flex flex-col mt-6">
            <div className="SCheckoutHeader bg-gray-100 p-8 rounded-lg">
              <div className="justify-between flex items-center">
                <div className="text-xl p-2">Item Total </div>
                <div className="">{total.toFixed(2)} </div>
              </div>
              <div className="justify-between flex items-center">
                <div className="text-xl p-2">Delivery</div>
                <div>{DELIVERY_CHARGE}</div>
              </div>
              <div className="justify-between flex items-center">
                <div className="text-xl font-bold p-2">Grand Total</div>
                <div>{(total + DELIVERY_CHARGE).toFixed(2)}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {}}
              className="mt-4 get-started-btn font-helvetica text-white px-20 py-3  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-md text-center "
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
