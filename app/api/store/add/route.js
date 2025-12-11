import store from "@/models/store";
import connectDB from "@/lib/db";
import path from "path";
import fs from "fs/promises";

// 🔥 Helper to generate a URL friendly slug
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export async function POST(req) {
  await connectDB();

  try {
    const formData = await req.formData();
    const newStoreData = {};
    const storeImagesFiles = [];
    const generalImagesFiles = [];
    const bannerFiles = [];
    const featuredFiles = [];
    const offerFiles = [];
    const highlightFiles = [];
    const socialThumbFiles = [];

    // ------------------------
    // READ FORM DATA
    // ------------------------
    for (const [key, value] of formData.entries()) {
      if (value && typeof value === "object" && "name" in value) {
        // FILE
        if (key === "logo") newStoreData.logoFile = value;

        else if (key.startsWith("store_image_")) storeImagesFiles.push(value);

        else if (key.startsWith("banner_")) bannerFiles.push(value);

        else if (key.startsWith("featured_image_")) featuredFiles.push(value);

        else if (key.startsWith("offer_image_")) offerFiles.push(value);

        else if (key.startsWith("highlight_image_")) highlightFiles.push(value);

        else if (key.startsWith("social_thumb_")) socialThumbFiles.push(value);

      } else {
        // TEXT FIELD
        if (
          [
            "tags",
            "banners",
            "featuredProducts",
            "offers",
            "highlights",
            "keyHighlights",
            "nearbyStores",
            "businessHours",
            "socialTimeline"
          ].includes(key)
        ) {
          newStoreData[key] = JSON.parse(value);
        } else {
          newStoreData[key] = value;
        }
      }
    }

    // ---------------------------------------
    // 🔥 GENERATE UNIQUE SLUG
    // ---------------------------------------
    const baseSlug = slugify(newStoreData.organisation_name);
    let uniqueSlug = baseSlug;
    let counter = 1;

    while (await store.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter++}`;
    }

    newStoreData.slug = uniqueSlug;

    // ---------------------------------------
    // PROCESS FILE UPLOADS
    // ---------------------------------------

    // LOGO
    if (newStoreData.logoFile) {
      const buffer = Buffer.from(await newStoreData.logoFile.arrayBuffer());
      const filename = `${Date.now()}-${newStoreData.logoFile.name}`;
      const filepath = path.join(process.cwd(), "public", "uploads", filename);
      await fs.writeFile(filepath, buffer);
      newStoreData.logo = `/uploads/${filename}`;
    }

    delete newStoreData.logoFile;

    // ------------ STORE IMAGES ------------
    newStoreData.store_images = [];
    for (const file of storeImagesFiles) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name}`;
      const filepath = path.join(process.cwd(), "public", "uploads", filename);
      await fs.writeFile(filepath, buffer);
      newStoreData.store_images.push(`/uploads/${filename}`);
    }

    // ---------------------------------------------------
    // SOCIAL TIMELINE – Save Thumbnails
    // ---------------------------------------------------
    if (newStoreData.socialTimeline) {
      newStoreData.socialTimeline = await Promise.all(
        newStoreData.socialTimeline.map(async (item, i) => {
          if (socialThumbFiles[i]) {
            const buffer = Buffer.from(await socialThumbFiles[i].arrayBuffer());
            const filename = `${Date.now()}-thumb-${socialThumbFiles[i].name}`;
            const filepath = path.join(process.cwd(), "public", "uploads", filename);
            await fs.writeFile(filepath, buffer);
            return {
              ...item,
              thumbnail: `/uploads/${filename}`,
            };
          }
          return item;
        })
      );
    }

    // FINAL SAVE
    const record = await store.create(newStoreData);

    return new Response(JSON.stringify({ success: true, data: record }), {
      status: 201,
    });
  } catch (err) {
    console.error("Create Store Error:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
    });
  }
}
