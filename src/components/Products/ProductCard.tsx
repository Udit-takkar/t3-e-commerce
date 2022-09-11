/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";

function Placeholder() {
  return (
    <div className="w-full h-[90px] max-w-[90px] rounded-lg  animate-pulse" />
  );
}

const ProductCard = ({
  product,
  handleCartActions,
  isInCart,
  onlyAboveProduct,
  percentage,
  isDiscount,
  addToCart,
}: any) => {
  return (
    <div className="w-full items-center">
      <Link key={product.id} href={`/products/${product.id}`}>
        <a className="relative flex items-center justify-center" href="/">
          <LazyLoadImage
            effect="blur"
            delayTime={500}
            className="bg-white min-w-[90px] h-[260px] rounded-lg	w-full text-center"
            src={product.image}
            alt={product.name}
            placeholder={<Placeholder />}
            srcSet={product.image}
          />

          {isDiscount && (
            <div className="absolute font-bold mr-1 mt-1 pt-1 bg-[#ee741f] inline-block w-16 h-7 rounded top-1 right-2 text-sm text-white whitespace-nowrap align-baseline	text-center	">
              {percentage}% Off
            </div>
          )}
        </a>
      </Link>
      <div className="flex flex-col pb-10">
        <Link key={product.id} href={`/products/${product.id}`}>
          <a href="/">
            <h2
              style={{ transition: "opacity 0.2s" }}
              className="font-medium pt-10 text-sm capitalize"
            >
              {product.name.length > 40
                ? `${product.name.slice(0, 40).toLowerCase()}..`
                : product.name.toLowerCase()}
            </h2>
          </a>
        </Link>
        <div className="flex items-center justify-between mt-5">
          <div className="flex items-center">
            <div className="font-medium text-sm pr-2">₹{product.salePrice}</div>
            {isDiscount && (
              <div className="text-gray-500 line-through">₹{product.price}</div>
            )}
          </div>

          {isInCart ? (
            <ButtonCounter
              count={onlyAboveProduct.quantity}
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
          ) : (
            <ButtonAdd addProductToCart={() => addToCart({ item: product })} />
          )}
        </div>
      </div>
    </div>
  );
};

interface ButtonAddProps {
  addProductToCart: () => void;
  styles?: React.CSSProperties;
}

export function ButtonAdd({ addProductToCart, styles = {} }: ButtonAddProps) {
  return (
    <button
      className="parent flex rounded items-center justify center font-medium cursor-pointer text-addBtn border border-addBtn py-1 px-4 hover:text-white hover:bg-addBtn	"
      type="button"
      onClick={addProductToCart}
      style={{ transition: "all 0.2s ease 0s", ...styles }}
    >
      <span className="mr-2">Add</span>
      <svg
        className="fill-addBtn parent-hover"
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 12 12"
      >
        <g>
          <path d="M6 0c.385 0 .702.29.745.663L6.75.75v10.5c0 .414-.336.75-.75.75-.385 0-.702-.29-.745-.663l-.005-.087V.75C5.25.336 5.586 0 6 0z" />
          <path d="M11.25 5.25c.414 0 .75.336.75.75 0 .385-.29.702-.663.745l-.087.005H.75C.336 6.75 0 6.414 0 6c0-.385.29-.702.663-.745L.75 5.25h10.5z" />
        </g>
      </svg>
    </button>
  );
}

interface ButtonContainerProps {
  count: number;
  decreaseProductInCart: () => void;
  increaseProductInCart: () => void;
  styles?: React.CSSProperties;
}

export function ButtonCounter({
  count,
  decreaseProductInCart,
  increaseProductInCart,
  styles = {},
}: ButtonContainerProps) {
  return (
    <div
      className="flex border border-addBtn rounded w-[95px]  space-between items-center p-1"
      style={styles}
    >
      <div
        onClick={decreaseProductInCart}
        className="cursor-pointer flex items-center justify-center flex-1 h-full"
      >
        <MinusSmIcon
          color="rgb(20, 110, 180)"
          className="h-5 w-5"
          aria-hidden="true"
        />
      </div>
      <div className="flex text-addBtn flex-1 items-center justify-center bg-addBtn bg-opacity-10 h-full">
        {count}
      </div>
      <div
        onClick={increaseProductInCart}
        className="cursor-pointer flex items-center justify-center flex-1 h-full"
      >
        <PlusSmIcon
          className="h-5 w-5"
          color="rgb(20, 110, 180)"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export default ProductCard;
