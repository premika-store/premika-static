import ProductCard from "@/components/product-card";

// Sample product data - replace with your actual data source
const products = [
  {
    id: "1",
    name: "Choomaar Flared Kurti by Evara",
    originalPrice: 1199.0,
    salePrice: 849.0,
    images: [
      "/products/babita.PNG?height=400&width=300",
      "/products/asha.PNG?height=400&width=300&text=Hover",
    ],
    badge: "Sale",
  },
  {
    id: "2",
    name: "Ruby Ras Bell Sleeves Kurti by Evara",
    originalPrice: 1199.0,
    salePrice: 749.0,
    images: [
      "/products/meera.JPG?height=400&width=300",
      "/products/monika.PNG?height=400&width=300&text=Hover",
    ],
    badge: "Sale",
  },
  {
    id: "3",
    name: "Panna Patola Bell Sleeves Kurti by Evara",
    originalPrice: 1199.0,
    salePrice: 749.0,
    images: [
      "/products/ekta.PNG?height=400&width=300",
      "/products/indu.JPG?height=400&width=300&text=Hover",
    ],
    badge: "Sale",
  },
  {
    id: "4",
    name: "Chandni Charm Flared Kurti by Evara",
    originalPrice: 1199.0,
    salePrice: 849.0,
    images: [
      "/products/monika.PNG?height=400&width=300",
      "/products/indu.JPG?height=400&width=300&text=Hover",
    ],
    badge: "Sale",
  },
  {
    id: "5",
    name: "Rogi Raag Bell Sleeves Kurti by Evara",
    originalPrice: 1199.0,
    salePrice: 749.0,
    images: [
      "/products/babita.PNG?height=400&width=300",
      "/products/asha.PNG?height=400&width=300&text=Hover",
    ],
    badge: "Sale",
  },
  {
    id: "6",
    name: "Banjari Bell Sleeves Kurti by Evara",
    originalPrice: 1199.0,
    salePrice: 849.0,
    images: [
      "/products/meera.JPG?height=400&width=300",
      "/products/monika.PNG?height=400&width=300&text=Hover",
    ],
    badge: "Sale",
  },
  {
    id: "7",
    name: "Petakha Bell Sleeves Kurti by Evara",
    originalPrice: 1199.0,
    salePrice: 749.0,
    images: [
      "/products/ekta.PNG?height=400&width=300",
      "/products/indu.JPG?height=400&width=300&text=Hover",
    ],
    badge: "Sale",
  },
  {
    id: "8",
    name: "Neelam Bell Sleeves Kurti by Evara",
    originalPrice: 1199.0,
    salePrice: 849.0,
    images: [
      "/products/monika.PNG?height=400&width=300",
      "/products/indu.JPG?height=400&width=300&text=Hover",
    ],
    badge: "Sale",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Jaipur Janani's
            </h1>
            <p className="text-lg text-primary italic">
              "Pink City, Pinker Drama."
            </p>
          </div>
        </div>
      </div>

      {/* Filters and Sort Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-background py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-foreground">Filter:</span>
            <select className="px-3 py-2 text-sm border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
              <option value="" className="bg-popover text-foreground">
                Availability
              </option>
              <option value="in-stock" className="bg-popover text-foreground ">
                In Stock
              </option>
              <option
                value="out-of-stock"
                className="bg-popover text-foreground"
              >
                Out of Stock
              </option>
            </select>
            <select className="px-3 py-2 text-sm border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
              <option value="" className="bg-popover text-foreground">
                Price
              </option>
              <option
                value="low-to-high"
                className="bg-popover text-foreground"
              >
                Low to High
              </option>
              <option
                value="high-to-low"
                className="bg-popover text-foreground"
              >
                High to Low
              </option>
            </select>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-foreground">
              {products.length} products
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">
                Sort by:
              </span>
              <select
                defaultValue="featured"
                className="px-3 py-2 text-sm border border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="featured" className="bg-popover text-foreground">
                  Featured
                </option>
                <option value="newest" className="bg-popover text-foreground">
                  Newest
                </option>
                <option
                  value="price-low"
                  className="bg-popover text-foreground"
                >
                  Price: Low to High
                </option>
                <option
                  value="price-high"
                  className="bg-popover text-foreground"
                >
                  Price: High to Low
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 text-sm font-medium text-foreground bg-popover border border-foreground hover:font-bold rounded-lg hover:text-foreground hover:border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foreground">
            Load More Products
          </button>
        </div>
      </div>
    </div>
  );
}
