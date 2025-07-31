"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter, ChevronDown } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { Carattere } from "next/font/google";

const carattere = Carattere({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-carattere",
});

export function Footer() {
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Premika Section */}
          <div className="space-y-4 mb-6">
            <h3 className="text-2xl font-bold mb-4">Premika</h3>
            <p
              className={`text-[#E0BCA2] text-base italic mb-4 ${carattere.className}`}
            >
              &ldquo;Prem se bana, Premika ke liye&rdquo;
            </p>
            <p className="text-[#E0BCA2] text-sm mb-6 leading-relaxed text-justify">
              Born from love and friendship, Premika reimagines Indian wear with
              care and intention. We create clothing that feels personal,
              rooted, and quietly beautiful - designed with love, crafted for
              you.
            </p>
          </div>

          {/* Mobile Two Column Layout for Quick Links and Contact */}
          <div className="flex justify-between">
            {/* Quick Links - Left Aligned */}
            <div className="flex-1">
              <button
                onClick={() => setIsQuickLinksOpen(!isQuickLinksOpen)}
                className="flex items-center justify-evenly w-full font-bold mb-2 text-left"
              >
                Quick Links
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isQuickLinksOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isQuickLinksOpen && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-[#E0BCA2]">
                  <Link href="/" className="hover:text-white transition-colors">
                    Products
                  </Link>
                  <Link
                    href="/cart"
                    className="hover:text-white transition-colors"
                  >
                    Cart
                  </Link>
                  <Link
                    href="/terms-and-conditions"
                    className="hover:text-white transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                  <Link
                    href="/privacy-policy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/shipping-policy"
                    className="hover:text-white transition-colors col-span-1"
                  >
                    Shipping Policy
                  </Link>
                  <Link
                    href="/terms-and-conditions"
                    className="hover:text-white transition-colors col-span-1"
                  >
                    Returns and Exchange
                  </Link>
                </div>
              )}
            </div>

            {/* Contact Us - Right Aligned */}
            <div className="flex-1 text-right">
              <button
                onClick={() => setIsContactUsOpen(!isContactUsOpen)}
                className="flex items-center justify-evenly w-full font-bold mb-2 text-right"
              >
                Contact Us
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isContactUsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isContactUsOpen && (
                <div className="space-y-3 text-sm">
                  <p>
                    <span className="font-medium">PHONE:</span>{" "}
                    <a
                      href="tel:+919599215195"
                      className="hover:text-white transition-colors"
                    >
                      (+91) 9599215195
                    </a>
                  </p>
                  <p>
                    <span className="font-medium">EMAIL:</span>{" "}
                    premika.shop@gmail.com
                  </p>

                  <div className="flex justify-end space-x-4 mt-4">
                    <a
                      href="https://www.instagram.com/premikastore/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a
                      href="mailto:premika.shop@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer"
                    >
                      <span className="text-sm font-bold">G</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-18">
          {/* Premika Column */}
          <div className="space-y-4 text-center">
            <h3 className={`text-3xl font-bold mb-4 `}>Premika</h3>
            <p
              className={`text-[#E0BCA2] text-2xl italic mb-4 ${carattere.className}`}
            >
              &ldquo;Prem se bani, Premika ke liye&rdquo;
            </p>
            <p className="text-[#E0BCA2] text-sm mb-6 leading-relaxed">
              Born from love and friendship, Premika reimagines Indian wear with
              care and intention. We create clothing that feels personal,
              rooted, and quietly beautiful - designed with love, crafted for
              you.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4 text-center">
            <h4 className="font-bold mb-6">Quick Links</h4>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-[#E0BCA2]">
              <Link href="/" className="hover:text-white transition-colors">
                Products
              </Link>
              <Link href="/cart" className="hover:text-white transition-colors">
                Cart
              </Link>
              <Link
                href="/terms-and-conditions"
                className="hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link
                href="/privacy-policy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/shipping-policy"
                className="hover:text-white transition-colors col-span-1"
              >
                Shipping Policy
              </Link>
              <Link
                href="/terms-and-conditions"
                className="hover:text-white transition-colors col-span-1"
              >
                Returns and Exchange
              </Link>
            </div>
          </div>

          {/* Contact Us Column */}
          <div className="space-y-4 text-center">
            <h4 className="font-bold mb-6">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <p>
                <span className="font-medium">PHONE:</span>{" "}
                <a
                  href="tel:+919599215195"
                  className="hover:text-white transition-colors"
                >
                  (+91) 9599215195
                </a>
              </p>
              <p>
                <span className="font-medium">EMAIL:</span>{" "}
                premika.shop@gmail.com
              </p>
            </div>

            <div className="flex space-x-4 justify-center">
              <a
                href="https://www.instagram.com/premikastore/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:premika.shop@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer"
              >
                <span className="text-sm font-bold">G</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E0BCA2] mx-4 sm:mx-6 lg:mx-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-m text-[#E0BCA2]">
            © 2025 Premika. All rights reserved.
          </p>
          <p className="text-center text-xs text-[#E0BCA2]">
            Made with ❤️ by{" "}
            <a
              href="https://www.linkedin.com/in/somani-khushi/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              Khushi Somani
            </a>{" "}
            and{" "}
            <a
              href="https://www.linkedin.com/in/parth-dahiya/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              Parth Dahiya
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
