import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
// import { sendOrderConfirmationEmail } from "@/lib/emailService";

const generatedSignature = (razorpayOrderId, razorpayPaymentId) => {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export async function POST(request) {
  const {
    orderId,
    razorpayPaymentId,
    razorpaySignature,
    customerInfo,
    cartItems,
    orderSummary,
  } = await request.json();

  const signature = generatedSignature(orderId, razorpayPaymentId);
  if (signature !== razorpaySignature) {
    return NextResponse.json(
      { message: "payment verification failed", isOk: false },
      { status: 400 }
    );
  }

  // Payment verified successfully
  console.log("Payment verified for customer:", {
    orderId,
    paymentId: razorpayPaymentId,
    customer: customerInfo,
    orderSummary,
  });

  console.log("Order items:", cartItems);

  // Here you can save the customer information and order details to your database
  // The customer info is already saved to Razorpay dashboard via the order creation
  // You might want to save it to your own database as well
  try {
    // Example: Save to database
    // await saveCustomerOrder({
    //   orderId,
    //   paymentId: razorpayPaymentId,
    //   customerInfo,
    //   cartItems,
    //   orderSummary,
    //   status: 'completed'
    // });

    console.log("Order completed for customer:", customerInfo.name);
    console.log("Total items ordered:", cartItems?.length || 0);
    console.log("Order total:", orderSummary?.total || 0);

    // Send order confirmation email - TEMPORARILY DISABLED
    // if (customerInfo?.email) {
    //   console.log("Sending order confirmation email to:", customerInfo.email);

    //   const emailResult = await sendOrderConfirmationEmail({
    //     orderId,
    //     paymentId: razorpayPaymentId,
    //     customerInfo,
    //     cartItems,
    //     orderSummary,
    //   });

    //   if (emailResult.success) {
    //     console.log(
    //       "Order confirmation email sent successfully:",
    //       emailResult.messageId
    //     );
    //   } else {
    //     console.error(
    //       "Failed to send order confirmation email:",
    //       emailResult.error
    //     );
    //     // Note: We don't fail the payment verification if email fails
    //   }
    // } else {
    //   console.warn(
    //     "No customer email provided, skipping order confirmation email"
    //   );
    // }
  } catch (error) {
    console.error("Error saving customer data:", error);
    // console.error("Error saving customer data or sending email:", error);
  }

  return NextResponse.json(
    { message: "payment verified successfully", isOk: true },
    { status: 200 }
  );
}
