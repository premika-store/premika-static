// data/products.js

const products = [
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
            { label: "XS", inStock: true },
            { label: "S", inStock: true },
            { label: "M", inStock: true },
            { label: "L", inStock: true },
            { label: "XL", inStock: true },
        ],
        reviews: [
            {
                name: "Aarushi",
                date: "2025-05-15",
                rating: 5,
                comment: "Absolutely love the mint green color and the halter neck! The cotton fabric is so comfortable for all-day wear."
            },
            {
                name: "Simran",
                date: "2025-06-03",
                rating: 5,
                comment: "The backless design is so unique and stylish. Double lining makes it feel premium and soft."
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
            "/Mastani/Mastani 1.png",
            "/Mastani/Mastani 2.webp",
            "/Mastani/Mastani 3.png",
            "/Mastani/Mastani 4.png",
        ],
        category: "clothing",
        inStock: true,
        sizes: [
            { label: "S", inStock: true },
            { label: "M", inStock: true },
            { label: "L", inStock: false },
            { label: "XL", inStock: false },
        ],
        reviews: [
            {
                name: "Priya",
                date: "2025-05-28",
                rating: 5,
                comment: "The white color is so elegant and the halter neck fits perfectly. Love the bold backless style!"
            },
            {
                name: "Megha",
                date: "2025-06-10",
                rating: 4,
                comment: "Super comfortable and the double lining adds a nice touch. Great for both casual and special occasions."
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
            "/Naina/Naina 1.png",
            "/Naina/Naina 2.png",
            "/Naina/Naina 3.png",
            "/Naina/Naina 4.png",
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
        reviews: [
            {
                name: "Riya",
                date: "2025-05-20",
                rating: 5,
                comment: "The deep blue color is stunning and the cotton fabric feels so soft. The halter neck is very flattering."
            },
            {
                name: "Tanvi",
                date: "2025-06-15",
                rating: 5,
                comment: "Love the bold backless design! It's both graceful and modern, perfect for any event."
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
            "/Heer/Heer 1.png",
            "/Heer/Heer 2.png",
            "/Heer/Heer 3.png",
            "/Heer/Heer 4.png",
        ],
        category: "clothing",
        inStock: true,
        sizes: [
            { label: "S", inStock: true },
            { label: "M", inStock: true },
            { label: "L", inStock: true },
            { label: "XL", inStock: true },
        ],
        reviews: [
            {
                name: "Isha",
                date: "2025-05-12",
                rating: 5,
                comment: "The light pink color is so pretty and feminine. The halter neck and backless style are very trendy."
            },
            {
                name: "Neha",
                date: "2025-06-05",
                rating: 4,
                comment: "Super comfortable and the double lining is a great feature. Love the modern yet delicate look."
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
            "/Geet/Geet 1.jpg",
            "/Geet/Geet 2.png",
            "/Geet/Geet 3.png",
            "/Geet/Geet 4.png",
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
        reviews: [
            {
                name: "Aditi",
                date: "2025-05-08",
                rating: 5,
                comment: "The dark green color is so bold and eye-catching. The halter neck fits beautifully."
            },
            {
                name: "Kavya",
                date: "2025-06-18",
                rating: 5,
                comment: "Love the comfort of the cotton and the double lining. The backless design is a real showstopper!"
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
            "/Babita/Babita 1.png",
            "/Babita/Babita 2.png",
            "/Babita/Babita 3.png",
            "/Babita/Babita 4.png",
        ],
        category: "clothing",
        inStock: true,
        sizes: [
            { label: "S", inStock: true },
            { label: "M", inStock: true },
            { label: "XS", inStock: true },
            { label: "XL", inStock: true },
        ],
        reviews: [
            {
                name: "Sonal",
                date: "2025-05-25",
                rating: 4,
                comment: "The high side slits give this kurti a modern twist. The black color is always in style."
            },
            {
                name: "Divya",
                date: "2025-06-12",
                rating: 5,
                comment: "Very comfortable and easy to style. The slits make it perfect for both casual and party looks."
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
            "/Asha/Asha 1.png",
            "/Asha/Asha 2.png",
            "/Asha/Asha 3.png",
            "/Asha/Asha 4.png",
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
        reviews: [
            {
                name: "Maya",
                date: "2025-05-30",
                rating: 5,
                comment: "The bell sleeves are so cute and playful! The cotton fabric is light and comfy."
            },
            {
                name: "Rashmi",
                date: "2025-06-08",
                rating: 4,
                comment: "Love the short length and the blue color. Perfect for a fresh, everyday look."
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
            "/Rekha/Rekha 1.png",
            "/Rekha/Rekha 2.png",
            "/Rekha/Rekha 3.png",
            "/Rekha/Rekha 4.png",
        ],
        category: "clothing",
        inStock: true,
        sizes: [
            { label: "S", inStock: true },
            { label: "M", inStock: true },
            { label: "XS", inStock: true },
            { label: "XL", inStock: true },
        ],
        reviews: [
            {
                name: "Sneha",
                date: "2025-05-18",
                rating: 5,
                comment: "The noodle straps are perfect for summer! The pink color is so pretty and feminine."
            },
            {
                name: "Anjali",
                date: "2025-06-22",
                rating: 4,
                comment: "Simple yet elegant design. Great for casual outings and feels very comfortable."
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
            "/Meera/Meera 1.png",
            "/Meera/Meera 2.png",
            "/Meera/Meera 3.png",
            "/Meera/Meera 4.png",
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
        reviews: [
            {
                name: "Pooja",
                date: "2025-05-14",
                rating: 5,
                comment: "The asymmetrical cut is so stylish and modern. The rust color is very unique."
            },
            {
                name: "Bhavna",
                date: "2025-06-07",
                rating: 4,
                comment: "Love the tie-up sleeve straps! The cotton fabric is soft and comfortable."
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
            "/Jaya/Jaya 1.png",
            "/Jaya/Jaya 2.png",
            "/Jaya/Jaya 3.png",
            "/Jaya/Jaya 4.png",
        ],
        category: "clothing",
        inStock: true,
        sizes: [
            { label: "S", inStock: true },
            { label: "M", inStock: true },
            { label: "XS", inStock: true },
            { label: "XL", inStock: true },
        ],
        reviews: [
            {
                name: "Nisha",
                date: "2025-05-22",
                rating: 5,
                comment: "The serene blue color is so calming and elegant. The asymmetrical design is very flattering."
            },
            {
                name: "Ritika",
                date: "2025-06-14",
                rating: 4,
                comment: "Perfect for both day and night looks. The fit is great and the style is timeless."
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
            "/Neelam/Neelam 1.png",
            "/Neelam/Neelam 2.PNG",
            "/Neelam/Neelam 3.png",
            "/Neelam/Neelam 4.png",
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
        reviews: [
            {
                name: "Shreya",
                date: "2025-05-10",
                rating: 5,
                comment: "The square neckline and full sleeves look so chic. The tie-up back gives a perfect fit."
            },
            {
                name: "Garima",
                date: "2025-06-20",
                rating: 4,
                comment: "Love the cotton fabric and the modern design. Great for everyday wear!"
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
            "/Piku/Piku 1.jpg",
            "/Piku/Piku 2.png",
            "/Piku/Piku 3.png",
            "/Piku/Piku 4.png",
        ],
        category: "clothing",
        inStock: true,
        sizes: [
            { label: "S", inStock: true },
            { label: "M", inStock: true },
            { label: "XS", inStock: true },
            { label: "XL", inStock: true },
        ],
        reviews: [
            {
                name: "Vandana",
                date: "2025-05-16",
                rating: 5,
                comment: "The white color is so classic and the square neckline is very flattering. Love the tie-up back!"
            },
            {
                name: "Deepa",
                date: "2025-06-11",
                rating: 4,
                comment: "Full sleeves make it perfect for any season. The fit is amazing and very comfortable."
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
                "/Indu/Indu 1.png",
                "/Indu/Indu 2.png",
                "/Indu/Indu 3.png",
                "/Indu/Indu 4.png",
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
        reviews: [
            {
                name: "Manisha",
                date: "2025-05-05",
                rating: 5,
                comment: "The sweetheart neckline is so elegant and the cotton fabric feels luxurious. Love the full sleeves!"
            },
            {
                name: "Preeti",
                date: "2025-06-01",
                rating: 5,
                comment: "Adds a sophisticated touch to my wardrobe. The fit and feel are just perfect."
            },
        ],
    },

    // {
    //     id: "lata",
    //     name: "lata",
    //     price: 599,
    //     shortDescription: "100% cotton, noodle strap kurti",
    //     longDescription:
    //         "Lightweight and breezy, the Lata Kurti features delicate noodle straps and a relaxed fit, crafted from 100% cotton for ultimate comfort. Perfect for warm days or layering in cooler weather.",
    //     images: [
    //             "/lata/lata 1.png",
    //             "/lata/lata 2.png",
    //             "/lata/lata 3.png",
    //             "/lata/lata 4.png",
    //     ],
    //     category: "clothing",
    //     inStock: false,
    //     sizes: [
    //         { label: "XS", inStock: false },
    //         { label: "S", inStock: false },
    //         { label: "M", inStock: false },
    //         { label: "L", inStock: false },
    //         { label: "XL", inStock: false },
    //     ],
    //     reviews: [
    //         {
    //             name: "Rupal",
    //             date: "2025-05-07",
    //             rating: 4,
    //             comment: "The noodle straps and relaxed fit make this kurti perfect for hot days. So light and comfy!"
    //         },
    //         {
    //             name: "Jasleen",
    //             date: "2025-06-17",
    //             rating: 5,
    //             comment: "Love the 100% cotton fabric. It's easy to layer and feels great on the skin."
    //         },
    //     ],
    // },
];

export default products;
