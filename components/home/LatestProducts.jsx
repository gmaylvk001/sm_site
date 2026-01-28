"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import Link from 'next/link';

export default function LatestProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/home/latest-products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  if (!products.length) return null;

  const leftProducts = products.slice(0, 3);
  const swiperProducts = products.slice(3, 8);

  return (
    <section className="w-full py-10 bg-linear-to-r from-linearyellow via-white to-linearyellow inner-section-padding">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-4 text-center md:col-span-2 lg:col-span-1 lg:text-left z-50">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl text-primary font-bold">
              Latest Products
            </h2>

            <button className="bg-linear-to-r from-red-700 to-red-500 text-white p-2 rounded-md text-sm font-semibold">
              View All
            </button>
          </div>

          <div className="grid grid-rows-3 gap-y-2.5">
            {leftProducts.map((product) => (
              <div
                key={product._id}
                className="flex items-center rounded-xl bg-linear-to-tr from-pink-200 to-orange-200 p-3"
              >
                <div className="bg-white rounded-xl overflow-hidden shrink-0">
                  <Link href={`/product/${product.slug}`}>
                  <Image
                    src={
                      product.images?.[0]
                        ? `/uploads/products/${product.images[0]}`
                        : "/assets/images/no-image.png"
                    }
                    alt="Product Image"
                    width={130}
                    height={130}
                    className="object-contain"
                  />
                  </Link>
                </div>

                <div className="ml-4">
                  <Link href={`/product/${product.slug}`}>
                  <p className="font-semibold text-sm mb-2 line-clamp-2">
                    {product.name}
                  </p>
                  </Link>

                  <div className="flex flex-wrap items-center gap-x-3">
                    <span className="text-red-600 font-bold text-lg">
                      ₹ {product.special_price || product.price}
                    </span>

                    {product.special_price && (
                      <span className="text-gray-500 line-through font-bold text-sm">
                        ₹ {product.price}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER SWIPER */}
        <div className="relative md:col-span-1 z-0">

          {/* Navigation */}
          <div className="latest-prev absolute z-50 left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer">
            <i className="fi fi-ss-angle-small-left text-white"></i>
          </div>

          <div className="latest-next absolute z-50 right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer">
            <i className="fi fi-ss-angle-small-right text-white"></i>
          </div>

          <Swiper
            modules={[Navigation, EffectCards]}
            effect="cards"
            slidesPerView={1}
            navigation={{
              nextEl: ".latest-next",
              prevEl: ".latest-prev",
            }}
            className="w-full max-w-sm mx-auto"
          >
            {swiperProducts.map((product) => (
              <SwiperSlide
                key={product._id}
                className="bg-pink-100 rounded-xl shadow-md p-4"
              >
                <div className="bg-white rounded-xl h-[300px] flex items-center justify-center">
                  <Image
                    src={
                      product.images?.[0]
                        ? `/uploads/products/${product.images[0]}`
                        : "/assets/images/no-image.png"
                    }
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-contain"
                  />
                </div>

                <div className="mt-4 text-sm">
                  <Link href={`/product/${product.slug}`}>
                  <p className="font-semibold mb-2 line-clamp-2">
                    {product.name}
                  </p>
                    </Link>
                  <ul className="text-gray-700 text-xs space-y-1">
                    <li>Brand : {product.brand || "-"}</li>
                    <li>Stock : {product.stock_status}</li>
                  </ul>

                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    <span className="text-red-600 font-bold text-lg">
                      ₹ {product.special_price || product.price}
                    </span>

                    {product.special_price && (
                      <span className="line-through text-gray-400 text-sm">
                        ₹ {product.price}
                      </span>
                    )}

                    <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                      Hot
                    </span>

                    <button className="w-8 h-8 rounded-full border-2 border-green-600 flex items-center justify-center">
                      <i className="fi fi-brands-whatsapp text-green-600"></i>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* RIGHT PROMO IMAGE */}
        <div className="flex justify-center lg:justify-end z-50 rounded-2xl overflow-hidden">
          <Image
            src="/assets/images/iphone-cat main.png"
            alt="Promo"
            width={400}
            height={600}
            className="object-cover rounded-2xl"
          />
        </div>

      </div>
    </section>
  );
}
