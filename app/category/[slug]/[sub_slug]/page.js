

import CategoryComponent from "@/components/category/[slug]/page";


export async function generateMetadata({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${params.slug}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const category = data?.main_category;
  //console.log('category:',category);

  if (!category) {
    return {
      title: "Category Not Found",
      description: "This category does not exist",
    };
  }

  return {
    title: category.meta_title || category.category_name,
    description:
      category.meta_description ||
      `Buy ${category.category_name} products at best price`,

    openGraph: {
      title: category.meta_title || category.category_name,
      keywords: category.meta_keyword || category.category_name,
      description:
        category.meta_description ||
        `Buy ${category.category_name} products at best price`,
      images: category.image ? [category.image] : [],
      type: "website",
    },

  };
}

export default function Page({ params }) {
  return <CategoryComponent params={params} />;
}