import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Check, Flower2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useProducts, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

type StemOption = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const wraps = [
  {
    id: "linen",
    name: "Ivory linen",
    price: 600,
  },
  {
    id: "kraft",
    name: "Kraft paper",
    price: 400,
  },
  {
    id: "silk",
    name: "Silk ribbon",
    price: 1000,
  },
];

const sizes = [
  {
    id: "petite",
    name: "Petite",
    min: 3,
  },
  {
    id: "classic",
    name: "Classic",
    min: 6,
  },
  {
    id: "grand",
    name: "Grand",
    min: 10,
  },
];

export default function CustomBuilder() {
  const { addItem } = useCart();
  const { data: products = [] } = useProducts();

  const flowers: StemOption[] = products
    .slice(0, 6)
    .map((product: Product) => ({
      id: product.id,
      name: product.name,
      price: Math.round(product.price / 4),
      image: product.image,
    }));

  const [selected, setSelected] = useState<Record<string, number>>({});
  const [wrap, setWrap] = useState(wraps[0].id);
  const [size, setSize] = useState(sizes[1].id);
  const [message, setMessage] = useState("");

  const flowerCount = Object.values(selected).reduce(
    (sum, number) => sum + number,
    0
  );

  const selectedWrap =
    wraps.find((item) => item.id === wrap) ?? wraps[0];

  const selectedSize =
    sizes.find((item) => item.id === size) ?? sizes[1];

  const wrapPrice = selectedWrap.price;
  const sizeMin = selectedSize.min;

  const flowerSubtotal = useMemo(() => {
    return Object.entries(selected).reduce(
      (sum, [id, quantity]) => {
        const flower = flowers.find((item) => item.id === id);

        return sum + (flower?.price ?? 0) * quantity;
      },
      0
    );
  }, [selected, flowers]);

  const total = flowerSubtotal + wrapPrice;

  const bump = (id: string, delta: number) => {
    setSelected((previous) => {
      const next = Math.max(0, (previous[id] ?? 0) + delta);

      const updated = {
        ...previous,
        [id]: next,
      };

      if (next === 0) {
        delete updated[id];
      }

      return updated;
    });
  };

  const canAdd = flowerCount >= sizeMin;

  const handleAdd = () => {
    if (!canAdd || flowers.length === 0) {
      return;
    }

    const summary = Object.entries(selected)
      .map(([id, quantity]) => {
        const flower = flowers.find((item) => item.id === id);

        return `${quantity}× ${flower?.name}`;
      })
      .join(", ");

    const firstSelectedFlower =
      flowers.find((flower) => selected[flower.id]);

    addItem(
      {
        id: `custom-${Date.now()}`,
        name: "Custom bouquet",
        tagline: summary,
        description: `${summary}, ${selectedWrap.name.toLowerCase()} wrap.${
          message ? ` Message: "${message}"` : ""
        }`,
        price: total,
        image: firstSelectedFlower?.image ?? flowers[0].image,
        category: "Wildflowers",
        occasion: ["Custom"],
        colors: [],
        rating: 5,
        reviews: 0,
        stock: 1,
      },
      1
    );

    toast.success("Your custom bouquet is in the cart!");
  };

  return (
    <div>
      {/* HERO */}
      <section className="bloom-gradient">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-widest text-deep-rose">
            Design your own
          </p>

          <h1 className="mt-2 font-display text-5xl text-olive sm:text-6xl">
            Build your bouquet.
          </h1>

          <p className="mt-3 max-w-xl text-foreground/70">
            Choose your blooms, pick your wrap, and add a message.
            Your florist will hand-tie it fresh.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px] lg:px-8">
        <div className="space-y-10">
          {/* SIZE */}
          <div>
            <h2 className="font-display text-2xl text-foreground">
              1. Choose a size
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {sizes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSize(item.id)}
                  className={cn(
                    "rounded-2xl border-2 px-5 py-4 text-left transition",
                    size === item.id
                      ? "border-olive bg-secondary"
                      : "border-border hover:border-rose"
                  )}
                >
                  <p className="font-display text-xl">
                    {item.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    Minimum {item.min} stems
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* FLOWERS */}
          <div>
            <h2 className="font-display text-2xl text-foreground">
              2. Pick your flowers
            </h2>

            <p className="text-sm text-muted-foreground">
              {flowerCount} / {sizeMin} minimum
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {flowers.map((flower) => {
                const quantity = selected[flower.id] ?? 0;

                return (
                  <div
                    key={flower.id}
                    className="overflow-hidden rounded-2xl border border-border bg-card"
                  >
                    <div className="aspect-square overflow-hidden bloom-gradient">
                      <img
                        src={flower.image}
                        alt={flower.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    <div className="p-4">
                      <p className="font-display text-lg text-espresso">
                        {flower.name}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        KSh {flower.price.toLocaleString()} per stem
                      </p>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-border">
                          <button
                            type="button"
                            onClick={() => bump(flower.id, -1)}
                            className="h-8 w-8 rounded-full hover:bg-secondary"
                          >
                            −
                          </button>

                          <span className="w-8 text-center text-sm font-medium">
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() => bump(flower.id, 1)}
                            className="h-8 w-8 rounded-full hover:bg-secondary"
                          >
                            +
                          </button>
                        </div>

                        {quantity > 0 && (
                          <span className="text-sm font-medium text-olive">
                            KSh{" "}
                            {(flower.price * quantity).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* WRAPPING */}
          <div>
            <h2 className="font-display text-2xl text-foreground">
              3. Choose wrapping
            </h2>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {wraps.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setWrap(item.id)}
                  className={cn(
                    "rounded-2xl border-2 px-5 py-4 text-left transition",
                    wrap === item.id
                      ? "border-olive bg-secondary"
                      : "border-border hover:border-rose"
                  )}
                >
                  <p className="font-display text-lg text-espresso">
                    {item.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    +KSh {item.price.toLocaleString()}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* MESSAGE */}
          <div>
            <h2 className="font-display text-2xl text-foreground">
              4. Add a note (optional)
            </h2>

            <Textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Write a personal message for the card…"
              maxLength={200}
              className="mt-3 min-h-24 rounded-2xl border-border bg-card"
            />

            <p className="mt-1 text-right text-xs text-muted-foreground">
              {message.length}/200
            </p>
          </div>
        </div>

        {/* PREVIEW / SUMMARY */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <div className="relative flex aspect-square items-center justify-center bloom-gradient">
              {flowerCount === 0 ? (
                <div className="text-center">
                  <Flower2 className="mx-auto h-10 w-10 text-olive/60" />

                  <p className="mt-2 text-sm text-olive/70">
                    Your bouquet will bloom here
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 p-6">
                  {Object.entries(selected)
                    .slice(0, 4)
                    .map(([id]) => {
                      const flower = flowers.find(
                        (item) => item.id === id
                      );

                      if (!flower) return null;

                      return (
                        <motion.img
                          key={id}
                          src={flower.image}
                          alt={flower.name}
                          initial={{
                            scale: 0,
                            rotate: -10,
                          }}
                          animate={{
                            scale: 1,
                            rotate: 0,
                          }}
                          className="aspect-square rounded-full object-cover shadow-md"
                        />
                      );
                    })}
                </div>
              )}
            </div>

            <div className="space-y-3 p-6">
              <h3 className="font-display text-2xl text-espresso">
                Your bouquet
              </h3>

              {Object.entries(selected).length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Nothing added yet.
                </p>
              )}

              {Object.entries(selected).map(([id, quantity]) => {
                const flower = flowers.find(
                  (item) => item.id === id
                );

                if (!flower) return null;

                return (
                  <div
                    key={id}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {quantity}× {flower.name}
                    </span>

                    <span>
                      KSh{" "}
                      {(flower.price * quantity).toLocaleString()}
                    </span>
                  </div>
                );
              })}

              <div className="flex justify-between border-t border-border pt-3 text-sm">
                <span>Wrapping</span>

                <span>
                  KSh {wrapPrice.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-xl">
                <span className="font-display">
                  Total
                </span>

                <span className="font-display text-olive">
                  KSh {total.toLocaleString()}
                </span>
              </div>

              <Button
                onClick={handleAdd}
                disabled={!canAdd || flowers.length === 0}
                size="lg"
                className="mt-2 w-full rounded-full bg-olive text-white hover:bg-deep-olive"
              >
                {canAdd ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Add to cart
                  </>
                ) : (
                  `Add ${sizeMin - flowerCount} more stems`
                )}
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}