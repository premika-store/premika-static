import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Input } from "./ui/input";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-18">
          {/* Premika Column */}
          <div className="space-y-4 pl-6">
            <h3 className="text-2xl font-bold mb-4">Premika</h3>
            <p className="text-[#E0BCA2] text-base italic mb-4">
              &ldquo;Prem se bani, Premika ke liye&rdquo;
            </p>
            <p className="text-[#E0BCA2] text-sm mb-6 leading-relaxed text-justify">
              Born from love and friendship, Premika reimagines Indian wear with
              care and intention. We create clothing that feels personal,
              rooted, and quietly beautiful - designed with love, crafted for
              you.
            </p>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4 pl-28">
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-[#E0BCA2]">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cart
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Returns & Exchanges
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us Column */}
          <div className="space-y-4 pl-16">
            <h4 className="font-bold  mb-6">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <p>
                <span className="font-medium">PHONE:</span> (+91) 9599215195
              </p>
              <p>
                <span className="font-medium">EMAIL:</span>{" "}
                premika.shop@gmail.com
              </p>
            </div>

            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/premikastore/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors cursor-pointer"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors cursor-pointer">
                <span className="text-sm font-bold">G</span>
              </div>
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
