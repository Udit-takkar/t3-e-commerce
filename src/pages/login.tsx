/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from "next/head";
import { useState, forwardRef, useCallback, ReactNode } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import Link from "next/link";
// import { AuthServices } from "../services/AuthServices";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

// import { mutate } from "swr";
// import { autoLogin } from "../utils/auth";

interface LoginValues {
  email: string;
  password: string;
}

export default function Signin() {
  const router = useRouter();
  const form = useForm<LoginValues>();
  const { formState, handleSubmit } = form;
  const { isSubmitting } = formState;
  const login = async () => {
    // const { token } = await AuthServices.login(email, password);
    // autoLogin(token);
    // mutate("/api/me");
  };

  const onSubmit = async (data) => {
    const fields = { fields: data };
    console.log("fields", fields);
  };

  return (
    <div className=" flex min-h-screen flex-col items-center justify-center py-16 bg-gray-100">
      <Head>
        <title>t3-E-commerce Login Page</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <div className="bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl">
          <div className="w-3/5 p-5">
            <form className="py-10" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col justify-center text-left mb-10 w-96 ml-10">
                <h2 className="text-2xl font-bold text-blue-500 text-left">
                  Log in
                </h2>
                <p className="text-sm text-gray-400">
                  Welcome to t3-E-commerce, please put your login credentials
                  below to start using.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-gray-100 w-96 p-2 flex items-center">
                  <FaRegEnvelope className="text-gray-400 m-2" />
                  <input
                    id="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    inputMode="email"
                    type="email"
                    placeholder="Email"
                    className="bg-gray-100 outline-none text-sm flex-1"
                    required
                    {...form.register("email")}
                  />
                </div>
                <div className="bg-gray-100  w-96 p-2 flex items-center mt-3">
                  <MdLockOutline className="text-gray-400 m-2" />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    autoComplete="current-password"
                    className="bg-gray-100 outline-none text-sm flex-1"
                    {...form.register("password")}
                  />
                </div>
                <div className="flex w-96 mb-5 mt-4 justify-between">
                  <label className="flex items-center text-xs">
                    <input type="checkbox" name="remember" className="mr-1" />
                    Remember me
                  </label>
                  <a href="#" className="text-xs ">
                    Forgot Password?
                  </a>
                </div>
                <button
                  type="submit"
                  className="text-white text-md px-12 py-2 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-center mr-2 mb-2 "
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
          <div className="w-2/5 font-helvetica text-white   bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg dark:shadow-lg font-medium rounded-lg text-md text-center shadow-blue-500/50 dark:shadow-blue-800/80" />
        </div>
      </main>
    </div>
  );
}
