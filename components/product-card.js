"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export default function ProductCard({ product }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    return (
        <Link href={`/${product.id}`} className="block">
            <div className="group relative bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer">
            {/* Product Image Container */}
            <div
                className="relative aspect-[3/4] overflow-hidden bg-gray-100"
                onMouseEnter={() => setCurrentImageIndex(1)}
                onMouseLeave={() => setCurrentImageIndex(0)}
            >
                {/* Main Product Image */}
                <Image
                    src={product.images[currentImageIndex] || product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-500 ease-in-out transform group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Out of Stock Badge */}
                {!product.inStock && (
                    <div className="absolute bottom-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                        Out of Stock
                    </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
                <h3 className="text-sm font-medium text-foreground line-clamp-2 leading-tight">{product.name}</h3>

                {/* Description */}
                <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>

                {/* Price */}
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">Rs. {product.price.toFixed(2)}</span>
                </div>

                {/* Add to Cart Button */}
                <button 
                    className="w-full px-4 py-2 text-sm font-medium text-background bg-foreground border border-secondary rounded-md hover:bg-popover hover:font-bold hover:text-foreground hover:border-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!product.inStock}
                    onClick={(e) => {
                        e.preventDefault();
                        // Handle add to cart functionality here
                        console.log("Add to cart:", product.name);
                    }}
                >
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                </button>
            </div>
        </div>
        </Link>
    )
}
