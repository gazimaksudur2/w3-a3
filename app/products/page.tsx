"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { Product } from "../lib/products";
import { useProducts } from "../hooks/useProducts";


export default function ProductsPage() {

  const { products, loading } = useProducts();

  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");


  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);


  useEffect(() => {
    let result = [...products];


    if (search.trim()) {
      result = result.filter((product) =>
        product.title
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }


    if (category !== "all") {
      result = result.filter(
        (product) =>
          product.category.name === category
      );
    }


    if (maxPrice) {
      result = result.filter(
        (product) =>
          product.price <= Number(maxPrice)
      );
    }


    setFilteredProducts(result);

  }, [search, category, maxPrice, products]);



  const categories = [
    "all",
    ...Array.from(
      new Set(
        products.map(
          (product) => product.category.name
        )
      )
    ),
  ];



  if (loading) {
    return (
      <div className="
        flex min-h-[50vh] items-center justify-center
        text-gray-600
        dark:text-gray-300
      ">
        Loading products...
      </div>
    );
  }



  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10">


      <h1 className="
        mb-8 text-4xl font-bold
        text-gray-900
        dark:text-white
      ">
        All Products
      </h1>



      {/* FILTER AREA */}
      <div className="
        mb-10 grid gap-4 rounded-xl border p-5
        border-gray-200
        bg-gray-50
        dark:border-gray-800
        dark:bg-gray-900
        md:grid-cols-3
      ">


        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="
            rounded-lg border px-4 py-2
            border-gray-300
            bg-white
            text-gray-900
            placeholder:text-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            dark:border-gray-700
            dark:bg-gray-800
            dark:text-white
          "
        />



        <select
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          className="
            rounded-lg border px-4 py-2
            border-gray-300
            bg-white
            text-gray-900
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            dark:border-gray-700
            dark:bg-gray-800
            dark:text-white
          "
        >

          {categories.map((item)=>(
            <option key={item}>
              {item}
            </option>
          ))}

        </select>



        <input
          type="number"
          placeholder="Maximum price"
          value={maxPrice}
          onChange={(e)=>setMaxPrice(e.target.value)}
          className="
            rounded-lg border px-4 py-2
            border-gray-300
            bg-white
            text-gray-900
            placeholder:text-gray-400
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            dark:border-gray-700
            dark:bg-gray-800
            dark:text-white
          "
        />


      </div>




      {/* PRODUCT GRID */}
      <div className="
        grid gap-6
        sm:grid-cols-2
        lg:grid-cols-4
      ">


        {filteredProducts.map((product)=>(

          <div
            key={product.id}
            className="
              rounded-xl border p-4 shadow-sm
              border-gray-200
              bg-white
              transition
              hover:shadow-md
              dark:border-gray-800
              dark:bg-gray-900
            "
          >


            <div className="relative mb-4 h-56">

              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="
                  rounded-lg object-cover
                "
              />

            </div>



            <h2 className="
              font-semibold
              text-gray-900
              dark:text-white
            ">
              {product.title}
            </h2>



            <p className="
              mt-2
              text-gray-600
              dark:text-gray-300
            ">
              ${product.price}
            </p>



            <span className="
              text-sm
              text-gray-500
              dark:text-gray-400
            ">
              {product.category.name}
            </span>


          </div>

        ))}


      </div>



      {filteredProducts.length === 0 && (

        <p className="
          mt-10 text-center
          text-gray-500
          dark:text-gray-400
        ">
          No products found.
        </p>

      )}


    </main>
  );
}