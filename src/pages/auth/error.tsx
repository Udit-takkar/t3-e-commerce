import React from "react";
import { useRouter } from "next/router";

const ErrorPage = () => {
  const router = useRouter();
  const { error } = router.query;
  console.log("ERROR", error);
  return <div>Error Page</div>;
};

export default ErrorPage;
