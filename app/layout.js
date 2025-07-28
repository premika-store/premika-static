import { Urbanist } from "next/font/google";

import "./globals.css";

import { Footer } from "@/components/footer";
import ModalProdivder from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import Navbarr from "@/components/resize-navbar";

const font = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: "Premika",
  description: "Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${font.className} relative`}>
        <div className="bg-background">
          <Navbarr />
          <ModalProdivder />
          <ToastProvider />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
