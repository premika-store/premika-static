"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizeable-navbar";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import useCart from "@/hooks/use-cart";

export default function Navbarr() {
  const cart = useCart();
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Terms & Conditions",
      link: "/terms-and-conditions",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className=" w-full sticky top-0 z-50">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <Link href="/cart">
              <NavbarButton className="text-foreground bg-background flex items-center gap-2 relative">
                <ShoppingCart size={20} />
                <span className="hidden sm:inline">Cart</span>
                {cart.items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cart.items.length}
                  </span>
                )}
              </NavbarButton>
            </Link>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-foreground dark:text-foreground hover:text-[#361D1B] dark:hover:text-neutral-100 transition-colors"
              >
                <span className="block font-bold">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4 mt-4">
              <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                <NavbarButton className="w-full text-background bg-foreground flex items-center justify-center gap-2 relative">
                  <ShoppingCart size={20} />
                  <span>Cart</span>
                  {cart.items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.items.length}
                    </span>
                  )}
                </NavbarButton>
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
