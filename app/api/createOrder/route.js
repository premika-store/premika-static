import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  const { amount, customerInfo, cartItems, orderSummary } = await req.json();

  const orderOptions = {
    amount,
    currency: "INR",
  };

  // Add customer information and product details if provided
  if (customerInfo) {
    orderOptions.customer_id = null; // Will be created automatically by Razorpay
    orderOptions.notes = {
      // Customer information
      customer_name: customerInfo.name,
      customer_email: customerInfo.email,
      customer_phone: customerInfo.phone,
      address_line1: customerInfo.address.line1,
      address_line2: customerInfo.address.line2 || "",
      city: customerInfo.address.city,
      state: customerInfo.address.state,
      postal_code: customerInfo.address.postal_code,
      country: customerInfo.address.country,

      // Order summary
      subtotal: orderSummary?.subtotal || 0,
      shipping_cost: orderSummary?.shipping || 0,
      total: orderSummary?.total || amount / 100,
      item_count: orderSummary?.itemCount || 0,

      // Product details (JSON string for Razorpay notes)
      products: JSON.stringify(
        cartItems?.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
          selectedSize: item.selectedSize,
          category: item.category,
          description: item.description,
        })) || []
      ),
    };
  }

  const order = await razorpay.orders.create(orderOptions);

  return NextResponse.json(order);
}
