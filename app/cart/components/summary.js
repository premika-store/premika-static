"use client";

import axios from "axios";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Gift,
  Tag,
  Percent,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import Link from "next/link";

const SummaryContent = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [isLoading, setIsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Calculate pricing
  const subtotal = items.reduce((total, item) => {
    return total + Number(item.price) * (item.quantity || 1);
  }, 0);

  // Free shipping for all orders
  const freeShippingThreshold = 0; // Always free shipping
  const shippingCost = 0;

  // Discount calculation
  const couponDiscount = appliedCoupon
    ? (subtotal * appliedCoupon.discount) / 100
    : 0;
  const totalDiscount = couponDiscount;

  // Final total (no tax added, no shipping charges)
  const totalPrice = subtotal - totalDiscount;

  const onCheckout = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: items.map((item) => item.id),
        }
      );
      window.location = response.data.url;
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const applyCoupon = () => {
    // Mock coupon validation
    const validCoupons = {
      // SAVE10: 10,
      // WELCOME15: 15,
      // SUMMER20: 20,
      // FIRST25: 25,
    };

    if (validCoupons[couponCode.toUpperCase()]) {
      const discount = validCoupons[couponCode.toUpperCase()];
      setAppliedCoupon({ code: couponCode.toUpperCase(), discount });
      toast.success(
        `Coupon ${couponCode.toUpperCase()} applied! ${discount}% off`
      );
      setCouponCode("");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.success("Coupon removed");
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 sm:mt-6 lg:mt-0">
      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg px-3 py-4 sm:px-4 sm:py-5 md:px-5 md:py-6 lg:px-6 lg:py-8 sticky top-4 sm:top-6 z-10 shadow-sm border border-gray-100">
        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold text-secondary mb-3 sm:mb-4 md:mb-5 lg:mb-6">
          Order Summary
        </h2>

        {/* Price Breakdown */}
        <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-5 md:mb-6">
          {/* Subtotal */}
          <div className="flex justify-between text-foreground text-sm sm:text-base">
            <span>
              Subtotal (
              {items.reduce((total, item) => total + (item.quantity || 1), 0)}{" "}
              {items.reduce(
                (total, item) => total + (item.quantity || 1),
                0
              ) === 1
                ? "item"
                : "items"}
              )
            </span>
            <Currency value={subtotal} />
          </div>

          {/* Applied Coupon */}
          {appliedCoupon && (
            <div className="flex justify-between text-green-600 text-sm sm:text-base">
              <div className="flex items-center space-x-1">
                <Tag size={14} className="sm:w-4 sm:h-4" />
                <span>
                  Coupon {appliedCoupon.code} ({appliedCoupon.discount}%)
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-red-500 hover:text-red-700 ml-1 sm:ml-2 text-lg leading-none"
                >
                  ×
                </button>
              </div>
              <span>
                -<Currency value={couponDiscount} />
              </span>
            </div>
          )}

          {/* Shipping */}
          <div className="flex justify-between text-foreground text-sm sm:text-base">
            <div className="flex items-center space-x-1">
              <Truck size={14} className="sm:w-4 sm:h-4" />
              <span>Shipping</span>
            </div>
            <span className="text-green-600 font-medium">FREE</span>
          </div>

          {/* Tax */}
          {/* <div className="flex justify-between text-foreground">
            <span>Tax (8%)</span>
            <Currency value={tax} />
          </div> */}

          {/* Total */}
          <div className="border-t border-background pt-3 sm:pt-4">
            <div className="flex justify-between text-base sm:text-lg md:text-xl font-extrabold text-foreground">
              <span>Total</span>
              <Currency value={totalPrice} />
            </div>
            {totalDiscount > 0 && (
              <div className="flex justify-between text-xs sm:text-sm text-green-600 mt-1">
                <span>You saved</span>
                <Currency value={totalDiscount} />
              </div>
            )}
          </div>
        </div>

        <Link href="/checkout" className="block">
          <Button
            className="w-full mb-3 sm:mb-4 py-2 sm:py-3 text-sm sm:text-base md:text-lg bg-foreground text-background hover:bg-secondary transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Proceed to Checkout"}
          </Button>
        </Link>

        {/* Security & Trust Indicators */}
        <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-foreground mb-4 sm:mb-5 md:mb-6">
          <div className="flex items-center space-x-2">
            <CreditCard className="h-3 w-3 sm:h-4 sm:w-4 text-purple-500 flex-shrink-0" />
            <span>Multiple payment options accepted</span>
          </div>
        </div>

        {/* Coupon Code Section */}
        <div className="border-t border-background pt-3 sm:pt-4">
          <h3 className="text-sm sm:text-base font-medium text-foreground mb-2 sm:mb-3 flex items-center space-x-2">
            <Tag className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Have a promo code?</span>
          </h3>
          <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-2">
            <input
              type="text"
              placeholder="Enter promo code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 px-2 sm:px-3 py-2 text-xs sm:text-sm border border-background rounded-md focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent"
            />
            <Button
              onClick={applyCoupon}
              variant="outline"
              size="sm"
              disabled={!couponCode.trim()}
              className="hover:bg-primary hover:text-background transition-colors border border-foreground text-xs sm:text-sm px-3 py-2 w-full xs:w-auto"
            >
              Apply
            </Button>
          </div>
        </div>
      </div>

      {/* Savings Summary */}
      {totalDiscount > 0 && (
        <div className="mt-4 sm:mt-6 bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 md:p-5 lg:p-6">
          <h3 className="text-sm sm:text-base md:text-lg font-medium text-green-900 mb-2">
            💰 Your Savings
          </h3>
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
            {appliedCoupon && (
              <div className="flex justify-between text-green-800">
                <span>Coupon {appliedCoupon.code}:</span>
                <span>
                  -<Currency value={couponDiscount} />
                </span>
              </div>
            )}
            <div className="border-t border-green-200 pt-1 sm:pt-2 flex justify-between font-medium text-green-900 text-sm sm:text-base">
              <span>Total Saved:</span>
              <span>
                -<Currency value={totalDiscount} />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Summary = () => {
  return (
    <Suspense fallback={<div>Loading cart summary...</div>}>
      <SummaryContent />
    </Suspense>
  );
};

export default Summary;
