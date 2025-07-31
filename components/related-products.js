"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function RelatedProducts({ products }) {
  const [hoveredProductId, setHoveredProductId] = useState(null);

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-secondary">Related products</h2>
        <div className="mt-4 w-24 h-1 bg-foreground mx-auto"></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/${product.id}`} className="block">
            <div className="group relative bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
              {/* Product Image Container */}
              <div
                className="relative aspect-[3/4] overflow-hidden bg-gray-100"
                onMouseEnter={() => setHoveredProductId(product.id)}
                onMouseLeave={() => setHoveredProductId(null)}
              >
                {/* Main Product Image */}
                <Image
                  src={
                    hoveredProductId === product.id &&
                    product.images &&
                    product.images.length > 1
                      ? product.images[1]
                      : product.images?.[0] || "/placeholder.svg"
                  }
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-500 ease-in-out transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Sale Badge */}
                {product.onSale && (
                  <div className="absolute bottom-3 left-3 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded">
                    SALE
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
              </div>

              {/* Product Info */}
              <div className="p-4 space-y-1">
                <h3 className="text-m font-bold text-foreground line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                <div className="text-xs text-primary mb-1">
                  {product.category}
                </div>

                {/* Price */}
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-foreground">
                    Rs. {product.price.toFixed(2)}
                  </span>
                  {product.originalPrice &&
                    product.originalPrice > product.price && (
                      <span className="text-sm text-primary line-through">
                        Rs. {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                </div>

                {/* Add to Cart Button */}
                <button
                  className="w-full px-4 py-2 text-sm font-medium text-background bg-foreground border border-secondary rounded-md hover:bg-popover hover:font-bold hover:text-foreground hover:border-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    // Handle add to cart functionality here
                    console.log("Add to cart:", product.name);
                    window.location.href = `/${product.id}`;
                  }}
                >
                  View Product
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
