"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import {
  CheckCircle,
  Mail,
  MessageSquare,
  ArrowLeft,
  Package,
} from "lucide-react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";

const OrderSuccessContent = () => {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Get order details from URL parameters
    const orderId = searchParams.get("orderId");
    const amount = searchParams.get("amount");
    const customerName = searchParams.get("customerName");

    if (orderId) {
      setOrderDetails({
        orderId: orderId,
        amount: amount,
        customerName: customerName,
      });
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background">
      <Container>
        <div className="flex items-center justify-center min-h-screen py-12">
          <div className="w-full max-w-md">
            {/* Success Icon */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                Payment Successful!
              </h1>
              <p className="text-tertiary text-lg">
                Thank you for your order. Your payment has been processed
                successfully.
              </p>
            </div>

            {/* Order Details */}
            {orderDetails && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  Order Details
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-tertiary">Order ID:</span>
                    <span className="font-medium text-foreground">
                      {orderDetails.orderId}
                    </span>
                  </div>
                  {orderDetails.amount && (
                    <div className="flex justify-between">
                      <span className="text-tertiary">Amount Paid:</span>
                      <span className="font-medium text-foreground">
                        ₹{(orderDetails.amount / 100).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {orderDetails.customerName && (
                    <div className="flex justify-between">
                      <span className="text-tertiary">Customer:</span>
                      <span className="font-medium text-foreground">
                        {orderDetails.customerName}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* What's Next Section */}
            <div className="space-y-6 mb-8">
              <h2 className="text-xl font-semibold text-foreground">
                What's Next?
              </h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-blue-800">
                      Confirmation Email
                    </h3>
                    <p className="text-blue-600 text-sm">
                      You'll receive an order confirmation email shortly with
                      all the details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-purple-800">
                      SMS Updates
                    </h3>
                    <p className="text-purple-600 text-sm">
                      You'll receive SMS updates with tracking information once
                      your order is shipped.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
                  <Package className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-green-800">
                      Order Processing
                    </h3>
                    <p className="text-green-600 text-sm">
                      Your order will be processed within 1-2 business days and
                      shipped soon after.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link href="/" className="block">
                <Button
                  className="w-full bg-primary hover:bg-secondary text-primary-foreground"
                  size="lg"
                >
                  Continue Shopping
                </Button>
              </Link>

              <Link href="/contact-us" className="block">
                <Button
                  variant="outline"
                  className="w-full border-tertiary text-tertiary hover:bg-secondary hover:text-background"
                  size="lg"
                >
                  Need Help? Contact Us
                </Button>
              </Link>

              <Link href="/" className="block">
                <Button
                  variant="ghost"
                  className="w-full text-tertiary hover:text-foreground"
                  size="sm"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

const OrderSuccessPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-tertiary">Loading order details...</p>
          </div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
};

export default OrderSuccessPage;
