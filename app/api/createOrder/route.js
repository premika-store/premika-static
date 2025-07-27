import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  const { amount, customerInfo } = await req.json();

  const orderOptions = {
    amount,
    currency: "INR",
  };

  // Add customer information if provided
  if (customerInfo) {
    orderOptions.customer_id = null; // Will be created automatically by Razorpay
    orderOptions.notes = {
      customer_name: customerInfo.name,
      customer_email: customerInfo.email,
      customer_phone: customerInfo.phone,
      address_line1: customerInfo.address.line1,
      address_line2: customerInfo.address.line2 || "",
      city: customerInfo.address.city,
      state: customerInfo.address.state,
      postal_code: customerInfo.address.postal_code,
      country: customerInfo.address.country,
    };
  }

  const order = await razorpay.orders.create(orderOptions);

  return NextResponse.json(order);
}
