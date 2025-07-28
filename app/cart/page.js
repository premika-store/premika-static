"use client";

import { useEffect, useState } from "react";
import { ShoppingBag, ArrowLeft, Lightbulb } from "lucide-react";
import Link from "next/link";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";

import CartItem from "./components/cart-item";
import Summary from "./components/summary";

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cart = useCart();

  if (!isMounted) return null;

  return (
    <div className="min-h-screen">
      <Container>
        <div className="bg-background px-2 py-8 sm:px-4 sm:py-12 lg:px-8 lg:py-16">
          {/* Header */}
          <div className="flex flex-col space-y-4 mb-6 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:mb-8">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm border border-secondary text-secondary hover:bg-secondary hover:text-background"
                >
                  <ArrowLeft size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Continue Shopping</span>
                  <span className="xs:hidden">Shop</span>
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-start space-y-2 mb-6 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3 sm:mb-8">
            <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-secondary" />
            <h1 className="text-2xl sm:text-3xl font-bold text-secondary">
              Shopping Cart
            </h1>
            {cart.items.length > 0 && (
              <span className="bg-secondary text-background px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                {cart.items.length} {cart.items.length === 1 ? "item" : "items"}
              </span>
            )}
          </div>

          {cart.items.length === 0 ? (
            // Empty Cart State
            <div className="text-center py-12 sm:py-16">
              <ShoppingBag className="mx-auto h-16 w-16 sm:h-24 sm:w-24 text-[#E0BCA2] mb-4 sm:mb-6" />
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3 sm:mb-4">
                Your cart is empty
              </h2>
              <p className="text-sm sm:text-base text-tertiary mb-6 sm:mb-8 max-w-md mx-auto px-4">
                Looks like you haven&apos;t added any items to your cart yet.
                Start shopping to fill it up!
              </p>
              <Link href="/products">
                <Button
                  size="lg"
                  className="px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base text-background bg-foreground hover:bg-primary"
                >
                  Start Shopping
                </Button>
              </Link>
            </div>
          ) : (
            // Cart with Items
            <div className="space-y-6 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-8 xl:gap-x-12 lg:space-y-0">
              <div className="lg:col-span-7">
                <div className="bg-gray-50 rounded-lg p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
                  <div className="flex flex-col space-y-3 sm:flex-row sm:justify-between sm:items-center sm:space-y-0 mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground">
                      Cart Items
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={cart.removeAll}
                      className="text-foreground hover:text-foreground hover:bg-[#E0BCA2] text-xs sm:text-sm w-fit"
                    >
                      Clear All
                    </Button>
                  </div>
                  <ul className="space-y-3 sm:space-y-4">
                    {cart.items.map((item) => (
                      <CartItem
                        key={`${item.id}-${item.selectedSize}`}
                        data={item}
                      />
                    ))}
                  </ul>
                </div>

                {/* Additional Information */}
                <div className="bg-[#E0BCA2] border border-primary rounded-lg p-3 sm:p-4">
                  <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base flex items-center gap-2">
                    <Lightbulb /> Shopping Tips
                  </h4>
                  <ul className="list-disc pl-5 text-xs sm:text-sm text-foreground space-y-1">
                    <li>Free shipping on orders over $100</li>
                    <li>Easy returns within 30 days</li>
                    <li>Secure checkout with multiple payment options</li>
                    <li>Secure checkout</li>
                  </ul>
                </div>
              </div>
              <Summary />
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
