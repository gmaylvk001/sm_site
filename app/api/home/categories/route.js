import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Category from "@/models/ecom_category_info";

export async function GET() {
  await dbConnect();

  const categories = await Category.find({ parentid: "none" })
    .select("category_name category_slug image")
    .limit(7)
    .lean();

  return NextResponse.json(categories);
}
