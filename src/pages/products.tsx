import { Fragment, useState, useRef, useEffect } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import ProductCard from "../components/Products/ProductCard";
import Head from "next/head";
// import { CategoryService } from "../services/CategoryService";
import getPercentageDecrease from "../utils/getPercentDecrease";
import { data } from "../../test";
import { useRouter } from "next/router";
import { useInViewObserver } from "../hooks/useInViewObserver";
import { trpc } from "../utils/trpc";
import classNames from "../lib/classnames";
import { useOnScreen } from "../hooks/useOnScreen";
import useCart from "../store/cart/Cart";
import { handleCartActionstProps } from "../components/LandingPage";

const categories = [
  { _id: 1, name: "kuch bhi" },
  { _id: 2, name: "kuch bhi" },
];

const sortOptions = [
  { name: "Price: Low to High", value: 1, id: 1 },
  { name: "Price: High to Low", value: -1, id: 2 },
  // { name: 'Best Rating', href: '#', current: false },
  // { name: "Newest", href: "#", current: false },
];
const subCategories = [
  { name: "Totes", href: "#" },
  { name: "Backpacks", href: "#" },
  { name: "Travel Bags", href: "#" },
  { name: "Hip Bags", href: "#" },
  { name: "Laptop Sleeves", href: "#" },
];
const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "beige", label: "Beige", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "purple", label: "Purple", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "2l", label: "2L", checked: false },
      { value: "6l", label: "6L", checked: false },
      { value: "12l", label: "12L", checked: false },
      { value: "18l", label: "18L", checked: false },
      { value: "20l", label: "20L", checked: false },
      { value: "40l", label: "40L", checked: true },
    ],
  },
];

export default function Products() {
  const router = useRouter();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const [activeSortFilterId, setActiveSortFilterId] = useState(1);

  //   const { addToCart, cart, removeFromCart } = useCart();
  const query = trpc.useInfiniteQuery(["products.all", { limit: 4 }], {
    // first render has status `undefined`
    enabled: router.isReady,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
  const moreRef = useRef<HTMLDivElement | null>(null);
  const onScreen = useOnScreen(moreRef);

  const addToCart = useCart((state) => state.add);
  const updateCart = useCart((state) => state.update);
  const cartItems = useCart((state) => state.items);
  const removeFromCart = useCart((state) => state.remove);
  const handleCartActions = ({ product, action }: handleCartActionstProps) => {
    if (action === "decrease" && product?.quantity === 1) {
      removeFromCart({
        productId: product.id,
        productPrice: product.salePrice ? product.salePrice : product.price,
        productQuantity: product.quantity,
      });
    } else if (product?.quantity) {
      updateCart({
        productId: product.id,
        productPrice: product.salePrice ? product.salePrice : product.price,
        productQuantity: product.quantity,
        action,
      });
    }
  };
  console.log("Queryi", query);

  useEffect(() => {
    if (!query.isFetching && query.hasNextPage && query.status === "success") {
      query.fetchNextPage();
    }
  }, [onScreen, query]);

  return (
    <div className="bg-white">
      <Head>
        <title>t3-E-Commerce Products</title>
        <meta name="description" content="Aakriti" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="font-medium text-gray-900 px-2 py-3"
                  >
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href} className="block px-2 py-3">
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul>

                  <Disclosure
                    as="div"
                    className="border-t border-gray-200 px-4 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-mx-2 -my-3 flow-root">
                          <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              Categories
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-6">
                            {categories?.map((category, optionIdx) => (
                              <div
                                key={category._id}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-mobile-${category._id}-${optionIdx}`}
                                  name={`${category._id}[]`}
                                  defaultValue={category.name}
                                  type="checkbox"
                                  defaultChecked={false}
                                  checked={category.Id === activeCategoryId}
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${category._id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {category.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusSmIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="ml-3 min-w-0 flex-1 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Products
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <button
                              type="button"
                              onClick={() => {
                                setActiveSortFilterId(option.id);
                                // setQueryVariables((prev) => ({
                                //   ...prev,
                                //   price: option.value,
                                // }));
                              }}
                              className={classNames(
                                option.id === activeSortFilterId
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">View grid</span>
                <ViewGridIcon className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FilterIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200"
                >
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>

                <Disclosure
                  as="div"
                  className="border-b border-gray-200 py-6"
                  defaultOpen
                >
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Categories
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusSmIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusSmIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <div className="space-y-4">
                          {categories?.map((category, optionIdx) => (
                            <div
                              key={category._id}
                              className="flex items-center"
                            >
                              <input
                                id={`filter-${category._id}-${optionIdx}`}
                                name={`${category._id}[]`}
                                type="checkbox"
                                defaultChecked={false}
                                checked={activeCategoryId === category._id}
                                onClick={() => {
                                  if (activeCategoryId === category._id) {
                                    // setActiveCategoryId(null);
                                    // setQueryVariables((prev) => ({
                                    //   ...prev,
                                    //   category: null,
                                    // }));
                                  } else {
                                    // setActiveCategoryId(category._id);
                                    // setQueryVariables((prev) => ({
                                    //   ...prev,
                                    //   category: category._id,
                                    // }));
                                  }
                                }}
                                className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-${category._id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {category.name}
                              </label>
                            </div>
                          ))}
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusSmIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className="grid mt-3 grid-cols-products gap-8">
                  {query.data?.pages.map((page) => {
                    return page?.result?.map((product) => {
                      const onlyAboveProduct = cartItems.filter(
                        (item) => item.id === product.id
                      )[0];
                      const isInCart = !!onlyAboveProduct;

                      const percentage = getPercentageDecrease(
                        product.price,
                        product.salePrice
                      );

                      const isDiscount: boolean = product.salePrice
                        ? product.price !== product.salePrice
                        : false;

                      return (
                        <ProductCard
                          product={product}
                          key={product.name}
                          handleCartActions={handleCartActions}
                          addToCart={addToCart}
                          isInCart={isInCart}
                          onlyAboveProduct={onlyAboveProduct}
                          percentage={percentage}
                          isDiscount={isDiscount}
                        />
                      );
                    });
                  })}
                </div>
              </div>
              <div ref={moreRef}></div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
