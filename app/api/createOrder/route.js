import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// Validate environment variables
if (
  !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
  !process.env.RAZORPAY_KEY_SECRET
) {
  throw new Error("Missing Razorpay credentials in environment variables");
}

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    const { amount, customerInfo, cartItems, orderSummary } = await req.json();

    // Validate required fields
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount provided" },
        { status: 400 }
      );
    }

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
        address_line1: customerInfo.address?.line1 || "",
        address_line2: customerInfo.address?.line2 || "",
        city: customerInfo.address?.city || "",
        state: customerInfo.address?.state || "",
        postal_code: customerInfo.address?.postal_code || "",
        country: customerInfo.address?.country || "IN",

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
            selectedHeight: item.selectedHeight,
            category: item.category,
            description: item.description,
          })) || []
        ),
      };
    }

    const order = await razorpay.orders.create(orderOptions);

    console.log("Razorpay order created successfully:", order.id);
    return NextResponse.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);

    // Handle Razorpay specific errors
    if (error.statusCode) {
      return NextResponse.json(
        {
          error: "Payment gateway error",
          message: error.error?.description || "Failed to create order",
          code: error.error?.code,
        },
        { status: error.statusCode }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: "Internal server error", message: "Failed to create order" },
      { status: 500 }
    );
  }
}

// Handle CORS preflight requests
export async function OPTIONS(req) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
