import { Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductImageCarousel } from "@/components/product-image-carousel";
import { ProductInfo } from "@/components/product-info";
import { ProductTabs } from "@/components/product-tabs";
import { RelatedProducts } from "@/components/related-products";
import { Breadcrumb } from "@/components/breadcrumb";
import products from "@/data/data";
import { notFound } from "next/navigation";

export default function SingleProductPage({ params }) {
  // Find the product by ID (now string comparison)
  const product = products.find((p) => p.id === params.productId);

  // If product not found, show 404
  if (!product) {
    notFound();
  }

  // Get related products (excluding current product)
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      rating: 5, // Default rating since not in data
      images: p.images, // Pass the full images array
      image: p.images[0],
      imageHeight: 250,
      imageWidth: 250,
    }));

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/" },
    { label: product.name },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <ProductImageCarousel images={product.images} alt={product.name} />

          {/* Product Details */}
          <ProductInfo
            id={product.id}
            title={product.name}
            price={product.price}
            rating={5} // Default rating since not in data
            reviewCount={product.reviews.length} 
            description={product.shortDescription}
            categories={[product.category]}
            tags={[product.category]}
            sizes={product.sizes}
            inStock={product.inStock}
            images={product.images}
          />
        </div>

        {/* Product Description Tabs */}
        <div className="mb-16">
          <ProductTabs
            description={product.longDescription}
            reviews={product.reviews}
            reviewCount={1}
          />
        </div>

        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </div>

      {/* Footer */}
    </div>
  );
}
