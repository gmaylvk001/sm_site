"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function OnSaleSection() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCat, setActiveCat] = useState("");

  useEffect(() => {
    fetch("/api/home/categories")
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        if (data.length) loadProducts(data[0].category_slug);
      });
  }, []);

  

  const loadProducts = async (slug) => {
    setActiveCat(slug);
    
    const res = await fetch(`/api/home/onsale?category=${slug}`);
    const data = await res.json();
    console.log('data : ',data);
    setProducts(data.data || []);
  };

  
  console.log('products : ',products);

  return (
    <section className="w-full inner-section-padding bg-linear-to-r from-linearyellow via-white to-linearyellow py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT CATEGORY LIST */}
        <div className="space-y-4">
          <h2 className="text-2xl text-primary font-bold">
            On-Sale Products
          </h2>

          <div className="flex lg:flex-col gap-3 overflow-x-auto">
            {categories.map(cat => (
              <div
                key={cat._id}
                onClick={() => loadProducts(cat.category_slug)}
                className={`flex items-center cursor-pointer border-2 rounded-full p-1 bg-white
                  ${activeCat === cat.category_slug
                    ? "border-red-600"
                    : "border-primary"
                  }`}
              >
                <Image
                  src={`${cat.image}`}
                  alt={cat.category_name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <span className="text-red-600 font-bold text-sm ml-3 pr-3">
                  {cat.category_name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="lg:col-span-2 grid grid-cols-2 max-sm:grid-cols-1 gap-4">
          {products.map((p, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-4 flex gap-4">
              <Image
                src={`/uploads/products/${p.image}`}
                alt={p.name}
                width={110}
                height={110}
                className="object-contain"
              />

              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-1">
                    Brand : {p.brand}
                  </p>
                  <h3 className="font-semibold text-sm">
                    {p.name}
                  </h3>
                </div>

                <ul className="text-xs text-gray-500">
                  {p.specs?.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>

                <div className="flex justify-between mt-2">
                  <span className="text-red-600 font-bold">
                    ₹ {p.price}
                  </span>
                  <span className="line-through text-gray-400 text-sm">
                    ₹ {p.mrp}
                  </span>
                </div>

                <div className="flex justify-between mt-2">
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    {p.discount}% OFF
                  </span>
                  <button className="bg-green-500 p-1.5 rounded-full">
                    <i className="fi fi-brands-whatsapp text-white"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
