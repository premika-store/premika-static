"use client";

import React, { useState } from "react";
import {
  Star,
  Heart,
  RotateCcw,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Ruler,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSizeChartModal from "@/hooks/use-size-chart-modal";
import useCart from "@/hooks/use-cart";
import Link from "next/link";

export function ProductInfo({
  id,
  title,
  price,
  rating,
  reviewCount,
  description,
  categories,
  tags,
  sizes,
  inStock,
  images,
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const sizeChartModal = useSizeChartModal();
  const cart = useCart();

  const handleAddToCart = () => {
    const item = {
      id: id, // Use the actual product ID
      title,
      name: title, // Add name field for cart display
      price,
      quantity,
      selectedSize,
      inStock,
      images,
    };
    cart.addItem(item);
  };

  const handleQuantityChange = (e) => {
    const value = Number.parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  return (
    <div className="space-y-6 pr-0 lg:pr-24">
      <div>
        <h1 className="text-3xl font-bold text-secondary mb-4">{title}</h1>

        <div className="flex items-center space-x-2 mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating
                    ? "fill-current"
                    : "stroke-current fill-transparent"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-[#E0BCA2]">
            ({reviewCount} customer review{reviewCount !== 1 ? "s" : ""})
          </span>
        </div>

        <div className="text-2xl font-bold text-foreground mb-6">
          Rs. {price.toFixed(2)}
        </div>

        {/* Stock Status */}
        <div className="mb-4">
          <span
            className={`text-sm font-medium ${
              inStock ? "text-green-600" : "text-red-600"
            }`}
          >
            {inStock ? "✓ In Stock" : "✗ Out of Stock"}
          </span>
        </div>
      </div>

      <div className="prose prose-sm text-tertiary text-justify">
        <p>{description}</p>
      </div>

      {/* Size Selection */}
      {sizes && sizes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-medium">Size:</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size.label}
                onClick={() => setSelectedSize(size.label)}
                disabled={!size.inStock}
                className={`px-4 py-2 text-sm border rounded-md transition-colors ${
                  selectedSize === size.label
                    ? "bg-foreground text-background border-foreground"
                    : size.inStock
                    ? "border-gray-300 hover:border-foreground"
                    : "border-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {size.label}
                {!size.inStock && " (Out of Stock)"}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center space-x-4 ">
        <div className="flex items-center border border-foreground rounded">
          <button
            type="button"
            className="px-2 h-9 text-background bg-foreground hover:bg-secondary hover:text-background transition-colors rounded-l"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          >
            -
          </button>
          <Input
            type="text"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
            className="w-12 text-center font-bold border-0 focus:ring-0"
          />
          <button
            type="button"
            className="px-2 h-9 text-background bg-foreground hover:bg-secondary hover:text-background transition-colors rounded-r"
            onClick={() => setQuantity((q) => q + 1)}
          >
            +
          </button>
        </div>
        <Link href="/cart" className="block">
          {inStock && !(sizes && sizes.length > 0 && !selectedSize) ? (
            <Button
              onClick={handleAddToCart}
              className="bg-foreground hover:bg-secondary text-background px-8 py-2"
            >
              ADD TO CART
            </Button>
          ) : (
            <Button
              className="bg-foreground hover:bg-secondary text-background px-8 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={true}
            >
              {!inStock ? "OUT OF STOCK" : "SELECT SIZE"}
            </Button>
          )}
        </Link>
      </div>

      <div className="flex items-center space-x-6 text-sm">
        {/* <button className="flex items-center space-x-2 text-tertiary hover:text-secondary transition-colors">
          <Heart className="w-4 h-4" />
          <span>Browse Wishlist</span>
        </button> */}
        <button
          className="flex items-center space-x-2 text-tertiary hover:text-secondary transition-colors"
          onClick={sizeChartModal.onOpen}
        >
          <Ruler className="w-4 h-4" />
          <span>Size chart</span>
        </button>
      </div>

      <div className="border-t pt-6 space-y-2 border-foreground">
        <div className="text-sm">
          <span className="font-medium">Categories:</span>
          <span className="text-tertiary ml-2">{categories.join(", ")}</span>
        </div>
        <div className="text-sm">
          <span className="font-medium">Tags:</span>
          <span className="text-tertiary ml-2">{tags.join(", ")}</span>
        </div>
      </div>

      <div className="border-t pt-6 border-foreground">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium">Share this product:</span>
          <div className="flex space-x-2">
            <a
              href={`https://www.facebook.com/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-5 h-5 text-tertiary hover:text-blue-600 cursor-pointer transition-colors" />
            </a>
            <a
              href={`https://twitter.com/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="w-5 h-5 text-tertiary hover:text-blue-400 cursor-pointer transition-colors" />
            </a>
            <a
              href={`https://www.instagram.com/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5 text-tertiary hover:text-pink-600 cursor-pointer transition-colors" />
            </a>
            <a
              href={`https://www.linkedin.com`}
              target="_blank"
              rel="noopener noreferrer"
            ></a>
          </div>
        </div>
      </div>
    </div>
  );
}
