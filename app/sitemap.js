import products from "@/data/data";

export default function sitemap() {
  const baseUrl = "https://premika.shop";
  const currentDate = new Date().toISOString();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/shipping-policy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cart`,
      lastModified: currentDate,
      changeFrequency: "always",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/checkout`,
      lastModified: currentDate,
      changeFrequency: "always",
      priority: 0.7,
    },
  ];

  // Dynamic product pages
  const productPages = products.map((product) => ({
    url: `${baseUrl}/${product.id}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Combine all pages
  return [...staticPages, ...productPages];
}
