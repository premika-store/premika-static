"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/product-card";
import products from "@/data/data";

export default function ProductsPage() {
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [sortBy, setSortBy] = useState("featured");

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Apply availability filter
    if (availabilityFilter === "in-stock") {
      filtered = filtered.filter((product) => product.inStock);
    } else if (availabilityFilter === "out-of-stock") {
      filtered = filtered.filter((product) => !product.inStock);
    }

    // Apply sorting
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    // "featured" keeps original order

    return filtered;
  }, [availabilityFilter, sortBy]);

  return (
    <div className="min-h-screen bg-background">
      <div className=" border-b border-[#B67B5C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">Premika</h1>
            <p className="text-xl text-primary italic font-semibold">
              &quot;Prem se bani, Premika ke liye.&quot;
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Sort Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-background py-6">
        <div className="flex flex-row justify-between items-start gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-foreground">Filter:</span>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="" className="bg-popover text-foreground">
                Availability
              </option>
              <option value="in-stock" className="bg-popover text-foreground ">
                In Stock
              </option>
              <option
                value="out-of-stock"
                className="bg-popover text-foreground"
              >
                Out of Stock
              </option>
            </select>
            {(availabilityFilter || sortBy !== "featured") && (
              <button
                onClick={() => {
                  setAvailabilityFilter("");
                  setSortBy("featured");
                }}
                className="px-3 py-2 text-sm font-bold text-foreground border border-red-300 rounded-md hover:bg-red-50 transition-colors duration-200"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-sm border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="featured" className="bg-popover text-foreground">
                  Featured
                </option>
                <option
                  value="price-low"
                  className="bg-popover text-foreground"
                >
                  Price: Low to High
                </option>
                <option
                  value="price-high"
                  className="bg-popover text-foreground"
                >
                  Price: High to Low
                </option>
                <option value="name" className="bg-popover text-foreground">
                  Name (A-Z)
                </option>
              </select>
            </div>
            <span className="text-sm text-foreground">
              {filteredAndSortedProducts.length} products
            </span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* No products message */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">
              No products found matching your criteria.
            </p>
            <button
              onClick={() => {
                setAvailabilityFilter("");
                setSortBy("featured");
              }}
              className="mt-4 px-6 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {/* <div className="text-center mt-12">
          <button className="px-8 py-3 text-sm font-medium text-foreground bg-popover border border-foreground hover:font-bold rounded-lg hover:text-foreground hover:border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground">
            Load More Products
          </button>
        </div> */}
      </div>
    </div>
  );
}
