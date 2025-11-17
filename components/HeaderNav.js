"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState(null); // track hovered category

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories/get");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getSubcategories = (parentId) =>
    categories.filter(
      (cat) => cat.parentid === parentId && cat.status === "Active"
    );

  const topCategories = categories.filter(
    (cat) => cat.parentid === "none" && cat.status === "Active"
  );

  // Function to chunk brands into groups of 10
  const chunkBrands = (brands, chunkSize = 10) => {
    const chunks = [];
    for (let i = 0; i < brands.length; i += chunkSize) {
      chunks.push(brands.slice(i, i + chunkSize));
    }
    return chunks;
  };

  return (
    <div className="hidden lg:flex items-center space-x-3 ml-4 whitespace-nowrap relative">
      {/* HOME link */}
      <Link
        href="/"
        className="text-[#222529] hover:text-red-500 font-bold text-[12px] uppercase py-[21px] tracking-[0.5px]"
      >
        HOME
      </Link>

      {/* Top Categories */}
      {!loading &&
        topCategories.map((topCat) => (
          <div
            key={topCat._id}
            className="relative"
            onMouseEnter={() => setActiveCat(topCat)} // open mega menu
            onMouseLeave={() => setActiveCat(null)} // close mega menu
          >
            <Link
              href={`/category/${topCat.category_slug}`}
              className="flex items-center text-[#222529] hover:text-red-500 font-bold text-[12px] uppercase py-[21px] tracking-[0.5px]"
            >
              {topCat.category_name.toUpperCase()}
              <svg
                className="ml-1 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        ))}

      {/* Mega Menu */}
     {/* Mega Menu */}
{activeCat &&
  (getSubcategories(activeCat._id).length > 0 ||
    activeCat.brands?.length > 0) && (
    <div
      className="absolute top-full bg-white shadow-xl border-t z-50 flex"
      style={{
        left: activeCat.menuLeft || 0, // dynamic left position
      }}
      // onMouseEnter={() => setActiveCat(activeCat)}
      onMouseEnter={(e) => {
  const left = e.currentTarget.offsetLeft;
  setActiveCat({ ...cat, menuLeft: left });
}}
      onMouseLeave={() => setActiveCat(null)}
    >
      <div className="flex">
        {(() => {
          // MERGE DATA
          const subcats = getSubcategories(activeCat._id).map((s) => ({
            type: "sub",
            id: s._id,
            name: s.category_name,
            slug: `/category/${activeCat.category_slug}/${s.category_slug}`,
          }));

          const brands = (activeCat.brands || []).map((b) => ({
            type: "brand",
            id: b._id,
            name: b.brand_name,
            slug: `/brand/${b.brand_slug || b._id}`,
          }));

          const merged = [
            ...subcats,
            ...(brands.length
              ? [{ type: "heading", name: "BRANDS", id: "heading" }]
              : []),
            ...brands,
          ];

          // SPLIT INTO COLUMNS OF 10
          const columns = [];
          for (let i = 0; i < merged.length; i += 10) {
            columns.push(merged.slice(i, i + 10));
          }

          return (
            <>
              {/* DATA COLUMNS */}
              {columns.map((col, colIndex) => (
                <div
                  key={colIndex}
                  className={`flex flex-col px-4 py-3 border-r w-56 ${
                    colIndex % 2 === 0 ? "bg-white" : "bg-red-50"
                  }`}
                >
                  {/* CATEGORY TITLE ONLY ON FIRST COLUMN */}
                  {colIndex === 0 && (
                    <h3 className="text-[14px] font-bold text-[#222529] mb-3 uppercase">
                      {activeCat.category_name.toUpperCase()}
                    </h3>
                  )}

                  <div className="flex flex-col gap-2">
                    {col.map((item) => {
                      if (item.type === "heading") {
                        return (
                          <div
                            key={item.id}
                            className="text-[12px] font-bold uppercase mt-2"
                          >
                            {item.name}
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={item.id}
                          href={item.slug}
                          className="text-[12px] text-[#222529] hover:text-red-500 font-semibold uppercase"
                        >
                          {item.name.toUpperCase()}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* IMAGE COLUMN → HIDE IF MORE THAN 5 COLUMNS */}
              {columns.length <= 5 && activeCat.navImage && (
                <div className="w-56 flex items-center justify-center bg-white">
                  <img
                    src={activeCat.navImage}
                    alt={activeCat.category_name}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </>
          );
        })()}
      </div>
    </div>
  )}





    </div>
);
}