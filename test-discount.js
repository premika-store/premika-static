// Test script for discount functionality
import products, { getDiscountedPrice } from "./data/data.js";

console.log("Testing discount functionality:\n");

// Test excluded products
const excludedProducts = ["Chahat", "Srishti", "ayushi"];
excludedProducts.forEach((productId) => {
  const product = products.find((p) => p.id === productId);
  if (product) {
    const pricing = getDiscountedPrice(product);
    console.log(`${productId}:`, {
      originalPrice: pricing.originalPrice,
      discountedPrice: pricing.discountedPrice,
      isOnSale: pricing.isOnSale,
      discount: pricing.discount,
    });
  }
});

console.log("\n--- Sale Products ---");

// Test a few sale products
const saleProducts = ["khushi", "badal", "mishti"];
saleProducts.forEach((productId) => {
  const product = products.find((p) => p.id === productId);
  if (product) {
    const pricing = getDiscountedPrice(product);
    console.log(`${productId}:`, {
      originalPrice: pricing.originalPrice,
      discountedPrice: pricing.discountedPrice,
      isOnSale: pricing.isOnSale,
      discount: pricing.discount,
    });
  }
});
