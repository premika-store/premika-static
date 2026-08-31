// Test script for discount functionality
import products, { SALE_CONFIG, PRODUCT_SPECIFIC_SALES, getDiscountedPrice } from "./data/data.js";

console.log("==================================================");
console.log("Global SALE_CONFIG:", SALE_CONFIG);
console.log("PRODUCT_SPECIFIC_SALES:", PRODUCT_SPECIFIC_SALES);
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

// Test 1: Global sale is OFF
console.log("--- TEST 1: Global Sale State ---");
assert(SALE_CONFIG.enabled === false, "Global sale is OFF (SALE_CONFIG.enabled === false)");

// Test 2: Tanya Kurti on sale (10% OFF, Math.floor)
console.log("\n--- TEST 2: Tanya Kurti (Target Sale Product) ---");
const tanyaKurti = products.find((p) => p.id === "tanya-kurti");
assert(!!tanyaKurti, "tanya-kurti exists in product catalog");

const tanyaKurtiPricing = getDiscountedPrice(tanyaKurti);
console.log("Tanya Kurti Pricing:", tanyaKurtiPricing);

assert(tanyaKurtiPricing.isOnSale === true, "tanya-kurti isOnSale is true");
assert(tanyaKurtiPricing.discount === 10, "tanya-kurti discount is 10%");
assert(tanyaKurtiPricing.originalPrice === 649, "tanya-kurti originalPrice is 649");
assert(tanyaKurtiPricing.discountedPrice === 584, "tanya-kurti discountedPrice is 584 (Math.floor(649 * 0.90))");

// Test with minimal object { id, price } as passed by ProductInfo component
const tanyaKurtiMinimalPricing = getDiscountedPrice({ id: "tanya-kurti", price: 649 });
assert(tanyaKurtiMinimalPricing.isOnSale === true, "ProductInfo format { id, price } receives isOnSale = true");
assert(tanyaKurtiMinimalPricing.discountedPrice === 584, "ProductInfo format { id, price } receives discountedPrice = 584");

// Test 3: Tanya Salwar NOT on sale
console.log("\n--- TEST 3: Tanya Salwar (Must NOT be on sale) ---");
const tanyaSalwar = products.find((p) => p.id === "tanya-salwar");
assert(!!tanyaSalwar, "tanya-salwar exists in product catalog");
const tanyaSalwarPricing = getDiscountedPrice(tanyaSalwar);
console.log("Tanya Salwar Pricing:", tanyaSalwarPricing);
assert(tanyaSalwarPricing.isOnSale === false, "tanya-salwar isOnSale is false");
assert(tanyaSalwarPricing.discount === 0, "tanya-salwar discount is 0");
assert(tanyaSalwarPricing.discountedPrice === 899, "tanya-salwar discountedPrice is original price (899)");

// Test 4: Tanya Set (Tanya-Full) NOT on sale
console.log("\n--- TEST 4: Tanya Set / Tanya-Full (Must NOT be on sale) ---");
const tanyaSet = products.find((p) => p.id === "Tanya-Full");
assert(!!tanyaSet, "Tanya-Full exists in product catalog");
const tanyaSetPricing = getDiscountedPrice(tanyaSet);
console.log("Tanya Set Pricing:", tanyaSetPricing);
assert(tanyaSetPricing.isOnSale === false, "Tanya-Full isOnSale is false");
assert(tanyaSetPricing.discount === 0, "Tanya-Full discount is 0");
assert(tanyaSetPricing.discountedPrice === 1499, "Tanya-Full discountedPrice is original price (1499)");

// Test 5: Verify all other catalog products have NO SALE
console.log("\n--- TEST 5: All Other Catalog Products ---");
let nonSaleProductsCorrect = true;
let nonSaleCount = 0;

products.forEach((product) => {
  if (product.id !== "tanya-kurti") {
    const pricing = getDiscountedPrice(product);
    if (
      pricing.isOnSale !== false ||
      pricing.discount !== 0 ||
      pricing.discountedPrice !== product.price ||
      pricing.originalPrice !== product.price
    ) {
      console.error(`Unexpected sale for product ${product.id}:`, pricing);
      nonSaleProductsCorrect = false;
    }
    nonSaleCount++;
  }
});

assert(
  nonSaleProductsCorrect,
  `All ${nonSaleCount} other products in catalog are confirmed OFF SALE (original price, isOnSale: false, discount: 0)`
);

// Sample unrelated products check
const sampleIds = ["reet", "madhuri", "Chahat", "Srishti", "Indu", "Lata"];
sampleIds.forEach((id) => {
  const p = products.find((prod) => prod.id === id);
  if (p) {
    const pricing = getDiscountedPrice(p);
    console.log(`  • ${p.name} (ID: ${p.id}): Price ₹${pricing.discountedPrice} | isOnSale: ${pricing.isOnSale} | discount: ${pricing.discount}%`);
  }
});

console.log("\n==================================================");
console.log("ALL TESTS COMPLETED SUCCESSFULLY! 🎉");
console.log("==================================================");


