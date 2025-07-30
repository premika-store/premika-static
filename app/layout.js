import { Urbanist } from "next/font/google";

import "./globals.css";

import { Footer } from "@/components/footer";
import ModalProdivder from "@/providers/modal-provider";
import ToastProvider from "@/providers/toast-provider";
import Navbarr from "@/components/resize-navbar";

const font = Urbanist({ subsets: ["latin"] });

export const metadata = {
  title: {
    template: "%s | Premika - Premium Fashion Store",
    default: "Premika - Premium Designer Kurtis Online",
  },
  description:
    "Discover premium women's fashion at Premika. Shop designer kurtis, halter neck tops, cotton kurtas & ethnic wear. Free shipping on orders over ₹500. Easy returns. Quality guaranteed.",
  keywords: [
    "women fashion",
    "designer kurtis",
    "ethnic wear",
    "cotton kurtas",
    "halter neck kurti",
    "indian fashion",
    "online shopping",
    "premika store",
    "women clothing",
    "fashion store india",
    "kurti online",
    "ethnic fashion",
    "designer wear",
    "cotton clothing",
    "women's apparel",
  ],
  authors: [{ name: "Premika Store" }],
  creator: "Premika Store",
  publisher: "Premika Store",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://premika-store.com"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Premika - Premium Designer Kurtis Online",
    description:
      "Discover premium women's fashion at Premika. Shop designer kurtis, halter neck tops, cotton kurtas & ethnic wear. Free shipping on orders over ₹500.",
    url: "https://premika-store.com", // Replace with your actual domain
    siteName: "Premika Store",
    images: [
      {
        url: "/logo.png", // Make sure this image exists in your public folder
        width: 1200,
        height: 630,
        alt: "Premika Fashion Store",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premika - Premium Designer Kurtis Online",
    description:
      "Shop designer kurtis, ethnic wear & premium women's fashion. Free shipping over ₹500. Quality guaranteed.",
    images: ["/logo.png"], // Make sure this image exists
    creator: "@premika_store", // Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
  manifest: "/site.webmanifest",
  other: {
    "google-site-verification": "your-google-verification-code", // Add your Google Search Console verification code
    "msapplication-TileColor": "#da532c",
    "theme-color": "#ffffff",
  },
  category: "fashion",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
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
