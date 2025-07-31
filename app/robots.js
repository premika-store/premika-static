export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/checkout/", "/cart/"],
    },
    sitemap: "https://premika.shop/sitemap.xml",
  };
}
