import { Link } from "react-router-dom";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart-context";
import { useFavorites } from "@/lib/favourites-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addItem } = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.includes(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card transition-shadow hover:shadow-petal"
    >
    <Link
  to={`/product/${product.id}`}
  className="relative block aspect-[4/5] overflow-hidden bloom-gradient"
>
        <motion.img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {product.premium && (
          <span className="absolute left-3 top-3 rounded-full bg-[color:var(--gold)]/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--ink)]">
            Premium
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(product.id, product.dbId);
          }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-foreground shadow-sm transition hover:scale-110"
          aria-label="favorite"
        >
          <Heart className={cn("h-4 w-4", isFav && "fill-primary text-primary")} />
        </button>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-[color:var(--gold)] text-[color:var(--gold)]" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span>({product.reviews})</span>
          <span className="ml-auto text-[10px] uppercase tracking-wider">{product.category}</span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-xl leading-tight text-foreground">{product.name}</h3>
        </Link>
        <p className="line-clamp-1 text-sm text-muted-foreground">{product.tagline}</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="font-display text-2xl text-[color:var(--burgundy)]">KSh {product.price}</span>
          <Button
            size="sm"
            onClick={() => addItem(product)}
            className="rounded-full bg-[color:var(--burgundy)] text-primary-foreground hover:bg-[color:var(--rose)]"
          >
            <ShoppingBag className="mr-1.5 h-3.5 w-3.5" />
            Add
          </Button>
        </div>
      </div>
    </motion.article>
  );
}