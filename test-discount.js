// Test script for discount functionality
import products, { SALE_CONFIG, getDiscountedPrice } from "./data/data.js";

console.log("==================================================");
console.log("Global SALE_CONFIG:", SALE_CONFIG);
console.log(`Total Products in Catalog: ${products.length}`);
console.log("==================================================\n");

// Helper to run assertions
function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASSED: ${message}`);
}

// Test 1: Verify current configuration applies to ALL products
console.log("--- TEST 1: Current SALE_CONFIG (10% Sale ON) ---");
let allProductsPassed = true;
products.forEach((product) => {
  const pricing = getDiscountedPrice(product);
  const expectedDiscountedPrice = product.price * 0.9;
  
  if (
    pricing.originalPrice !== product.price ||
    Math.abs(pricing.discountedPrice - expectedDiscountedPrice) > 0.001 ||
    pricing.isOnSale !== true ||
    pricing.discount !== 10
  ) {
    console.error(`Mismatch for product ${product.id}:`, pricing);
    allProductsPassed = false;
  }
});
assert(allProductsPassed, `All ${products.length} products correctly received 10% discount`);

// Test specific sample products
const sampleProductIds = [
  "reet",       // normal product (₹699)
  "madhuri",    // normal product (₹699)
  "Tanya-Full", // high price product (₹1499)
  "Chahat",     // previously excluded product (₹699)
  "Srishti",    // previously excluded product (₹699)
  "Indu",       // out of stock product (₹699)
  "Lata",       // out of stock product (₹599)
];

console.log("\nSample Product Pricing:");
sampleProductIds.forEach((id) => {
  const p = products.find((prod) => prod.id === id);
  if (p) {
    const pricing = getDiscountedPrice(p);
    console.log(`  • ${p.name} (ID: ${p.id}): Original: ₹${pricing.originalPrice.toFixed(2)} | Sale: ₹${pricing.discountedPrice.toFixed(2)} | ${pricing.discount}% OFF | isOnSale: ${pricing.isOnSale}`);
  }
});

// Test 2: Verify Sale OFF behavior
console.log("\n--- TEST 2: Sale OFF Behavior ---");
SALE_CONFIG.enabled = false;
let allSaleOffPassed = true;
products.forEach((product) => {
  const pricing = getDiscountedPrice(product);
  if (
    pricing.originalPrice !== product.price ||
    pricing.discountedPrice !== product.price ||
    pricing.isOnSale !== false ||
    pricing.discount !== 0
  ) {
    allSaleOffPassed = false;
  }
});
assert(allSaleOffPassed, "When SALE_CONFIG.enabled = false, all products return original price and isOnSale = false");

// Test 3: Verify 20% Sale behavior
console.log("\n--- TEST 3: 20% Sale Behavior ---");
SALE_CONFIG.enabled = true;
SALE_CONFIG.discountPercent = 20;
const test20Product = products.find((p) => p.id === "reet"); // ₹699
const pricing20 = getDiscountedPrice(test20Product);
assert(
  pricing20.discount === 20 &&
  pricing20.isOnSale === true &&
  Math.abs(pricing20.discountedPrice - 699 * 0.8) < 0.001,
  `20% sale on ₹699 produces ₹${pricing20.discountedPrice.toFixed(2)} with ${pricing20.discount}% OFF`
);

// Test 4: Verify 30% Sale behavior
console.log("\n--- TEST 4: 30% Sale Behavior ---");
SALE_CONFIG.enabled = true;
SALE_CONFIG.discountPercent = 30;
const pricing30 = getDiscountedPrice(test20Product);
assert(
  pricing30.discount === 30 &&
  pricing30.isOnSale === true &&
  Math.abs(pricing30.discountedPrice - 699 * 0.7) < 0.001,
  `30% sale on ₹699 produces ₹${pricing30.discountedPrice.toFixed(2)} with ${pricing30.discount}% OFF`
);

// Reset SALE_CONFIG back to 10% enabled
SALE_CONFIG.enabled = true;
SALE_CONFIG.discountPercent = 10;

console.log("\n==================================================");
console.log("ALL TESTS COMPLETED SUCCESSFULLY! 🎉");
console.log("==================================================");

