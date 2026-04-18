(function (global) {
  "use strict";

  global.WineAppData = {
    categories: [
      {
        title: "Deep reds",
        description: "Full-bodied pours for candlelit dinners and long table conversations.",
        image: "images/section/img7.jpg",
        link: "html/shop.html?q=red",
      },
      {
        title: "Gift boxes",
        description: "Premium presentation sets designed for festive and corporate gifting.",
        image: "images/section/img11.jpg",
        link: "html/shop.html?q=gift",
      },
      {
        title: "Weekend offers",
        description: "Fast-moving picks and event-ready labels without a cluttered storefront.",
        image: "images/section/img8.jpg",
        link: "html/shop.html?q=sparkling",
      },
      {
        title: "New arrivals",
        description: "Fresh additions highlighted with the same polished visual system.",
        image: "images/section/img9.jpeg",
        link: "html/shop.html?q=reserve",
      },
    ],
    products: [
      {
        id: "p1",
        name: "Rose Glow",
        subtitle: "Rose wine | Fresh berry finish",
        price: 300,
        category: ["rose", "gift"],
        tag: "Rose",
        image: "images/product/img3.jpg",
        description: "Bright berries, soft acidity, and a chilled finish that stays fresh.",
        rating: "4.8",
        featured: true,
        origin: "Nashik Valley, India",
        volume: "750 ml",
        abv: "12.0%",
        stock: "In stock",
        tasting: [
          "Wild strawberry and raspberry on the nose",
          "Crisp acidity with a floral mid-palate",
          "Easy finish built for brunches and gifting"
        ],
        pairings: ["Light pasta", "Soft cheese", "Brunch platters"],
        reviews: [
          { author: "Ananya", text: "Smooth, bright, and easy to serve at gatherings." },
          { author: "Kabir", text: "Excellent entry rose with a premium look." }
        ]
      },
      {
        id: "p2",
        name: "Ivory Coast White",
        subtitle: "White wine | Citrus and mineral lift",
        price: 500,
        category: ["white"],
        tag: "White",
        image: "images/product/img4.jpg",
        description: "Citrus-led white with floral lift and a crisp polished profile.",
        rating: "4.7",
        featured: true,
        origin: "Sula Hills, India",
        volume: "750 ml",
        abv: "12.5%",
        stock: "In stock",
        tasting: [
          "Lemon zest and orchard fruit aromatics",
          "Mineral snap with a clean linear finish",
          "Ideal for seafood and lighter plated menus"
        ],
        pairings: ["Seafood", "Sushi", "Fresh salads"],
        reviews: [
          { author: "Sana", text: "Very clean and premium for the price." },
          { author: "Rohit", text: "Good citrus structure and great for hosting." }
        ]
      },
      {
        id: "p3",
        name: "Cellar Rouge",
        subtitle: "Reserve red | Dark fruit and oak",
        price: 700,
        category: ["red", "reserve"],
        tag: "Reserve",
        image: "images/product/img5.jpg",
        description: "Dark fruit, oak touch, and a fuller body for slower evenings.",
        rating: "4.9",
        featured: true,
        origin: "La Rioja, Spain",
        volume: "750 ml",
        abv: "13.5%",
        stock: "Low stock",
        tasting: [
          "Black cherry, cocoa, and toasted oak",
          "Structured tannins for richer dinner settings",
          "Long finish designed for slow sipping"
        ],
        pairings: ["Roasted lamb", "Mushroom risotto", "Aged cheddar"],
        reviews: [
          { author: "Vikram", text: "Feels much more expensive than it is." },
          { author: "Nikita", text: "Full-bodied and perfect for dinner service." }
        ]
      },
      {
        id: "p4",
        name: "Gold Spark Brut",
        subtitle: "Sparkling | Celebration-ready bottle",
        price: 900,
        category: ["sparkling", "gift"],
        tag: "Sparkling",
        image: "images/product/gal10.jpg",
        description: "Celebration-ready sparkling bottle with fine bubbles and bright fruit.",
        rating: "4.9",
        featured: true,
        origin: "Prosecco Valley, Italy",
        volume: "750 ml",
        abv: "11.5%",
        stock: "In stock",
        tasting: [
          "Green apple and citrus blossom lift",
          "Fine bead with vibrant festive freshness",
          "Perfect for gifting and celebration tables"
        ],
        pairings: ["Canapes", "Desserts", "Celebration menus"],
        reviews: [
          { author: "Ira", text: "Looks premium and pours beautifully for events." },
          { author: "Manav", text: "Our go-to sparkling bottle for celebrations." }
        ]
      },
      {
        id: "p5",
        name: "Estate Crimson",
        subtitle: "Red wine | Plum and spice",
        price: 650,
        category: ["red"],
        tag: "Red",
        image: "images/product/img6.jpg",
        description: "Plum, spice, and a softer texture for weekend hosting.",
        rating: "4.6",
        origin: "Barossa-inspired blend",
        volume: "750 ml",
        abv: "13.0%",
        stock: "In stock",
        tasting: [
          "Plum and baking spice entry",
          "Round mouthfeel for casual premium serving",
          "Balanced finish with gentle oak warmth"
        ],
        pairings: ["BBQ", "Pizza", "Grilled vegetables"],
        reviews: [
          { author: "Tanvi", text: "Very friendly red for group dinners." }
        ]
      },
      {
        id: "p6",
        name: "Luna Blanc",
        subtitle: "White wine | Mineral and citrus",
        price: 540,
        category: ["white"],
        tag: "White",
        image: "images/product/img2.jpg",
        description: "Mineral finish, gentle citrus, and flexible pairing energy.",
        rating: "4.5",
        origin: "Coastal white blend",
        volume: "750 ml",
        abv: "12.0%",
        stock: "In stock",
        tasting: [
          "Gentle lemon, pear, and saline note",
          "Balanced palate for lighter foods",
          "Bright enough for daytime hosting"
        ],
        pairings: ["Sea bass", "Salads", "Soft cheeses"],
        reviews: [
          { author: "Aarav", text: "Crisp and very easy to pair." }
        ]
      },
      {
        id: "p7",
        name: "Sunset Rose",
        subtitle: "Rose wine | Fresh strawberry tone",
        price: 380,
        category: ["rose"],
        tag: "Rose",
        image: "images/product/img1.jpg",
        description: "Fresh strawberry notes in a lighter easy-drinking profile.",
        rating: "4.4",
        origin: "Mediterranean rose style",
        volume: "750 ml",
        abv: "11.8%",
        stock: "In stock",
        tasting: [
          "Strawberry and melon nose",
          "Soft texture with a breezy finish",
          "Built for casual premium serving"
        ],
        pairings: ["Tapas", "Fruit platters", "Light appetizers"],
        reviews: [
          { author: "Maya", text: "Great for brunch and summer evenings." }
        ]
      },
      {
        id: "p8",
        name: "Reserve Gift Box",
        subtitle: "Gift set | Premium festive presentation",
        price: 1200,
        category: ["gift", "sparkling"],
        tag: "Gift set",
        image: "images/product/gal9.jpeg",
        description: "A premium presentation set built for festive and executive gifting.",
        rating: "5.0",
        origin: "Curated gifting collection",
        volume: "2 x 750 ml",
        abv: "Mixed selection",
        stock: "Limited availability",
        tasting: [
          "Curated duo built for festive impact",
          "Presentation-first premium unboxing feel",
          "Ideal for executive and private gifting"
        ],
        pairings: ["Festive dinners", "Corporate gifting", "Private events"],
        reviews: [
          { author: "Dev", text: "Presentation quality is excellent for gifting." },
          { author: "Shreya", text: "This feels like a proper premium hamper." }
        ]
      },
    ],
    testimonials: [
      {
        quote: "The experience feels premium from the homepage to checkout. It finally looks like a real brand storefront.",
        author: "Riya Sharma",
        role: "Private client, Delhi",
      },
      {
        quote: "The collection browsing is clean, fast, and easy to understand. The redesign gives the store much better trust.",
        author: "Aditya Mehra",
        role: "Events curator",
      },
      {
        quote: "Gifting flow and product cards now feel polished enough for production launches and promo campaigns.",
        author: "Neha Kapoor",
        role: "Brand partnerships",
      },
    ],
  };
})(window);
