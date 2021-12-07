import Head from "next/head";
import { useState } from "react";
import ProductItem from "../components/product/ProductItem";
import { getData } from "./../utils/fetchData";
export default function Home({ initialState, result }) {
  const [products, setProducts] = useState(initialState);
  return (
    <>
      <div className="px-2">
        <Head>
          <title>Home Page</title>
        </Head>

        {result === 0 ? (
          <h3>No Product Found</h3>
        ) : (
          products.map((elm, i) => <ProductItem key={i} product={elm} />)
        )}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await getData("product");
  //server side rendering
  console.log(res);

  return {
    props: {
      initialState: res.products,
      result: res.result,
    },
  };
}
