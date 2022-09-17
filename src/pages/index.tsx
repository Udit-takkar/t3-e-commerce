import Head from "next/head";
import LandingPage from "../components/LandingPage";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { createSSGHelpers } from "@trpc/react/ssg";
import superjson from "superjson";
import { useHasMounted } from "../hooks/usHasMounted";
import { appRouter } from "../server/router";
import { prisma } from "../server/db/client";

export type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home = (props: HomePageProps) => {
  const hasMounted = useHasMounted();
  if (!hasMounted) return "Loading...";

  return (
    <>
      <Head>
        <title>t3 Live Commerce</title>
        <meta
          name="description"
          content="E commerce platform built with creeate-t3-app stack"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LandingPage {...props} />
    </>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const ssg = await createSSGHelpers({
      router: appRouter,
      ctx: {
        prisma: prisma,
      },
      transformer: superjson, // optional - adds superjson serialization
    });

    let products = await (
      await ssg.fetchQuery("products.trendingProducts")
    ).result;
    products = JSON.parse(JSON.stringify(products));

    return {
      props: {
        trpcState: ssg.dehydrate(),
        products,
      },
      revalidate: 100,
    };
  } catch (error) {
    return {
      props: {
        products: [],
      },
    };
  }
}

export default Home;
