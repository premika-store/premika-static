"use client";

import axios from "axios";
import { useEffect, useState } from "react";
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

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [isLoading, setIsLoading] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  useEffect(() => {
    if (searchParams && searchParams.get("success")) {
      toast.success("Payment completed");
      removeAll();
    }

    if (searchParams && searchParams.get("canceled")) {
      toast.error("Something went wrong. Please try again.");
    }
  }, [searchParams, removeAll]);

  // Calculate pricing
  const subtotal = items.reduce((total, item) => {
    return total + Number(item.price) * (item.quantity || 1);
  }, 0);

  // Shipping calculation
  const freeShippingThreshold = 100;
  const shippingCost = subtotal >= freeShippingThreshold ? 0 : 15;

  // Discount calculation
  const couponDiscount = appliedCoupon
    ? (subtotal * appliedCoupon.discount) / 100
    : 0;
  const totalDiscount = couponDiscount;

  // Tax calculation (8%)
  const taxableAmount = subtotal - totalDiscount;
  const tax = taxableAmount * 0.08;

  // Final total
  const totalPrice = subtotal - totalDiscount + shippingCost + tax;

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
      SAVE10: 10,
      WELCOME15: 15,
      SUMMER20: 20,
      FIRST25: 25,
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
    <div className="lg:col-span-5 mt-6 lg:mt-0">
      {/* Order Summary */}
      <div className="bg-gray-50 rounded-lg px-4 py-6 sm:px-6 sm:py-8 sticky top-6 z-10 shadow-sm border border-gray-100">
        <h2 className="text-lg sm:text-xl font-extrabold text-secondary mb-4 sm:mb-6">
          Order Summary
        </h2>

        {/* Price Breakdown */}
        <div className="space-y-4 mb-6">
          {/* Subtotal */}
          <div className="flex justify-between text-foreground">
            <span>
              Subtotal ({items.length} {items.length === 1 ? "item" : "items"})
            </span>
            <Currency value={subtotal} />
          </div>

          {/* Applied Coupon */}
          {appliedCoupon && (
            <div className="flex justify-between text-green-600">
              <div className="flex items-center space-x-1">
                <Tag size={16} />
                <span>
                  Coupon {appliedCoupon.code} ({appliedCoupon.discount}%)
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-red-500 hover:text-red-700 ml-2"
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
          <div className="flex justify-between text-foreground">
            <div className="flex items-center space-x-1">
              <Truck size={16} />
              <span>Shipping</span>
            </div>
            {shippingCost === 0 ? (
              <span className="text-green-600 font-medium">FREE</span>
            ) : (
              <Currency value={shippingCost} />
            )}
          </div>

          {/* Free Shipping Progress */}
          {subtotal < freeShippingThreshold && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                🚚 Add <Currency value={freeShippingThreshold - subtotal} />{" "}
                more for free shipping!
              </p>
              <div className="mt-2 bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(subtotal / freeShippingThreshold) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}

          {/* Tax */}
          <div className="flex justify-between text-foreground">
            <span>Tax (8%)</span>
            <Currency value={tax} />
          </div>

          {/* Total */}
          <div className="border-t border-background pt-4">
            <div className="flex justify-between text-lg font-extrabold text-foreground">
              <span>Total</span>
              <Currency value={totalPrice} />
            </div>
            {totalDiscount > 0 && (
              <div className="flex justify-between text-sm text-green-600 mt-1">
                <span>You saved</span>
                <Currency value={totalDiscount} />
              </div>
            )}
          </div>
        </div>

        <Link href="/checkout" className="block">
          <Button
            className="w-full mb-4 py-3 text-lg bg-foreground text-background hover:bg-secondary transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Proceed to Checkout"}
          </Button>
        </Link>

        {/* Security & Trust Indicators */}
        <div className="space-y-3 text-sm text-foreground mb-6">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-4 w-4 text-green-500" />
            <span>Secure 256-bit SSL encryption</span>
          </div>
          <div className="flex items-center space-x-2">
            <Truck className="h-4 w-4 text-blue-500" />
            <span>Free shipping on orders over $100</span>
          </div>
          <div className="flex items-center space-x-2">
            <CreditCard className="h-4 w-4 text-purple-500" />
            <span>Multiple payment options accepted</span>
          </div>
          <div className="flex items-center space-x-2">
            <Gift className="h-4 w-4 text-red-500" />
            <span>Easy returns within 30 days</span>
          </div>
        </div>

        {/* Coupon Code Section */}
        <div className="border-t border-background pt-4">
          <h3 className="text-base font-medium text- mb-3 flex items-center space-x-2">
            <Tag className="h-4 w-4" />
            <span>Have a promo code?</span>
          </h3>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter promo code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 px-3 py-2 text-sm border border-background rounded-md focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent"
            />
            <Button
              onClick={applyCoupon}
              variant="outline"
              size="sm"
              disabled={!couponCode.trim()}
              className="hover:bg-primary hover:text-background transition-colors border border-foreground "
            >
              Apply
            </Button>
          </div>
          <div className="mt-2 text-xs text-[#E0BCA2]">
            <p>Try: SAVE10, WELCOME15, SUMMER20, FIRST25</p>
          </div>
        </div>
      </div>

      {/* Savings Summary */}
      {totalDiscount > 0 && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-green-900 mb-2">
            💰 Your Savings
          </h3>
          <div className="space-y-2 text-sm">
            {appliedCoupon && (
              <div className="flex justify-between text-green-800">
                <span>Coupon {appliedCoupon.code}:</span>
                <span>
                  -<Currency value={couponDiscount} />
                </span>
              </div>
            )}
            <div className="border-t border-green-200 pt-2 flex justify-between font-medium text-green-900">
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

export default Summary;
