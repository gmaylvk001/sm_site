"use client";

import { useEffect, useState  } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectCards } from "swiper/modules";
import Swiperr from "swiper";
import Link from 'next/link';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-cards";
import VideoModal from "./VideoModal";
import BestSeller from '@/components/home/BestSeller';
import LatestProducts from '@/components/home/LatestProducts';
import OnSaleSection from '@/components/home/OnSaleSection';

const videos = [
  {
    id: "vtSFhuZCde4",
    title: "Mobileனா நம்ம சத்யாதான்! | Buy the Latest Mobiles at SATHYA!",
  },
  {
    id: "XmgjuO14qdM",
    title: "Sathya Tirupati 2nd Anniversary Super Sale 🎁 Assured Gifts + Chairs Offer | Jan 26",
  },
  {
    id: "aOTjbRi4yDY",
    title: "உங்கள் சத்யா பொம்மிடியில் , ஷோரூமின் 2ஆம் ஆண்டு துவக்க விழா சிறப்பு விற்பனை",
  },
  {
    id: "iZMbSWuTlV0",
    title: "🪁✨ Biggest Sankranthi Sale at Sathya | Up to 70% OFF 🛍️🎁",
  },
];



export default function HomePage() {

  const brands = [
  "daikin",
  "general",
  "haier",
  "lg",
  "panasonic",
  "samsung",
  "onida",
  "sony",
];

const [activeVideo, setActiveVideo] = useState(null);
const [isBrandsLoading, setIsBrandsLoading] = useState(true);
const fetchBrands = async () => {
        setIsBrandsLoading(true);
        try {
            const response = await fetch('/api/brand/get');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.success) {
                setBrands(data.brands || []);
            }
        } catch (error) {
            console.error("Error fetching brands:", error);
            setBrands([]);
        } finally {
            setIsBrandsLoading(false);
        }
    };

const openVideo = (videoId) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, "_blank");
  };

   useEffect(() => {
    new Swiperr(".onsale-product-swiper", {
      slidesPerView: 1,
      navigation: {
        nextEl: ".onsale-product-nav-next",
        prevEl: ".onsale-product-nav-prev",
      },
    });
  }, []);

  /* Reusable Card */
function CategoryCard({ image, title, bg }) {
  return (
    <div className={`rounded-2xl overflow-hidden relative ${bg}`}>
      <Image
        src={image}
        alt={title}
        width={600}
        height={450}
        className="w-full h-full object-contain aspect-[4/3]"
      />
      <span className="absolute bottom-4 left-4 text-white font-semibold text-lg">
        {title}
      </span>
    </div>
  );
}

  return (
    
    <>
      {/* ================= FULL IMAGE BANNER ================= */}
      <section className="w-full overflow-hidden relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: ".banner-pagination" }}
          speed={800}
          className="bannerSwiper"
        >
          <SwiperSlide>
            <Image
              src="/assets/images/main-banner-1.webp"
              alt="Banner 1"
              width={1920}
              height={600}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>

          <SwiperSlide>
            <Image
              src="/assets/images/main-banner-3.webp"
              alt="Banner 2"
              width={1920}
              height={600}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        </Swiper>

        <div className="swiper-pagination banner-pagination" style={{ 
              width: `5%`,
            }}></div>
      </section>

      {/* ================= BANK OFFER STRIP ================= */}
      <section className="w-full bg-white border-dotted border-b">
        <div className="mx-5 py-4">
          <div className="flex gap-4 overflow-x-auto">
            {[
              "hsbc",
              "sbi-card",
              "onecard",
              "dbs",
              "bob-card",
            ].map((bank) => (
              <div
                key={bank}
                className="w-[250px] shrink-0 flex items-center gap-3 border rounded-xs border-gray-400 px-4 py-2 bg-white"
              >
                <Image
                  src={`/assets/images/banks/${bank}.svg`}
                  alt={bank}
                  width={60}
                  height={24}
                  className="h-6 object-contain border-r px-2 border-dotted"
                />
                <div className="text-xs leading-none">
                  <p className="text-[10px]">
                    5% Instant Discount Upto Rs.10,000 on Credit Card EMI
                  </p>
                  <p className="text-gray-400 text-[11px]">*T&C apply</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHAT'S HOT ================= */}
      <section className="inner-section-padding mt-5 mb-10">
        <h2 className="text-primary font-bold text-2xl mb-3">What&apos;s Hot</h2>

        <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-4">
          {[
            "/category/air-conditioner",
            "/category/mobiles",
            "/category/accessories",
            "/category/laptop-desktops",
          ].map((link, index) => (
            <Link href={link} key={index}>
              <Image
                src={`/assets/images/latest-sm-${index + 1}.png`}
                alt="Hot item"
                width={400}
                height={400}
                className="rounded-xl w-full h-full cursor-pointer hover:scale-105 transition-transform"
              />
            </Link>
          ))}
        </div>
      </section>

       {/* ================= BEST SELLERS ================= */}    
      <BestSeller />

        <div className="inner-section-padding my-10">
          <div className="my-0 rounded-2xl overflow-hidden">
            <Link href="/category/mobiles">
            <Image
              src="/assets/images/banner-w-pt-m-st.png"
              alt="Sony Banner"
              width={1400}
              height={400}
              className="w-full h-auto rounded-2xl"
            />
            </Link>
          </div>
        </div>

          {/* ================= Latest Products ================= */}  
        <LatestProducts />
    

    {/* TOP BANNER */}
      <div className="inner-section-padding my-10">
        <div className="my-0 rounded-2xl overflow-hidden">
          <Link href="/category/air-conditioner">
          <Image
            src="/assets/images/test-banner-w-pt.png"
            alt="AC"
            width={1400}
            height={400}
            className="w-full h-auto rounded-2xl"
            priority
          />
          </Link>
        </div>
        
      </div>

       {/* ================= Latest Products ================= */}  
        <OnSaleSection />

     

      <section className="inner-section-padding py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* LEFT BIG BANNER */}
        <div className="lg:col-span-2 relative rounded-2xl overflow-hidden bg-black min-h-[260px] lg:min-h-[420px]">
          <Image
            src="/assets/images/all-tv-image.png"
            alt="All LED"
            fill
            className="object-cover opacity-80"
            priority
          />

          <div className="relative z-10 p-6 lg:p-10 h-full flex flex-col justify-between">
            <h3 className="text-white text-2xl font-semibold">All LED</h3>
          </div>
        </div>

        {/* RIGHT GRID */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* QLED */}
          <CategoryCard
            image="/assets/images/qled-img.webp"
            title="QLED"
            bg="bg-gray-800"
          />

          {/* QNED */}
          <CategoryCard
            image="/assets/images/qned.webp"
            title="QNED"
            bg="bg-blue-900"
          />

          {/* OLED */}
          <CategoryCard
            image="/assets/images/oled.webp"
            title="OLED"
            bg="bg-gray-700"
          />

          {/* HD READY */}
          <CategoryCard
            image="/assets/images/hdready-Photoroom.png"
            title="HD READY"
            bg="bg-gray-600"
          />
        </div>
      </div>
    </section>

     <section className="w-full inner-section-padding bg-linear-to-r from-linearyellow via-white to-linearyellow py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-5 lg:gap-8 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-4 text-center md:col-span-2 lg:col-span-1 lg:text-left z-50">
          <div className="flex justify-between items-end">
            <h2 className="text-2xl text-primary font-bold">Top Seller&apos;s</h2>
            <button className="inline-block bg-linear-to-r from-red-700 to-red-500 text-white p-2 rounded-md text-sm font-semibold hover:opacity-90 transition">
              View All
            </button>
          </div>

          <div className="grid grid-rows-3 gap-y-2.5">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="flex items-center rounded-xl bg-linear-to-tr from-pink-200 to-orange-200 p-3"
              >
                <div className="bg-white rounded-xl overflow-hidden shrink-0">
                  <Image
                    src="/assets/images/apple-day-product-4.jpg"
                    alt="Product"
                    width={130}
                    height={130}
                  />
                </div>

                <div>
                  <p className="font-semibold text-sm ml-4 mb-2">
                    iPhone 16 128 GB: 5G Mobile Phone with Camera Control, A18 Chip
                    and a Big Boost in Battery Life.
                  </p>
                  <div className="flex items-center flex-wrap">
                    <span className="text-red-600 font-bold text-lg ml-4">
                      ₹ 90,382
                    </span>
                    <span className="text-gray-500 line-through font-bold text-sm ml-4">
                      ₹ 100,382
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER SLIDER */}
        <div className="relative z-0 col-span-2">
          {/* Navigation */}
          <div className="topselling-prev absolute z-50 left-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer">
            <i className="fi fi-ss-angle-small-left text-white" />
          </div>

          <div className="topselling-next absolute z-50 right-0 top-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center cursor-pointer">
            <i className="fi fi-ss-angle-small-right text-white" />
          </div>

          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".topselling-next",
              prevEl: ".topselling-prev",
            }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              550: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
            }}
            className="topselling-product-swiper"
          >
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <SwiperSlide key={i}>
                <div className="rounded-xl bg-linear-120 from-yellow-200 to-pink-200 p-4 h-full">
                  {/* Image */}
                  <div className="bg-white relative rounded-lg p-4 flex justify-center items-center h-[300px]">
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                      Hot deal
                    </span>

                    <Image
                      src="/assets/images/apple-day-product.png"
                      alt="Product"
                      width={260}
                      height={260}
                      className="object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="mt-3 text-sm">
                    <p className="text-gray-600">Brand : Daikin</p>

                    <p className="font-semibold text-gray-800 leading-tight mt-1">
                      Daikin FTKL71UV16 2 Ton 4 Star Inverter Split AC
                    </p>

                    <div className="mt-2">
                      <span className="font-bold text-black text-lg">
                        ₹ 56,449.00
                      </span>
                      <span className="text-red-500 line-through ml-2">
                        ₹ 64,928.00
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                        30% Off
                      </span>

                      <button className="w-8 h-8 rounded-full border-2 border-green-600 flex items-center justify-center">
                        <i className="fi fi-brands-whatsapp text-green-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>

     {/* TOP BANNER */}
      <div className="inner-section-padding my-10">
        <div>
          <Image
            src="/assets/images/channels4_banner.jpg"
            alt="Sony Banner"
            width={1920}
            height={600}
            className="rounded-2xl w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* NEWLY ARRIVED SECTION */}
      <section className="w-full inner-section-padding bg-linear-to-r from-linearyellow via-white to-linearyellow py-10">
        <h2 className="text-primary font-semibold text-2xl mb-4">
          Newly Arrived
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">

          {/* LEFT: PRODUCT IMAGE */}
          <div className="flex flex-col items-center">
            <Image
              src="/assets/images/newly-arrived.png"
              alt="iPhone"
              width={320}
              height={500}
              className="object-contain"
            />
          </div>

          {/* MIDDLE: PRODUCT HIGHLIGHTS */}
          <div>
            <h3 className="text-primary text-2xl font-semibold mb-4">
              Product Highlights
            </h3>

            <ul className="productHighlights">
              <li>A18 chip with Apple Intelligence</li>
              <li>Super Retina XDR OLED display</li>
              <li>New Camera Control button</li>
              <li>Long-lasting all-day battery</li>
              <li>USB-C fast charging support</li>
            </ul>
          </div>

          {/* RIGHT: PRODUCT FEATURES */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-primary font-semibold text-2xl mb-4">
              Product Features
            </h3>

            <ul className="productFeatures">
              <li>
                Powered by the next-generation A18 chip for faster and smoother
                performance
              </li>
              <li>
                Apple Intelligence support for smarter AI-driven experiences
              </li>
              <li>
                48MP advanced camera system with improved night and portrait
                photography
              </li>
            </ul>
          </div>
        </div>
      </section>

       <section className="w-full inner-section-padding py-10">

      {/* HEADER */}
      <div className="flex justify-between items-end mb-5">
        <h2 className="bg-linear-120 from-red-600 to-red-800 text-white text-lg px-3 py-1 rounded">
          Brands
        </h2>

        <a
          href="#"
          className="bg-linear-120 from-red-600 to-red-800 text-white text-lg px-3 py-1 rounded"
        >
          View all
        </a>
      </div>

      {/* SWIPER */}
      <div className="bg-linear-to-r from-primelinear to-yellow-200 p-4 rounded-lg">
        <Swiper
          modules={[Autoplay]}
          loop
          grabCursor
          freeMode={{
            enabled: true,
            momentum: false,
          }}
          speed={2000}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            400: { slidesPerView: 3 },
            640: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            992: { slidesPerView: 6 },
            1200: { slidesPerView: 7 },
            1300: { slidesPerView: 8 },
          }}
        >
          {[...brands, ...brands, ...brands].map((brand, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <a href="#">
                <div className="bg-white rounded-xl p-3 flex items-center justify-center">
                  <Image
                    src={`/assets/images/brands/${brand}.png`}
                    alt={brand}
                    width={80}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>

    <section className="w-full inner-section-padding py-5">
        <h2 className="text-primary mb-5 text-2xl font-bold">
          What&apos;s Trending
        </h2>

        <Swiper
          slidesPerView={1}
          breakpoints={{
            450: { slidesPerView: 2, spaceBetween: 20 },
            820: { slidesPerView: 3, spaceBetween: 20 },
            1200: { slidesPerView: 4, spaceBetween: 20 },
          }}
        >
          {videos.map((video) => (
            <SwiperSlide key={video.id} className="!h-auto flex">
              <div className="border-2 border-primary rounded-lg overflow-hidden flex flex-col w-full">
                <button
                  onClick={() => setActiveVideo(video.id)}
                  className="relative w-full border-b-2 border-primary"
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                    className="w-full aspect-video object-cover"
                    alt="" 
                  />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-pink-100 shadow-lg text-primary rounded-full w-10 h-10 flex items-center justify-center">
                      <i className="fi fi-sr-play"></i>
                    </span>
                  </span>
                </button>

                <div className="text-primary p-2 text-[10px] md:text-xs font-bold text-center flex-1 flex items-center justify-center">
                  {video.title}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="w-full inner-section-paddy py-5 mt-10 bg-linear-to-r from-primelinear from-0% via-white via-50% to-primelinear to-100%">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">

        {/* Feature 1 */}
        <div className="flex items-center justify-center gap-5">
          <Image
            src="/assets/images/shipped.webp"
            alt="Fast Delivery"
            width={60}
            height={60}
            className="max-sm:w-[40px]"
          />
          <div className="text-left">
            <p className="font-semibold mb-1 max-sm:text-xs">Fast Delivery</p>
            <span className="text-sm max-sm:text-[10px] text-gray-500">
              Quick &amp; Reliable
            </span>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-center justify-center gap-5">
          <Image
            src="/assets/images/payment-protection.webp"
            alt="Safe Payments"
            width={60}
            height={60}
            className="max-sm:w-[40px]"
          />
          <div className="text-left">
            <p className="font-semibold mb-1 max-sm:text-xs">Safe Payments</p>
            <span className="text-sm max-sm:text-[10px] text-gray-500">
              Secure Checkout
            </span>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-center justify-center gap-5">
          <Image
            src="/assets/images/tag.webp"
            alt="Quality Products"
            width={60}
            height={60}
            className="max-sm:w-[40px]"
          />
          <div className="text-left">
            <p className="font-semibold mb-1 max-sm:text-xs">Quality Products</p>
            <span className="text-sm max-sm:text-[10px] text-gray-500">
              Top Quality
            </span>
          </div>
        </div>

        {/* Feature 4 */}
        <div className="flex items-center justify-center gap-5">
          <Image
            src="/assets/images/service.webp"
            alt="Help Center"
            width={60}
            height={60}
            className="max-sm:w-[40px]"
          />
          <div className="text-left">
            <p className="font-semibold mb-1 max-sm:text-xs">Help Center</p>
            <span className="text-sm max-sm:text-[10px] text-gray-500">
              24/7 Support
            </span>
          </div>
        </div>

      </div>
    </section>

      {/* Video Modal */}
      <VideoModal
        videoId={activeVideo}
        onClose={() => setActiveVideo(null)}
      />

      {/* ===== CUSTOM STYLES ===== */}
      <style jsx>{`
        .banner-pagination {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          background: rgba(255, 255, 255, 0.85);
          padding: 8px 12px;
          border-radius: 9999px;
        }
        .banner-pagination .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #999;
          transform: rotate(45deg);
          border-radius: 2px;
        }
        .banner-pagination .swiper-pagination-bullet-active {
          background: #fff;
          border: 2px solid var(--color-primary);
        }
          .productFeatures li,
.productHighlights li {
  font-size: 20px;
  line-height: 1.6;
  margin-bottom: 8px;
  font-weight: 700;
  list-style: none;
  padding: 10px 10px;
  border-radius: 10px 50px 50px 10px;
  border: 2px solid var(--primary-color);
  background-color: #ffffff;
  position: relative;
  color: #585858;
  overflow: hidden;
}

.productFeatures li:not(:last-child),
.productHighlights li:not(:last-child) {
  margin-bottom: 15px;
}

.productFeatures li::after,
.productHighlights li::after {
  content: "";
  background-color: #eaa221;
  border-radius: 50px;
  width: 30px;
  height: 20px;
  position: absolute;
  top: -10px;
  left: -10px;
}

.productFeatures,
.productHighlights {
  padding-left: 0;
}

      `}</style>
    </>

    
  );
  
}
