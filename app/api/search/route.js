import { NextResponse } from 'next/server';
import dbConnect from "@/lib/db";
import Product from "@/models/product";
import Category from "@/models/ecom_category_info";

export async function GET(req) {
   const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || '';

  // ⭐ NEW — pagination
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 12;
  const skip = (page - 1) * limit;

  try {
    await dbConnect();
    
    const searchFilter = { status: "Active" };

    if (query) {
      searchFilter.$or = [
        { name: { $regex: query, $options: 'i' } },
        { item_code: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { keywords: { $regex: query, $options: 'i' } }
      ];
    }

    if (category && category !== 'All Categories') {
      const categoryDoc = await Category.findOne({
        category_name: category,
        status: "Active"
      });

      if (categoryDoc) {
        searchFilter.category = categoryDoc._id;
      }
    }

    const total = await Product.countDocuments(searchFilter);

    const allbrand = await Product.find(searchFilter).select('brand');

    const products = await Product.find(searchFilter)
      .populate("category", "category_name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      products,
      allbrand,
      pagination: {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search error" }, { status: 500 });
  }
}