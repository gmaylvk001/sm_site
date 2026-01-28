"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import Link from 'next/link';

const BestSellers = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories initially
  useEffect(() => {
    const loadCategories = async () => {
      const res = await fetch("/api/home/best-sellers");
      const data = await res.json();

      if (data.ok && data.categories.length > 0) {
        setCategories(data.categories);
        setActiveCategory(data.categories[0]._id);
      }
    };
    loadCategories();
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    if (!activeCategory) return;

    const loadProducts = async () => {
      setLoading(true);
      const res = await fetch(
        `/api/home/best-sellers?category=${activeCategory}`
      );
      const data = await res.json();
      setProducts(data.products || []);
      setLoading(false);
    };

    loadProducts();
  }, [activeCategory]);

  return (
    <section className="inner-section-padding py-10 bg-linear-to-r from-primelinear via-white to-primelinear">
      <h2 className="text-2xl font-bold text-primary text-center mb-5">
        Best Price in the Market
      </h2>

      {/* CATEGORY SCROLL */}
      <div className="max-w-2xl mx-auto mb-5 overflow-x-auto">
        <div className="flex gap-x-2 justify-between">
          {categories.map((cat) => {
            const isActive = activeCategory === cat._id;
            return (
              <button
                key={cat._id}
                onClick={() => setActiveCategory(cat._id)}
                className="shrink-0 flex flex-col items-center gap-2"
              >
                
                <div
                  className={`border-2 rounded-full bg-white w-24 h-24 overflow-hidden ${
                    isActive ? "border-primary" : "border-gray-400"
                  }`}
                >
                  {cat.image && (
                    <Image
                      src={cat.image}
                      alt={cat.category_name}
                      width={96}
                      height={96}
                      className="object-cover p-2"
                    />
                  )}
                </div>
                <span
                  className={`text-sm font-bold ${
                    isActive ? "text-primary" : "text-gray-600"
                  }`}
                >
                  {cat.category_name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* IMAGE GRID */}
        <div className="grid max-sm:grid-cols-2 grid-cols-4 gap-4 mb-8">
            <div className="col-span-2">
            <Image
                src="/assets/images/mobile-main.png"
                alt="Mobile Main"
                width={600}
                height={600}
                className="w-full h-full object-cover rounded-lg"
            />
            </div>
    
            <Image
            src="/assets/images/iphone-cat main.png"
            alt="iPhone"
            width={300}
            height={600}
            className="w-full h-full object-cover rounded-lg"
            />
    
            <div className="flex flex-col gap-4">
            <Image
                src="/assets/images/andriod-cat-main.png"
                alt="Android"
                width={300}
                height={300}
                className="w-full h-full object-cover rounded-lg"
            />
            <Image
                src="/assets/images/keypad-cat-main.png"
                alt="Keypad"
                width={300}
                height={300}
                className="w-full h-full object-cover rounded-lg"
            />
            </div>
        </div>

      {/* PRODUCT SWIPER */}
      <div className="relative">
        <div className="product-nav-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-primary rounded-full flex items-center justify-center cursor-pointer">
          ‹
        </div>
        <div className="product-nav-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-primary rounded-full flex items-center justify-center cursor-pointer">
          ›
        </div>

        <Swiper
          modules={[Navigation]}
          navigation={{
            nextEl: ".product-nav-next",
            prevEl: ".product-nav-prev",
          }}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            550: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {loading
            ? [...Array(4)].map((_, i) => (
                <SwiperSlide key={i}>
                  <div className="h-[380px] bg-gray-200 rounded-xl animate-pulse" />
                </SwiperSlide>
              ))
            : products.map((product) => (
                <SwiperSlide key={product._id}>
                  <div className="rounded-xl bg-linear-120 from-yellow-200 to-pink-200 p-4 h-[430px] flex flex-col">

  {/* IMAGE WRAPPER (FIXED HEIGHT) */}
  <div className="bg-white rounded-lg p-4 flex justify-center items-center h-[260px]">
 <Link href={`/product/${product.slug}`}>
    <Image
      src={`/uploads/products/${product.images?.[0]}`}
      alt={product.name}
      width={200}
      height={250}
      className="object-contain max-h-full"
    />
    </Link>
  </div>

  {/* CONTENT (FLEX GROWS EVENLY) */}
  <div className="mt-3 text-sm flex flex-col flex-1 justify-between">

    {/* PRODUCT TITLE */}
    <Link href={`/product/${product.slug}`}>
    <p className="font-semibold line-clamp-2 min-h-[40px]">
      {product.name}
    </p>
              </Link>
    {/* PRICE SECTION (ALWAYS BOTTOM) */}
    <div className="mt-2">
      <span className="font-bold text-lg">
        ₹ {product.special_price || product.price}
      </span>

      {product.special_price && (
        <span className="text-red-500 line-through ml-2">
          ₹ {product.price}
        </span>
      )}
    </div>

  </div>
</div>

                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BestSellers;
