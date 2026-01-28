import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";

import Order from "@/models/ecom_order_info";

export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get("category");

  try {
    const pipeline = [
      { $unwind: "$order_item" },

      // Join with Product
      {
        $lookup: {
          from: "products", // mongoose auto-plural for Product
          localField: "order_item.item_code",
          foreignField: "item_code",
          as: "product",
        },
      },
      { $unwind: "$product" },

      // Join with Category
      {
        $lookup: {
          from: "ecom_category_infos",
          localField: "product.category", // ✅ FIXED
          foreignField: "category_slug",
          as: "category",
        },
      },
      { $unwind: "$category" },

      // Optional category filter
      ...(categorySlug
        ? [{ $match: { "category.category_slug": categorySlug } }]
        : []),

      // Latest orders first
      { $sort: { "order_item.created_at": -1 } },

      // Limit products
      { $limit: 8 },

      // Final output
      {
        $project: {
          _id: 0,
          name: "$product.name",
          brand: "$product.brand",
          price: {
            $ifNull: ["$product.special_price", "$product.price"],
          },
          mrp: "$product.price",
          image: { $arrayElemAt: ["$product.images", 0] },
          specs: "$product.key_specifications",
          category: "$category.category_name",
          category_slug: "$category.category_slug",
        },
      },
    ];

    const products = await Order.aggregate(pipeline);

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
