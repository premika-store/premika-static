"use client";

import Image from "next/image";
import { toast } from "react-hot-toast";
import { X, Heart } from "lucide-react";
import Link from "next/link";

import IconButton from "@/components/ui/icon-button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";

const CartItem = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const onMoveToWishlist = () => {
    // This would typically save to wishlist store
    cart.removeItem(data.id);
    toast.success("Item moved to wishlist");
  };

  return (
    <li className="bg-white rounded-lg border border-background p-3 sm:p-4 lg:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-row xs:flex-row">
        {/* Product Image */}
        <div className="relative  h-56 w-64 xs:h-24 xs:w-24 sm:h-28 sm:w-28 lg:h-36 lg:w-36 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
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
        <div className="flex-1 mt-3 xs:mt-0 ml-10 ">
          <div className="flex flex-col space-y-3 sm:space-y-0">
            <div className="flex-1">
              <Link href={`/${data.id}`} className="hover:underline">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 leading-tight">
                  {data.name}
                </h3>
              </Link>

              <div className="flex flex-col space-y-2 text-xs sm:text-sm text-primary mb-3">
                {data.selectedSize && (
                  <div className="flex items-center">
                    <span className="font-medium">Size:</span>
                    <span className="px-2 py-1 rounded text-xs font-medium">
                      {data.selectedSize}
                    </span>
                  </div>
                )}
                {data.quantity && (
                  <div className="flex items-center">
                    <span className="font-medium">Quantity:</span>
                    <span className="px-2 py-1 rounded text-xs font-medium">
                      {data.quantity}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                <div className="text-lg sm:text-xl font-bold text-secondary">
                  <Currency value={data.price} />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between sm:justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onMoveToWishlist}
                    className="flex items-center space-x-1 text-foreground bg-background hover:text-background hover:bg-primary text-xs sm:text-sm px-2 sm:px-3"
                  >
                    <Heart size={14} className="sm:w-4 sm:h-4" />
                    <span className="hidden sm:inline">Save for Later</span>
                    <span className="sm:hidden">Save</span>
                  </Button>

                  <IconButton
                    onClick={onRemove}
                    icon={<X size={16} className="sm:w-5 sm:h-5" />}
                    className="bg-background hover:bg-background text-foreground p-1 sm:p-2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
