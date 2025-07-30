"use client";

import Image from "next/image";
import { toast } from "react-hot-toast";
import { X, Heart, Plus, Minus } from "lucide-react";
import Link from "next/link";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";

const CartItem = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id, data.selectedSize);
  };

  const onMoveToWishlist = () => {
    // This would typically save to wishlist store
    cart.removeItem(data.id, data.selectedSize);
    toast.success("Item moved to wishlist");
  };

  const onIncreaseQuantity = () => {
    const newQuantity = (data.quantity || 1) + 1;
    cart.updateQuantity(data.id, data.selectedSize, newQuantity);
  };

  const onDecreaseQuantity = () => {
    const currentQuantity = data.quantity || 1;
    if (currentQuantity > 1) {
      cart.updateQuantity(data.id, data.selectedSize, currentQuantity - 1);
    }
  };

  return (
    <li className="bg-white rounded-lg border border-background p-3 sm:p-4 md:p-5 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-row gap-3 sm:gap-4 md:gap-5 items-stretch">
        {/* Product Image */}
        <div className="relative w-28 sm:w-24 md:w-28 lg:w-32 xl:w-36 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
          <Link href={`/${data.id}`}>
            <Image
              fill
              src={data.images?.[0] || data.images}
              alt={data.name}
              className="object-cover object-center hover:scale-105 transition-transform duration-200 cursor-pointer"
            />
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex-1 space-y-3 sm:space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 space-y-2 sm:space-y-3">
              <Link href={`/${data.id}`} className="hover:underline">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-foreground leading-tight line-clamp-2">
                  {data.name}
                </h3>
              </Link>

              <div className="flex flex-col space-y-2 text-xs sm:text-sm md:text-base text-primary">
                {data.selectedSize && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Size:</span>
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs sm:text-sm font-medium">
                      {data.selectedSize}
                    </span>
                  </div>
                )}
                {data.quantity && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Quantity:</span>
                    <div className="flex items-center gap-1 sm:gap-2 bg-orange-50 rounded-md p-1">
                      <button
                        onClick={onDecreaseQuantity}
                        disabled={data.quantity <= 1}
                        className="p-1 rounded hover:bg-orange-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus
                          size={12}
                          className="sm:w-3 sm:h-3 md:w-4 md:h-4"
                        />
                      </button>
                      <span className="px-2 py-1 min-w-[2rem] text-center text-xs sm:text-sm font-medium">
                        {data.quantity}
                      </span>
                      <button
                        onClick={onIncreaseQuantity}
                        className="p-1 rounded hover:bg-orange-100"
                      >
                        <Plus
                          size={12}
                          className="sm:w-3 sm:h-3 md:w-4 md:h-4"
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons - Mobile: Side of info, Desktop: Bottom */}
            <div className="flex flex-col sm:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onMoveToWishlist}
                className="flex items-center text-foreground hover:text-background hover:bg-primary p-2 min-w-[40px] justify-center"
              >
                <Heart size={14} />
              </Button>

              <IconButton
                onClick={onRemove}
                icon={<X size={14} />}
                className="bg-background hover:bg-red-50 hover:text-red-600 text-foreground p-2 transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
            <div className="order-2 sm:order-1">
              <div className="flex items-baseline gap-2 sm:block">
                <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-secondary">
                  <Currency value={data.price * (data.quantity || 1)} />
                </div>
                <div className="text-xs sm:text-sm md:text-base text-gray-500 font-normal">
                  <Currency value={data.price} /> each
                </div>
              </div>
            </div>

            {/* Action Buttons - Desktop: Bottom right */}
            <div className="order-1 sm:order-2 hidden sm:flex items-center justify-end gap-2 sm:gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={onMoveToWishlist}
                className="flex items-center gap-1 xs:gap-2 text-foreground hover:text-background hover:bg-primary text-xs sm:text-sm md:text-base p-2 xs:px-3 xs:py-2 justify-center min-w-[40px] xs:min-w-fit xs:bg-background xs:border xs:border-background"
              >
                <Heart size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span className="hidden xs:inline">Save for Later</span>
              </Button>

              <IconButton
                onClick={onRemove}
                icon={<X size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />}
                className="bg-background hover:bg-red-50 hover:text-red-600 text-foreground p-2 sm:p-3 transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
