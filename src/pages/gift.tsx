import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/products";

const gifts = [
  {
    id: "chocolates",
    name: "Artisan Chocolates",
    tagline: "Luxury truffles and handmade sweets",
    price: 1800,
    category: "Gifts",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80",
    premium: true,
  },
  {
    id: "teddy-bear",
    name: "Teddy Bear",
    tagline: "Soft plush companion for all ages",
    price: 2200,
    category: "Gifts",
    image:
      "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=900&q=80",
    premium: false,
  },
  {
    id: "watch",
    name: "Classic Watch",
    tagline: "A polished gift for special milestones",
    price: 5800,
    category: "Gifts",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
    premium: true,
  },
  {
    id: "perfume",
    name: "Signature Perfume",
    tagline: "Elegant fragrance gift set",
    price: 4200,
    category: "Gifts",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=80",
    premium: true,
  },
  {
    id: "mug",
    name: "Personalized Mug",
    tagline: "A cozy keepsake with a personal touch",
    price: 1400,
    category: "Gifts",
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80",
    premium: false,
  },
  {
    id: "hamper",
    name: "Gift Hamper",
    tagline: "Curated goodies for celebrations",
    price: 3600,
    category: "Gifts",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    premium: true,
  },
  {
    id: "plant",
    name: "Indoor Plant",
    tagline: "Low-maintenance greenery for the home",
    price: 2500,
    category: "Gifts",
    image:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80",
    premium: false,
  },
  {
    id: "card",
    name: "Greeting Card",
    tagline: "Handwritten warmth for your message",
    price: 700,
    category: "Gifts",
    image:
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=900&q=80",
    premium: false,
  },
  {
    id: "balloons",
    name: "Balloons",
    tagline: "Bright celebration accents",
    price: 1200,
    category: "Gifts",
    image:
      "https://images.unsplash.com/photo-1526383797285-6d8ddef7f2f2?auto=format&fit=crop&w=900&q=80",
    premium: false,
  },
];

export default function GiftsPage() {
  const [q, setQ] = useState("");

  const giftProducts: Product[] = useMemo(
    () =>
      gifts.map((item) => ({
        id: item.id,
        name: item.name,
        tagline: item.tagline,
        description: `${item.tagline}. Perfect for birthdays, anniversaries, and surprise gifting.`,
        price: item.price,
        image: item.image,
        category: item.category,
        occasion: ["Birthday", "Anniversary", "Just Because"],
        colors: ["Pink", "White"],
        rating: 4.7,
        reviews: 18,
        premium: item.premium,
        stock: 12,
        isActive: true,
      })),
    []
  );

  const filteredGifts = useMemo(() => {
    if (!q.trim()) {
      return giftProducts;
    }

    const query = q.toLowerCase();

    return giftProducts.filter((product) => {
      const searchable = `
        ${product.name}
        ${product.tagline}
        ${product.description}
      `.toLowerCase();

      return searchable.includes(query);
    });
  }, [giftProducts, q]);

  return (
    <div>
      {/* Hero */}
      <section className="bloom-gradient">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-deep-rose">
            Gifts
          </p>

          <h1 className="mt-2 max-w-4xl font-display text-5xl text-olive sm:text-6xl">
            Thoughtful gifts that bloom with your message.
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-espresso/70">
            Choose a bouquet, add a keepsake, and send a
            complete surprise in one order.
          </p>
        </div>
      </section>

      {/* Gifts */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="mb-8 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Search gifts…"
              className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm text-espresso outline-none placeholder:text-muted-foreground focus:border-rose focus:ring-2 focus:ring-rose/20"
            />
          </div>
        </div>

        {/* Count */}
        <div className="mb-6 text-sm text-muted-foreground">
          {filteredGifts.length} gifts
        </div>

        {/* Products */}
        {filteredGifts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card py-20 text-center">
            <p className="font-display text-2xl text-olive">
              No gifts found
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Try searching for something else.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredGifts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={{
                  ...product,
                  dbId: undefined,
                }}
                index={index}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}