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
         <i className="fi fi-ss-angle-small-left text-white"></i>
        </div>
        <div className="product-nav-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-7 h-7 bg-primary rounded-full flex items-center justify-center cursor-pointer">
           <i className="fi fi-ss-angle-small-right text-white"></i>
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
     
        <div className="flex items-center justify-between mt-2">

            <span
                className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                {Math.round(100 - (Number(product.special_price) / Number(product.price)) * 100)}% Off
            </span>

            <a
              href={`https://wa.me/919047048777?text=${encodeURIComponent(`Check Out This Product: ${typeof window !== 'undefined' ? window.location.origin : ''}/product/${product.slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white p-1.5 sm:p-2 rounded-full flex items-center justify-center transition flex-shrink-0"
            >
              <svg className="w-3 h-1 sm:w-4 sm:h-4" viewBox="0 0 32 32" fill="currentColor">
                <path d="M16.003 2.667C8.64 2.667 2.667 8.64 2.667 16c0 2.773.736 5.368 2.009 7.629L2 30l6.565-2.643A13.254 13.254 0 0016.003 29.333C23.36 29.333 29.333 23.36 29.333 16c0-7.36-5.973-13.333-13.33-13.333zm7.608 18.565c-.32.894-1.87 1.749-2.574 1.865-.657.104-1.479.148-2.385-.148-.55-.175-1.256-.412-2.162-.812-3.8-1.648-6.294-5.77-6.49-6.04-.192-.269-1.55-2.066-1.55-3.943 0-1.878.982-2.801 1.33-3.168.346-.364.75-.456 1.001-.456.25 0 .5.002.719.013.231.01.539-.088.845.643.32.768 1.085 2.669 1.18 2.863.096.192.16.423.03.683-.134.26-.2.423-.39.65-.192.231-.413.512-.589.689-.192.192-.391.401-.173.788.222.392.986 1.625 2.116 2.636 1.454 1.298 2.682 1.7 3.075 1.894.393.192.618.173.845-.096.23-.27.975-1.136 1.237-1.527.262-.392.524-.32.894-.192.375.13 2.35 1.107 2.75 1.308.393.205.656.308.75.48.096.173.096 1.003-.224 1.897z" />
              </svg>
            </a>

        </div>
      
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
