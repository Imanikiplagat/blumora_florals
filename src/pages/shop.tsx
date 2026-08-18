import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { ProductCard } from "@/components/product-card";
import {
  useProducts,
  flowerTypes,
  occasions,
  flowerColors,
} from "@/lib/products";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

export default function Shop() {
  const { data: products = [] } = useProducts();

  const [q, setQ] = useState("");
  const [types, setTypes] = useState<string[]>([]);
  const [occs, setOccs] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>([0, 5000]);
  const [sort, setSort] = useState<Sort>("featured");

  const maxPrice = Math.max(
    ...products.map((product) => product.price),
    5000
  );

  useEffect(() => {
    setPrice([0, maxPrice]);
  }, [maxPrice]);

  const toggle = (
    list: string[],
    set: (value: string[]) => void,
    value: string
  ) => {
    set(
      list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value]
    );
  };

  const filtered = useMemo(() => {
    let out = products.filter((p) => {
      if (
        q &&
        !p.name.toLowerCase().includes(q.toLowerCase())
      ) {
        return false;
      }

      if (types.length && !types.includes(p.category)) {
        return false;
      }

      if (
        occs.length &&
        !p.occasion.some((o) => occs.includes(o))
      ) {
        return false;
      }

      if (
        colors.length &&
        !p.colors.some((c) => colors.includes(c))
      ) {
        return false;
      }

      if (p.price < price[0] || p.price > price[1]) {
        return false;
      }

      return true;
    });

    if (sort === "price-asc") {
      out = [...out].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-desc") {
      out = [...out].sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      out = [...out].sort((a, b) => b.rating - a.rating);
    }

    return out;
  }, [
    q,
    types,
    occs,
    colors,
    price,
    sort,
    products,
  ]);

  const Filters = (
    <div className="space-y-8">
      {/* Price */}
      <div>
        <h4 className="mb-3 font-display text-lg text-olive">
          Price
        </h4>

        <Slider
          min={0}
          max={maxPrice}
          step={100}
          value={price}
          onValueChange={(value) =>
            setPrice([value[0], value[1]] as [number, number])
          }
        />

        <div className="mt-2 flex justify-between text-sm text-muted-foreground">
          <span>KSh {price[0]}</span>
          <span>KSh {price[1]}</span>
        </div>
      </div>

      {/* Flower type */}
      <div>
        <h4 className="mb-3 font-display text-lg text-olive">
          Flower type
        </h4>

        <div className="space-y-2">
          {flowerTypes.map((type) => (
            <label
              key={type}
              className="flex cursor-pointer items-center gap-3 text-sm text-espresso"
            >
              <Checkbox
                checked={types.includes(type)}
                onCheckedChange={() =>
                  toggle(types, setTypes, type)
                }
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Occasion */}
      <div>
        <h4 className="mb-3 font-display text-lg text-olive">
          Occasion
        </h4>

        <div className="space-y-2">
          {occasions.map((occasion) => (
            <label
              key={occasion}
              className="flex cursor-pointer items-center gap-3 text-sm text-espresso"
            >
              <Checkbox
                checked={occs.includes(occasion)}
                onCheckedChange={() =>
                  toggle(occs, setOccs, occasion)
                }
              />
              {occasion}
            </label>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <h4 className="mb-3 font-display text-lg text-olive">
          Color
        </h4>

        <div className="flex flex-wrap gap-2">
          {flowerColors.map((color) => (
            <button
              key={color}
              onClick={() =>
                toggle(colors, setColors, color)
              }
              className={`rounded-full border px-3 py-1 text-xs transition ${
                colors.includes(color)
                  ? "border-rose bg-rose text-white"
                  : "border-border bg-card text-espresso hover:border-rose hover:text-rose"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <section className="bloom-gradient">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <p className="text-xs font-medium uppercase tracking-widest text-deep-rose">
            Shop
          </p>

          <h1 className="mt-2 font-display text-5xl text-olive sm:text-6xl">
            Every bloom, hand-picked.
          </h1>

          <p className="mt-4 max-w-xl text-espresso/70">
            Browse our full collection of hand-tied bouquets
            and arrangements.
          </p>
        </div>
      </section>

      {/* Products */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Search / Sort */}
        <div className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:grid-cols-[1fr_auto_auto]">
          <div className="relative min-w-0">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <input
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Search bouquets…"
              className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm text-espresso outline-none placeholder:text-muted-foreground focus:border-rose focus:ring-2 focus:ring-rose/20"
            />
          </div>

          {/* Mobile filters */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="overflow-y-auto p-6"
            >
              <SheetHeader className="mb-6 p-0">
                <SheetTitle className="font-display text-2xl text-olive">
                  Filters
                </SheetTitle>
              </SheetHeader>

              {Filters}
            </SheetContent>
          </Sheet>

          {/* Sort */}
          <Select
            value={sort}
            onValueChange={(value) =>
              setSort(value as Sort)
            }
          >
            <SelectTrigger className="w-[180px] rounded-full">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="featured">
                Featured
              </SelectItem>

              <SelectItem value="price-asc">
                Price: low to high
              </SelectItem>

              <SelectItem value="price-desc">
                Price: high to low
              </SelectItem>

              <SelectItem value="rating">
                Top rated
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            {Filters}
          </aside>

          {/* Products */}
          <div>
            <p className="mb-6 text-sm text-muted-foreground">
              {filtered.length} bouquets
            </p>

            {filtered.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-border bg-card py-20 text-center">
                <p className="font-display text-2xl text-olive">
                  No blooms match
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your filters.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}