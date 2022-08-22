import React from "react";
import Image from "next/image";
import MainImg from "../assets/MainImage.png";
import ProductSection from "./Products/ProductSection";
import { useRouter } from "next/router";
// import useProducts from "../hooks/useProducts";
import ProductCard from "./Products/ProductCard";
// import useCart from "../hooks/useCart";
import Link from "next/link";
import { data } from "../../test";

export function getPercentageDecreased(
  originalPrice: number,
  basePrice: number
) {
  return Math.round(((originalPrice - basePrice) / originalPrice) * 100);
}

const HomePage: React.FC = (props) => {
  const router = useRouter();
  //   const { data, setQueryVariables, isLoading } = useProducts();
  //   const { addToCart, cart, removeFromCart } = useCart();

  return (
    <div className="relative bg-transparent	pt-32 pb-16">
      <div className="relative z-10 w-full mt-0 mx-auto bg-transparent max-w-[1160px] font-jakarta">
        <div className="grid grid-cols-2">
          <div className="self-center	justify-self-start	max-w-full mb-0 flex-col justify-center align-center text-left">
            <h1 className="mb-4 leading-tight	 text-black text-6xl tracking-tighter font-bold		 font-jakarta">
              <strong>Create your own live commerce communities</strong>
            </h1>
            <p className="mb-2 text-[#555] text-xl tracking-tight">
              Stand out from the competition by delivering a groundbreaking
              customer experience with one-click video calls. Create an
              unparalleled digital experience no one else can match.
            </p>
            <div className="w-full">
              <button
                type="button"
                className="font-poppins font-semibold text-white  px-20 py-3  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80  rounded-lg text-md text-center "
              >
                Get Started
              </button>

              <button
                type="button"
                onClick={() => router.push("/howitworks")}
                className="font-poppins font-semibold ml-5 px-20 py-3  bg-gradient-to-r  hover:bg-gradient-to-br   shadow-lg shadow-cyan-500/50 rounded-lg text-md text-center "
              >
                How it works?
              </button>
            </div>
          </div>
          <Image
            className="self-center justify-self-center opacity-100	"
            src={MainImg}
            alt="Home Page"
          />
        </div>
      </div>
      {/* Categories here */}
      <div className="my-8">
        <div className="container mx-auto px-6">
          <div className="bg-1 h-64 rounded-md overflow-hidden bg-cover bg-center">
            <div className=" bg-opacity-50 flex items-center h-full">
              <div className="px-10 max-w-xl">
                <h2 className="text-2xl text-white font-semibold">
                  Bilassa Handlooms
                </h2>
                <button
                  type="button"
                  className="flex items-center mt-4 px-3 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                >
                  <span>Shop Now</span>
                  <svg
                    className="h-5 w-5 mx-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex mt-8 md:-mx-4">
            <div className="bg-2 w-full  h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2">
              <div className=" bg-opacity-50 flex items-center h-full">
                <div className="px-10 max-w-xl">
                  <h2 className="text-2xl text-white font-semibold">
                    Office Accessories
                  </h2>
                  <button
                    type="button"
                    className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none"
                  >
                    <span>Shop Now</span>
                    <svg
                      className="h-5 w-5 mx-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-3 w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2">
              <div className=" bg-opacity-50 flex items-center h-full">
                <div className=" px-10 max-w-xl">
                  <h2 className="text-2xl text-white font-semibold">
                    Handloom Fashion Bags
                  </h2>
                  <button
                    type="button"
                    className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none"
                  >
                    <span>Shop Now</span>
                    <svg
                      className="h-5 w-5 mx-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Top Categories with products */}
      {/* <div> */}
      <div className="lg:col-span-3 mx-12">
        <div className="flex justify-between items-center mx-4">
          <h1 className="font-bold  text-2xl mt-16 mb-8">Trending Products</h1>
          <Link href="/products" className="cursor-pointer">
            <h1 className=" text-blue-500 mr-4 cursor-pointer">See All</h1>
          </Link>
        </div>
        <div className="grid mt-3 grid-cols-products gap-8">
          {data?.products?.slice(4, 12).map((product) => {
            // const onlyAboveProduct = cart.filter(
            //   (item) => item._id === product._id
            // )[0];
            const onlyAboveProduct = false;
            const isInCart = !!onlyAboveProduct;

            const percentage = getPercentageDecreased(
              product.price,
              product.sale_price
            );

            const isDiscount = product.price !== product.sale_price;

            const handleAddToCart = () => {
              //   addToCart(product);
            };
            return (
              <ProductCard
                product={product}
                key={product.name}
                category_id={product.category.id}
                handleAddToCart={handleAddToCart}
                isInCart={isInCart}
                onlyAboveProduct={onlyAboveProduct}
                removeFromCart={() => {}}
                percentage={percentage}
                isDiscount={isDiscount}
              />
            );
          })}
        </div>
      </div>

      {/* {data.top_products.map(product => (
        <ProductSection key={product.category_name} {...product} />
      ))} */}
    </div>
  );
};

export default HomePage;
