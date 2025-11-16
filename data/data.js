// data/products.js

const products = [
  {
    id: "badal",
    name: "Badal",
    price: 769,
    shortDescription:
      "Add a touch of elegance to your wardrobe with the Badal kurti, crafted from luxurious printed velvet. Its stunning blend of white, blue, and orange hues creates a vibrant yet graceful look perfect for festive or casual occasions.",
    longDescription:
      "Embrace effortless sophistication with our Badal kurti, designed in soft and sumptuous velvet fabric. The kurti features an exquisite white base adorned with blue and orange prints, bringing a refreshing fusion of tradition and modern style. Perfect for festive gatherings, evening outings, or special occasions, Badal offers comfort, style, and a hint of regal charm making it a standout piece",
    images: [
      "/Badal/Badal1.png",
      "/Badal/Badal2.png",
      "/Badal/Badal3.png",
      "/Badal/Badal4.png",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XXS", inStock: true },
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    reviews: [
      {
        name: "pooja",
        date: "2025-05-14",
        rating: 5,
        comment:
          "The color combo is chef’s kiss! Looks even better in person 💙🧡",
      },
      {
        name: "Bhavna",
        date: "2025-06-07",
        rating: 4,
        comment: "Wore it for a family gathering and got endless compliments!",
      },
    ],
  },
  {
    id: "mishti",
    name: "Mishti",
    price: 769,
    shortDescription:
      "Add a pop of colour to your wardrobe with Mishti, a premium black velvet kurti featuring vibrant multicolour prints. Chic, comfortable, and effortlessly elegant perfect for any festive or evening occasion.",
    longDescription:
      "Redefine festive elegance with Mishti, crafted in rich premium black velvet and adorned with striking multicolour prints. The contrast of bold hues against the deep black fabric brings a perfect blend of sophistication and vibrance. Designed for comfort and style, Mishti is ideal for celebrations, evening gatherings, or anytime you want to make a subtle yet stunning statement.",
    images: [
      "/Mishti/Mishti1.png",
      "/Mishti/Mishti2.png",
      "/Mishti/Mishti3.png",
      "/Mishti/Mishti4.png",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XXS", inStock: true },
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    reviews: [
      {
        name: "pooja",
        date: "2025-05-14",
        rating: 5,
        comment:
          "The black velvet feels so luxe, and those colourful prints just pop! Totally obsessed.",
      },
      {
        name: "Bhavna",
        date: "2025-06-07",
        rating: 4,
        comment:
          "Such a classy piece - bold, comfy, and effortlessly elegant.",
      },
    ],
  },
  {
    id: "nazakat",
    name: "Nazakat",
    price: 649,
    shortDescription:
      "Nazakat is a graceful georgette kurti featuring elegant bell sleeves, a corset back, and double lining for added comfort. Flowing and feminine, it’s designed to make a subtle yet striking statement.",
    longDescription:
      "Nazakat is a flowy georgette kurti that exudes quiet elegance. It features romantic bell sleeves and a structured corset back for a flattering shape. Designed with double lining, it offers both comfort and coverage without compromising on style. The lightweight georgette drapes beautifully, perfect for special occasions or evening wear. Nazakat moves with grace and ease, capturing attention with every step. A timeless piece that balances softness with strength.",
    images: [
      "/Nazakat/Nazakat1.webp",
      "/Nazakat/Nazakat2.webp",
      "/Nazakat/Nazakat3.webp",
      "/Nazakat/Nazakat4.webp",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Sana",
        date: "2025-09-09",
        rating: 5,
        comment:
          "The bell sleeves are so elegant and the corset back gives a lovely shape. The georgette drapes beautifully.",
      },
      {
        name: "Farah",
        date: "2025-09-10",
        rating: 4,
        comment:
          "Really like the graceful flow of the fabric. The double lining makes it comfortable while keeping the design stylish.",
      },
    ],
  },
  {
    id: "masakali",
    name: "Masakali",
    price: 649,
    shortDescription:
      "Masakali is a breezy blue georgette kurti with delicate white prints, featuring elegant bell sleeves and a flattering corset back. Light, airy, and effortlessly graceful, it’s made for days when you want to feel free yet put-together.",
    longDescription:
      "Masakali is a dreamy georgette kurti in a soft blue shade adorned with subtle white prints. It features graceful bell sleeves and a corset back that adds shape without sacrificing comfort. Lightweight and flowy, the georgette fabric drapes beautifully with every movement. Designed for ease and elegance, it's ideal for daytime outings or relaxed festive gatherings. The airy silhouette and thoughtful detailing make it a versatile, go-to piece. Masakali is where comfort meets charm — effortlessly and beautifully.",
    images: [
      "/Masakali/Masakali1.webp",
      "/Masakali/Masakali2.webp",
      "/Masakali/Masakali3.webp",
      "/Masakali/Masakali4.webp",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Priya",
        date: "2025-09-09",
        rating: 5,
        comment:
          "The blue shade with white prints is so calming and pretty. The bell sleeves give it such a graceful look.",
      },
      {
        name: "Sneha",
        date: "2025-09-10",
        rating: 4,
        comment:
          "Very airy and flowy, perfect for warm days. The corset back adds structure without losing comfort.",
      },
    ],
  },
  {
    id: "neelam",
    name: "Neelam",
    price: 599,
    shortDescription:
      "100% cotton, short kurti with full sleeves and back tie up for stretched waist",
    longDescription:
      "Sleek, stylish, and subtly bold—the Neelam Kurti features a crisp square neckline, elegant full sleeves, and a tie-up back that perfectly snatches the waist. A modern essential for everyday chic.",
    images: [
      "/Neelam/Neelam1.png",
      "/Neelam/Neelam2.png",
      "/Neelam/Neelam3.png",
      "/Neelam/Neelam4.png",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XXS", inStock: true },
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Shreya",
        date: "2025-05-10",
        rating: 5,
        comment:
          "The square neckline and full sleeves look so chic. The tie-up back gives a perfect fit.",
      },
      {
        name: "Garima",
        date: "2025-06-20",
        rating: 4,
        comment:
          "Love the cotton fabric and the modern design. Great for everyday wear!",
      },
    ],
  },
  {
    id: "piku",
    name: "Piku",
    price: 599,
    shortDescription:
      "short kurti with full sleeves and back tie up for stretched waist",
    longDescription:
      "Timeless and fresh, the Piku Kurti in classic white features a sharp square neckline, graceful full sleeves, and a chic tie-up back to accentuate your waist. Perfect for effortless elegance any day.",
    images: [
      "/Piku/Piku1.jpg",
      "/Piku/Piku2.png",
      "/Piku/Piku3.png",
      "/Piku/Piku4.png",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XXS", inStock: true },
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Vandana",
        date: "2025-05-16",
        rating: 5,
        comment:
          "The white color is so classic and the square neckline is very flattering. Love the tie-up back!",
      },
      {
        name: "Deepa",
        date: "2025-06-11",
        rating: 4,
        comment:
          "Full sleeves make it perfect for any season. The fit is amazing and very comfortable.",
      },
    ],
  },
  {
    id: "diya",
    name: "Diya",
    price: 1999,
    shortDescription:
      "Diya is a graceful Farsi salwar suit with delicate noodle straps and a corset back. It blends ethnic elegance with a modern silhouette, perfect for festive occasions. Effortlessly stylish and uniquely feminine.",
    longDescription:
      "Diya is a striking Farsi salwar suit that blends tradition with a modern silhouette. Featuring delicate noodle straps and a structured corset back, it offers a flattering, feminine fit. The soft, flowing fabric contrasts beautifully with the tailored bodice, creating a look that's both graceful and bold. Perfect for festive events or weddings, Diya stands out with its effortless charm. Style it with statement jewelry for a look that's elegant yet contemporary.",
    images: [
      "/Diya/Diya1.png",
      "/Diya/Diya2.png",
      "/Diya/Diya3.png",
      "/Diya/Diya4.png",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XXS", inStock: true },
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    reviews: [
      {
        name: "Divya",
        date: "2025-10-14",
        rating: 5,
        comment:
          "Perfect for festive occasions — lightweight, flattering, and very chic. Will buy again in another color.",
      },
      {
        name: "Ishu",
        date: "2025-10-16",
        rating: 4,
        comment:
          "Diya made me feel so confident — the corset back gives great shape without being restrictive.",
      },
    ],
  },
  {
    id: "ambika",
    name: "Ambika",
    price: 1599,
    shortDescription:
      "Ambika is a powerful black set featuring our signature backless lace top Durga paired with a full-flared, double-lined skirt. Fierce, fluid, and unapologetically bold.<br>View Size Chart For Skirt for the perfect fit.",
    longDescription:
      "Ambika is a statement in all black a striking set that pairs the dramatic lace-back kurti with a voluminous, double-lined skirt. The top flows long in the front and daringly open at the back, while the skirt brings movement and depth with its full flare. Together, they create a look that’s equal parts elegance and attitude — made for presence, not subtlety.",
    images: [
      "/Ambika/Ambika1.png",
      "/Ambika/Ambika2.png",
      "/Ambika/Ambika3.png",
      "/Ambika/Ambika4.png",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XS", inStock: false },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: false },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Priya",
        date: "2025-08-15",
        rating: 5,
        comment:
          "Absolutely stunning set! The backless lace top is so dramatic and the full-flared skirt flows beautifully. Perfect for special occasions.",
      },
      {
        name: "Kavya",
        date: "2025-09-19",
        rating: 5,
        comment:
          "The all-black look is so powerful and elegant. Love how the double-lined skirt moves when I walk. Definitely a statement piece!",
      },
      {
        name: "Anita",
        date: "2025-09-19",
        rating: 4,
        comment:
          "The lace detailing on the top is exquisite and the skirt has such a lovely volume. Great quality fabric and fits perfectly.",
      },
    ],
  },
  {
    id: "gauri",
    name: "Gauri",
    price: 899,
    shortDescription:
      "Gauri is a striking purple top with delicate lace detailing and a bold backless cut. Flowing in the front and fearless at the back, it brings together elegance and edge with effortless ease.",
    longDescription:
      "Gauri is a bold purple kurti that blends classic charm with a daring twist. Featuring soft lace details and a striking backless design, it’s graceful in the front and fearless at the back. Whether styled up or down, Gauri is made for moments when you want to stand out — without saying a word",
    images: [
      "/Gauri/Gauri1.png",
      "/Gauri/Gauri2.jpg",
      "/Gauri/Gauri3.png",
      "/Gauri/Gauri4.png",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XXS", inStock: true },
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Shreya",
        date: "2025-09-19",
        rating: 5,
        comment:
          "The purple color is absolutely gorgeous! The lace detailing adds such elegance and the backless design is so bold and beautiful.",
      },
      {
        name: "Rhea",
        date: "2025-09-19",
        rating: 5,
        comment:
          "Love how it flows in the front and is fearless at the back. Perfect blend of classic charm with a daring twist. Gets compliments every time!",
      },
      {
        name: "Meera",
        date: "2025-09-12",
        rating: 4,
        comment:
          "The soft lace details are beautiful and the striking backless design makes it perfect for special occasions. Very well made!",
      },
    ],
  },
  {
    id: "durga",
    name: "Durga",
    price: 899,
    shortDescription:
      "Durga is a bold black top featuring intricate lace detailing and a dramatic backless design. Long in the front and daring at the back, it’s a perfect blend of elegance and edge.",
    longDescription:
      "Durga is a striking black top designed to make a statement. It features delicate lace detailing in the front, adding a touch of softness to its bold silhouette. The front is elongated for a graceful fall, while the back is open and dramatic — completely backless. Perfect for evening outings or special events, it balances mystery and elegance effortlessly. Durga is confidence stitched into fabric, made for those who dress with intention. Pair it with fitted bottoms or a skirt to let the top speak for itself.",
    images: [
      "/Durga/Durga1.webp",
      "/Durga/Durga2.webp",
      "/Durga/Durga3.webp",
      "/Durga/Durga4.webp",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Simran",
        date: "2025-09-09",
        rating: 5,
        comment:
          "Absolutely love the dramatic backless design! The lace details in the front balance it so well — elegant yet daring.",
      },
      {
        name: "Avni",
        date: "2025-09-10",
        rating: 4,
        comment:
          "The fit is great and it looks very stylish for evening outings. Would have loved a bit more lining, but overall stunning!",
      },
    ],
  },
  {
    id: "shakti",
    name: "Shakti",
    price: 899,
    shortDescription:
      "Shakti is a powerful red top with intricate lace detailing and a dramatic backless design. Long in the front and open at the back, it’s made to turn heads with elegance and fire.",
    longDescription:
      "Shakti is a bold and beautiful red top that commands attention. Featuring delicate lace detailing in the front, it brings softness to its striking silhouette. The front drapes long and elegantly, while the open back adds a daring edge. Crafted for evenings that call for confidence and grace, it’s both sensual and sophisticated. Perfectly paired with sleek bottoms or statement jewelry, Shakti lets your presence speak. It’s not just a top — it’s power in red.",
    images: [
      "/Shakti/Shakti1.webp",
      "/Shakti/Shakti2.webp",
      "/Shakti/Shakti3.webp",
      "/Shakti/Shakti4.webp",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Rhea",
        date: "2025-09-09",
        rating: 5,
        comment:
          "The vibrant red is absolutely stunning! The lace adds elegance, and the open back makes it bold and unforgettable.",
      },
      {
        name: "Tanvi",
        date: "2025-09-10",
        rating: 4,
        comment:
          "Really love the design — it’s powerful and chic. The long front drape makes it graceful while the back is super dramatic.",
      },
    ],
  },
  {
    id: "harsha",
    name: "Harsha",
    price: 599,
    shortDescription:
      "Harsha is a pure cotton yellow short kurti with a round neck and delicate noodle straps. It features lively floral prints, making it a cheerful and breezy option for sunny days.",
    longDescription:
      "Harsha is a vibrant yellow short kurti crafted from pure cotton, designed for comfort and effortless style. Featuring a round neck and fine noodle straps, it's adorned with playful floral prints that add a touch of freshness. Lightweight and airy, it's ideal for casual summer outings or lounging in style. Pair it with denims or skirts for a fun, relaxed look.",
    images: [
      "/Harsha/Harsha1.jpg",
      "/Harsha/Harsha2.jpg",
      "/Harsha/Harsha3.jpg",
      "/Harsha/Harsha4.jpg",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Priya",
        date: "2025-07-09",
        rating: 5,
        comment:
          "Love the vibrant yellow color and beautiful floral prints! The cotton fabric is so soft and breathable.",
      },
      {
        name: "Khushi",
        date: "2025-07-09",
        rating: 4,
        comment:
          "The noodle straps are delicate and the round neck is flattering. Perfect for summer days!",
      },
    ],
  },
  {
    id: "neha",
    name: "Neha",
    price: 599,
    shortDescription:
      "Neha is a pure cotton short kurti featuring delicate noodle straps and a round neck. Its white base is adorned with vibrant multicolour floral prints, making it a breezy and stylish pick for summer days",
    longDescription:
      "Neha is a pure cotton short kurti with a round neck and delicate noodle straps. Its white base is brightened with multicolour floral prints, giving it a fresh, summery vibe. Lightweight and breezy, it's perfect for casual days out or relaxed indoor wear. Pair it with jeans, shorts, or skirts for an effortlessly chic look.",
    images: [
      "/Neha/Neha1.jpg",
      "/Neha/Neha2.jpg",
      "/Neha/Neha3.jpg",
      "/Neha/Neha4.jpg",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Ananya",
        date: "2025-09-09",
        rating: 5,
        comment:
          "The multicolour floral prints on the white base look so fresh and summery! The cotton fabric feels super light and comfy, perfect for hot days.",
      },
      {
        name: "Kritika",
        date: "2025-09-10",
        rating: 4,
        comment:
          "Love the round neck and noodle straps design. It’s stylish yet casual, and the breezy fit makes it great for everyday wear.",
      },
    ],
  },
  {
    id: "radha",
    name: "Radha",
    price: 599,
    shortDescription:
      "Radha is a green pure cotton kurti designed for comfort and style. It features elegant side knots on both sides, adding a modern twist to its traditional charm.",
    longDescription:
      "Radha is a pure cotton kurti in a soothing green shade. Soft, breathable, and perfect for everyday wear. Features stylish side knots on both sides. Adds a unique twist to a classic design. Comfortable fit with a touch of elegance. Ideal for casual outings or daily wear. Pairs well with jeans, leggings, or palazzos. Easy to style and gentle on the skin. Simple yet effortlessly chic. Radha brings comfort and style together.",
    images: [
      "/Radha/Radha1.jpg",
      "/Radha/Radha2.jpg",
      "/Radha/Radha3.jpg",
      "/Radha/Radha4.jpg",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Ishita",
        date: "2025-09-09",
        rating: 5,
        comment:
          "The soothing green color is beautiful and the side knots add such a unique touch! Very comfortable for daily wear.",
      },
      {
        name: "Meera",
        date: "2025-09-10",
        rating: 4,
        comment:
          "Love the modern twist with side knots on a classic kurti. The cotton fabric is soft and breathable, perfect for summers.",
      },
    ],
  },
  {
    id: "sanjh",
    name: "Sanjh",
    price: 649,
    shortDescription:
      "Sanjh is a chic one-shoulder kurti in a soft butter yellow hue, crafted from pure cotton. Featuring a unique blend of a single sleeve on one side and delicate noodle straps on the other, it effortlessly blends tradition with a modern twist.",
    longDescription:
      "Sanjh is a stylish one-shoulder kurti made from pure cotton. It features a full sleeve on one side and noodle straps on the other. The asymmetrical design adds a modern, playful twist. Soft butter yellow brings a calm, sunny charm. Lightweight and breathable for all-day comfort. Perfect for brunches, gatherings, or casual evenings. Pair it with trousers, skirts, or even jeans. Effortlessly blends tradition with contemporary style. A subtle statement for the modern woman. Sanjh is where comfort meets quiet elegance.",
    images: [
      "/Sanjh/Sanjh1.webp",
      "/Sanjh/Sanjh2.webp",
      "/Sanjh/Sanjh3.webp",
      "/Sanjh/Sanjh4.webp",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Naina",
        date: "2025-09-09",
        rating: 5,
        comment:
          "The one-shoulder design with a sleeve on one side and noodle strap on the other is so unique! The butter yellow shade is soft and elegant.",
      },
      {
        name: "Tanya",
        date: "2025-09-10",
        rating: 4,
        comment:
          "Really like the modern asymmetrical look. The cotton fabric feels light and airy, perfect for day outings.",
      },
    ],
  },
  {
    id: "shreya",
    name: "Shreya",
    price: 599,
    shortDescription:
      "Shreya is a striking red kurti with a sweetheart neckline and corset-style back, crafted from pure cotton. Designed with breathable fabric, it combines elegance and comfort for a confident, modern look.",
    longDescription:
      "Shreya is a vibrant red kurti made from pure, breathable cotton. It features a romantic sweetheart neckline and a structured corset back for a flattering fit. Designed to balance comfort with bold style, it’s perfect for festive days or evening outings. The airy fabric keeps you cool while adding a graceful flow to every move. Pair it with flared pants or a sleek skirt for an effortlessly elegant look. Shreya is where timeless charm meets modern edge.",
    images: [
      "/Shreya/Shreya1.png",
      "/Shreya/Shreya2.webp",
      "/Shreya/Shreya3.webp",
      "/Shreya/Shreya4.webp",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Aditi",
        date: "2025-09-09",
        rating: 5,
        comment:
          "The sweetheart neckline and corset back give such a flattering fit. The red is vibrant and perfect for festive wear.",
      },
      {
        name: "Rhea",
        date: "2025-09-10",
        rating: 4,
        comment:
          "Love the bold yet elegant style. The cotton fabric keeps it comfortable even for long wear.",
      },
    ],
  },

  {
    id: "nishtha",
    name: "Nishtha",
    price: 599,
    shortDescription:
      "Nishtha is a bold red kurti made from pure cotton, featuring a double V neckline and the same elegant print as Shreya. Designed with breathable fabric, it offers a flattering silhouette with modern charm and all-day comfort.",
    longDescription:
      "Nishtha is a striking red kurti crafted from pure, breathable cotton. It shares the same elegant print as Shreya but features a unique double V neckline for a modern edge. The silhouette is flattering yet comfortable, perfect for day-to-night wear. Its airy fabric ensures ease and movement, even in warmer weather. Effortlessly stylish, it pairs beautifully with trousers, skirts, or statement accessories. Nishtha is a blend of bold color, thoughtful design, and everyday elegance.",
    images: [
      "/Nishtha/Nishtha1.webp",
      "/Nishtha/Nishtha2.webp",
      "/Nishtha/Nishtha3.webp",
      "/Nishtha/Nishtha4.webp",
    ],
    category: "clothing",
    inStock: false,
    sizes: [
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Shalini",
        date: "2025-09-09",
        rating: 5,
        comment:
          "The double V neckline is such a stylish detail. Love how the red stands out while still feeling very comfortable.",
      },
      {
        name: "Divya",
        date: "2025-09-10",
        rating: 4,
        comment:
          "The fit is flattering and the breathable cotton is perfect for all-day wear. Great for both casual and festive occasions.",
      },
    ],
  },
  {
    id: "barkha",
    name: "Barkha",
    price: 649,
    shortDescription:
      "Crafted in pure cotton, this elegant piece features graceful bell sleeves and a chic corset back for a modern twist on tradition",
    longDescription:
      "The Barkha Kurti blends comfort with elegance. Made from pure cotton, it's breathable and perfect for all day wear. Featuring graceful bell sleeves and a flattering corset back, this kurti adds a modern twist to a classic silhouette,ideal for both casual outings and festive occasions.",
    images: [
      "/Barkha/Barkha1.png",
      "/Barkha/Barkha2.png",
      "/Barkha/Barkha3.png",
      "/Barkha/Barkha4.png",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XXS", inStock: true },
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Sita",
        date: "2025-08-15",
        rating: 5,
        comment:
          "The graceful bell sleeves are so elegant and the corset back gives a perfect fit! Modern yet traditional.",
      },
      {
        name: "Sarla",
        date: "2025-06-07",
        rating: 4,
        comment:
          "Love the pure cotton fabric and the unique corset back design. Great for both casual and festive wear.",
      },
    ],
  },
  {
    id: "Hema",
    name: "Hema",
    price: 599,
    shortDescription:
      "Crafted in pure cotton, this feminine piece features a soft sweetheart neckline and a flattering corset back.",
    longDescription:
      "The Hema Kurti is made from breathable pure cotton, designed for comfort and elegance. A soft sweetheart neckline brings a romantic touch, while the corset back adds a modern, form-enhancing detail. Feminine and flattering, Hema is perfect for both everyday grace and special moments.",
    images: [
      "/Hema/Hema1.png",
      "/Hema/Hema2.png",
      "/Hema/Hema3.png",
      "/Hema/Hema4.png",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XXS", inStock: true },
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Khushi",
        date: "2025-08-15",
        rating: 5,
        comment:
          "The soft sweetheart neckline is so romantic and feminine! The corset back gives a beautiful silhouette.",
      },
      {
        name: "Saumya",
        date: "2025-06-07",
        rating: 4,
        comment:
          "Love the cotton fabric and the elegant design. Perfect for both everyday wear and special occasions.",
      },
    ],
  },
  {
    id: "monika",
    name: "Monika",
    price: 599,
    shortDescription: "100% cotton, halter neck kurti",
    longDescription:
      "Fresh and fearless, the Monika Kurti shines in a breezy mint green. Made from pure cotton with double lining, it features a flattering halter neck and striking backless design, blending comfort with contemporary charm.",
    images: [
      "/Monika/Monika1.png",
      "/Monika/Monika2.png",
      "/Monika/Monika3.png",
      "/Monika/Monika4.png",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XXS", inStock: true },
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Aarushi",
        date: "2025-05-15",
        rating: 5,
        comment:
          "Absolutely love the mint green color and the halter neck! The cotton fabric is so comfortable for all-day wear.",
      },
      {
        name: "Simran",
        date: "2025-06-03",
        rating: 5,
        comment:
          "The backless design is so unique and stylish. Double lining makes it feel premium and soft.",
      },
    ],
  },
  {
    id: "mastani",
    name: "Mastani",
    price: 599,
    shortDescription: "halter neck kurti",
    longDescription:
      "Grace meets bold in the Mastani Kurti, tailored in pure cotton with a soft double lining for extra comfort and coverage. Its elegant halter neck, timeless white hue, and daring backless design make it a standout for any occasion.",
    images: [
      "/Mastani/Mastani1.png",
      "/Mastani/Mastani2.webp",
      "/Mastani/Mastani3.png",
      "/Mastani/Mastani4.png",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XXS", inStock: true },
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Priya",
        date: "2025-05-28",
        rating: 5,
        comment:
          "The white color is so elegant and the halter neck fits perfectly. Love the bold backless style!",
      },
      {
        name: "Megha",
        date: "2025-06-10",
        rating: 4,
        comment:
          "Super comfortable and the double lining adds a nice touch. Great for both casual and special occasions.",
      },
    ],
  },
  {
    id: "naina",
    name: "Naina",
    price: 599,
    shortDescription: "100% cotton, halter neck kurti",
    longDescription:
      "Make a striking impression with the Naina Kurti, crafted from pure cotton with a soft double lining for comfort and elegance. The halter neck, deep blue shade, and bold backless cut bring a perfect mix of grace and modern flair.",
    images: [
      "/Naina/Naina1.png",
      "/Naina/Naina2.png",
      "/Naina/Naina3.png",
      "/Naina/Naina4.png",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XXS", inStock: true },
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Riya",
        date: "2025-05-20",
        rating: 5,
        comment:
          "The deep blue color is stunning and the cotton fabric feels so soft. The halter neck is very flattering.",
      },
      {
        name: "Tanvi",
        date: "2025-06-15",
        rating: 5,
        comment:
          "Love the bold backless design! It's both graceful and modern, perfect for any event.",
      },
    ],
  },
  {
    id: "heer",
    name: "Heer",
    price: 599,
    shortDescription: "halter neck kurti",
    longDescription:
      "Delicate yet daring, the Heer Kurti comes in a soft light pink shade, crafted from pure cotton with double lining for comfort and grace. Its elegant halter neck and backless style blend femininity with a bold, modern touch.",
    images: [
      "/Heer/Heer1.png",
      "/Heer/Heer2.png",
      "/Heer/Heer3.png",
      "/Heer/Heer4.png",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XXS", inStock: true },
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Isha",
        date: "2025-05-12",
        rating: 5,
        comment:
          "The light pink color is so pretty and feminine. The halter neck and backless style are very trendy.",
      },
      {
        name: "Neha",
        date: "2025-06-05",
        rating: 4,
        comment:
          "Super comfortable and the double lining is a great feature. Love the modern yet delicate look.",
      },
    ],
  },
  {
    id: "geet",
    name: "Geet",
    price: 599,
    shortDescription: "100% cotton, halter neck kurti",
    longDescription:
      "Bold and beautiful, the Geet Kurti stuns in a rich dark green hue. Made from pure cotton with double lining, it offers all-day comfort with a luxe feel. Featuring a flattering halter neck and daring backless design, it's perfect for making a stylish statement.",
    images: [
      "/Geet/Geet1.jpg",
      "/Geet/Geet2.png",
      "/Geet/Geet3.png",
      "/Geet/Geet4.png",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XXS", inStock: true },
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Aditi",
        date: "2025-05-08",
        rating: 5,
        comment:
          "The dark green color is so bold and eye-catching. The halter neck fits beautifully.",
      },
      {
        name: "Kavya",
        date: "2025-06-18",
        rating: 5,
        comment:
          "Love the comfort of the cotton and the double lining. The backless design is a real showstopper!",
      },
    ],
  },
  {
    id: "babita",
    name: "Babita",
    price: 599,
    shortDescription: "Kurti with high side slits",
    longDescription:
      "Bold and stylish, the Babita Kurti in classic black features daring high side slits for a contemporary edge. Perfect for making a statement with effortless confidence.",
    images: [
      "/Babita/Babita1.png",
      "/Babita/Babita2.png",
      "/Babita/Babita3.png",
      "/Babita/Babita4.png",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XXS", inStock: true },
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Sonal",
        date: "2025-05-25",
        rating: 4,
        comment:
          "The high side slits give this kurti a modern twist. The black color is always in style.",
      },
      {
        name: "Divya",
        date: "2025-06-12",
        rating: 5,
        comment:
          "Very comfortable and easy to style. The slits make it perfect for both casual and party looks.",
      },
    ],
  },
  {
    id: "asha",
    name: "Asha",
    price: 599,
    shortDescription: "100% cotton, short kurti with bell sleeves",
    longDescription:
      "Grace meets playfulness in the Asha Kurti, featuring delicate blue bell sleeves that add a charming flair. This short kurti blends comfort with style, perfect for adding a fresh twist to your everyday wardrobe.",
    images: [
      "/Asha/Asha1.png",
      "/Asha/Asha2.png",
      "/Asha/Asha3.png",
      "/Asha/Asha4.png",
    ],
    category: "clothing",
    inStock: false,
    sizes: [
      { label: "XS", inStock: false },
      { label: "S", inStock: false },
      { label: "M", inStock: false },
      { label: "L", inStock: false },
      { label: "XL", inStock: false },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Maya",
        date: "2025-05-30",
        rating: 5,
        comment:
          "The bell sleeves are so cute and playful! The cotton fabric is light and comfy.",
      },
      {
        name: "Rashmi",
        date: "2025-06-08",
        rating: 4,
        comment:
          "Love the short length and the blue color. Perfect for a fresh, everyday look.",
      },
    ],
  },
  {
    id: "rekha",
    name: "Rekha",
    price: 599,
    shortDescription: "Noodle strap kurti",
    longDescription:
      "Feminine and flirty, the Rekha Kurti features delicate noodle straps and a lovely pink shade, perfect for warm days and casual outings. This short kurti combines simplicity with subtle elegance.",
    images: [
      "/Rekha/Rekha1.png",
      "/Rekha/Rekha2.png",
      "/Rekha/Rekha3.png",
      "/Rekha/Rekha4.png",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XXS", inStock: true },
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Sneha",
        date: "2025-05-18",
        rating: 5,
        comment:
          "The noodle straps are perfect for summer! The pink color is so pretty and feminine.",
      },
      {
        name: "Anjali",
        date: "2025-06-22",
        rating: 4,
        comment:
          "Simple yet elegant design. Great for casual outings and feels very comfortable.",
      },
    ],
  },
  {
    id: "meera",
    name: "Meera",
    price: 599,
    shortDescription: "100% cotton, short Asymmetrical Kurti",
    longDescription:
      "Bold and unique, the Meera Kurti in warm rust features trendy tie-up sleeve straps and a stylish asymmetrical cut for a modern, edgy look. Perfect for those who love to stand out with effortless style.",
    images: [
      "/Meera/Meera1.png",
      "/Meera/Meera2.png",
      "/Meera/Meera3.png",
      "/Meera/Meera4.png",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "L", inStock: false },
      { label: "XL", inStock: false },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Pooja",
        date: "2025-05-14",
        rating: 5,
        comment:
          "The asymmetrical cut is so stylish and modern. The rust color is very unique.",
      },
      {
        name: "Bhavna",
        date: "2025-06-07",
        rating: 4,
        comment:
          "Love the tie-up sleeve straps! The cotton fabric is soft and comfortable.",
      },
    ],
  },
  {
    id: "jaya",
    name: "Jaya",
    price: 599,
    shortDescription: "Asymmetrical Kurti",
    longDescription:
      "Classic and captivating, the Jaya Kurti in serene blue offers timeless style with a modern touch. Perfect for day-to-night wear, it's your go-to for effortless elegance.",
    images: [
      "/Jaya/Jaya1.png",
      "/Jaya/Jaya2.png",
      "/Jaya/Jaya3.png",
      "/Jaya/Jaya4.png",
    ],
    category: "clothing",
    inStock: true,
    sizes: [
      { label: "XXS", inStock: true },
      { label: "XS", inStock: true },
      { label: "S", inStock: true },
      { label: "M", inStock: true },
      { label: "XL", inStock: true },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Nisha",
        date: "2025-05-22",
        rating: 5,
        comment:
          "The serene blue color is so calming and elegant. The asymmetrical design is very flattering.",
      },
      {
        name: "Ritika",
        date: "2025-06-14",
        rating: 4,
        comment:
          "Perfect for both day and night looks. The fit is great and the style is timeless.",
      },
    ],
  },
  {
    id: "Indu",
    name: "Indu",
    price: 599,
    shortDescription: "100% cotton, full sleeves sweetheart kurti",
    longDescription:
      "Elegant and enchanting, the Indu Kurti features a sweetheart neckline and full sleeves, crafted from pure cotton for a soft, luxurious feel. Perfect for adding a touch of sophistication to your wardrobe.",
    images: [
      "/Indu/Indu1.png",
      "/Indu/Indu2.png",
      "/Indu/Indu3.png",
      "/Indu/Indu4.png",
    ],
    category: "clothing",
    inStock: false,
    sizes: [
      { label: "XS", inStock: false },
      { label: "S", inStock: false },
      { label: "M", inStock: false },
      { label: "L", inStock: false },
      { label: "XL", inStock: false },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Manisha",
        date: "2025-05-05",
        rating: 5,
        comment:
          "The sweetheart neckline is so elegant and the cotton fabric feels luxurious. Love the full sleeves!",
      },
      {
        name: "Preeti",
        date: "2025-06-01",
        rating: 5,
        comment:
          "Adds a sophisticated touch to my wardrobe. The fit and feel are just perfect.",
      },
    ],
  },

  {
    id: "Lata",
    name: "Lata",
    price: 599,
    shortDescription: "100% cotton, noodle strap kurti",
    longDescription:
      "Lightweight and breezy, the Lata Kurti features delicate noodle straps and a relaxed fit, crafted from 100% cotton for ultimate comfort. Perfect for warm days or layering in cooler weather.",
    images: [
      "/Lata/Lata1.png",
      "/Lata/Lata2.png",
      "/Lata/Lata3.png",
      "/Lata/Lata4.png",
    ],
    category: "clothing",
    inStock: false,
    sizes: [
      { label: "XS", inStock: false },
      { label: "S", inStock: false },
      { label: "M", inStock: false },
      { label: "L", inStock: false },
      { label: "XL", inStock: false },
    ],
    heights: [
      { label: "Up to 5'3\"", value: "up-to-5-3", default: true },
      { label: "5'4\" - 5'6\"", value: "5-4-to-5-6", default: false },
      { label: "5'6\" and above", value: "5-6-and-above", default: false },
    ],
    reviews: [
      {
        name: "Rupal",
        date: "2025-05-07",
        rating: 4,
        comment:
          "The noodle straps and relaxed fit make this kurti perfect for hot days. So light and comfy!",
      },
      {
        name: "Jasleen",
        date: "2025-06-17",
        rating: 5,
        comment:
          "Love the 100% cotton fabric. It's easy to layer and feels great on the skin.",
      },
    ],
  },
];

export default products;
