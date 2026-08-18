import { createContext, useContext, useEffect, useState, type ReactNode, useCallback } from "react";
import { supabase } from "@/intergrations/supabase/client";
import { useAuth } from "./auth-context";
import { useProducts } from "./products";

type FavCtx = {
  favorites: string[]; // slugs
  toggleFavorite: (slug: string, dbId?: string) => void;
};

const Ctx = createContext<FavCtx | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { data: products } = useProducts();
  const [local, setLocal] = useState<string[]>([]);
  const [remote, setRemote] = useState<string[]>([]);

  // hydrate localStorage favorites
  useEffect(() => {
    try {
      const raw = localStorage.getItem("blumora-favs");
      if (raw) setLocal(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("blumora-favs", JSON.stringify(local));
  }, [local]);

  // fetch remote favorites when user logs in
  useEffect(() => {
    if (!user || !products) {
      setRemote([]);
      return;
    }
    supabase
      .from("favorites")
      .select("product_id")
      .then(({ data }) => {
        if (data) {
          const slugs = data
            .map((r) => products.find((p) => p.dbId === r.product_id)?.id)
            .filter(Boolean) as string[];
          setRemote(slugs);
        }
      });
  }, [user, products]);

  const toggleFavorite = useCallback(
    async (slug: string, dbId?: string) => {
      if (user && products) {
        const product = products.find((p) => p.id === slug);
        const productDbId = dbId ?? product?.dbId;
        if (!productDbId) return;
        const already = remote.includes(slug);
        setRemote((prev) => (already ? prev.filter((s) => s !== slug) : [...prev, slug]));
        if (already) {
          await supabase.from("favorites").delete().eq("user_id", user.id).eq("product_id", productDbId);
        } else {
          await supabase.from("favorites").insert({ user_id: user.id, product_id: productDbId });
        }
      } else {
        setLocal((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
      }
    },
    [user, products, remote],
  );

  const favorites = user ? remote : local;

  return <Ctx.Provider value={{ favorites, toggleFavorite }}>{children}</Ctx.Provider>;
}

export function useFavorites() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useFavorites must be used within FavoritesProvider");
  return v;
}