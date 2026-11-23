import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/intergrations/supabase/client";

export const flowerImageUrls = {
  roseBouquet: "https://ik.imagekit.io/blumoraFlorals/ImageKit/1.jpeg",
  daisies: "https://ik.imagekit.io/blumoraFlorals/ImageKit/2.jpeg",
  yellowBouquet: "https://ik.imagekit.io/blumoraFlorals/ImageKit/3.jpeg",
  wrappedRoses: "https://ik.imagekit.io/blumoraFlorals/ImageKit/4.jpeg",
  roseGiftBouquet: "https://ik.imagekit.io/blumoraFlorals/ImageKit/5.jpeg",
  luxuryRoseBouquet: "https://ik.imagekit.io/blumoraFlorals/ImageKit/7.jpeg",
  mixedBouquet: "https://ik.imagekit.io/blumoraFlorals/ImageKit/8.jpeg",
  purpleMums: "https://ik.imagekit.io/blumoraFlorals/ImageKit/9.jpeg",
  purpleMumsBouquet:
    "https://ik.imagekit.io/blumoraFlorals/ImageKit/purple%20mums.jpeg",
} as const;

export type Product = {
  id: string;
  dbId?: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  category: string;
  occasion: string[];
  colors: string[];
  rating: number;
  reviews: number;
  premium?: boolean;
  stock: number;
  isActive?: boolean;
};

export const imageMap: Record<string, string> = {
  peony: flowerImageUrls.mixedBouquet,
  roses: flowerImageUrls.roseBouquet,
  lilies: flowerImageUrls.mixedBouquet,
  wild: flowerImageUrls.daisies,
  sunflower: flowerImageUrls.yellowBouquet,
  tulips: flowerImageUrls.wrappedRoses,
  "rose-gift": flowerImageUrls.roseGiftBouquet,
  "rose-luxe": flowerImageUrls.luxuryRoseBouquet,
  "purple-mums": flowerImageUrls.purpleMumsBouquet,
  "purple-mums-closeup": flowerImageUrls.purpleMums,
};

const fallbackProducts: Product[] = [
  {
    id: "blush-bloom",
    name: "Blush Bloom",
    tagline: "Soft pink roses with creamy accents",
    description:
      "An airy bouquet of roses and premium greens for romantic occasions.",
    price: 3200,
    image: flowerImageUrls.roseBouquet,
    category: "Roses",
    occasion: ["Anniversary", "Birthday"],
    colors: ["Pink", "Cream"],
    rating: 4.9,
    reviews: 240,
    premium: true,
    stock: 12,
    isActive: true,
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    tagline: "Sunflowers and tulips for bright celebrations",
    description:
      "A cheerful arrangement designed for joyful moments and warm greetings.",
    price: 2800,
    image: flowerImageUrls.yellowBouquet,
    category: "Seasonal",
    occasion: ["Congratulations", "Just Because"],
    colors: ["Yellow", "Orange"],
    rating: 4.8,
    reviews: 188,
    premium: false,
    stock: 18,
    isActive: true,
  },
  {
    id: "wild-escape",
    name: "Wild Escape",
    tagline: "An organic mix of meadow flowers",
    description:
      "A textured bouquet with wildflowers and seasonal greens for a natural look.",
    price: 2600,
    image: flowerImageUrls.daisies,
    category: "Wildflowers",
    occasion: ["Housewarming", "Thank You"],
    colors: ["White", "Green"],
    rating: 4.7,
    reviews: 152,
    premium: false,
    stock: 20,
    isActive: true,
  },
  {
    id: "lilies-of-love",
    name: "Lilies of Love",
    tagline: "Elegant lilies with a velvet finish",
    description:
      "A graceful floral arrangement for romantic and formal celebrations.",
    price: 3000,
    image: flowerImageUrls.mixedBouquet,
    category: "Lilies",
    occasion: ["Romance", "Sympathy"],
    colors: ["White", "Burgundy"],
    rating: 4.6,
    reviews: 135,
    premium: true,
    stock: 10,
    isActive: true,
  },
  {
    id: "velvet-tulips",
    name: "Velvet Tulips",
    tagline: "Rich jewel-toned tulips",
    description:
      "A modern bouquet with bold color and sleek presentation.",
    price: 2400,
    image: flowerImageUrls.purpleMumsBouquet,
    category: "Tulips",
    occasion: ["Birthday", "Congratulations"],
    colors: ["Pink", "Burgundy"],
    rating: 4.5,
    reviews: 112,
    premium: false,
    stock: 14,
    isActive: true,
  },
  {
    id: "rose-garden",
    name: "Rose Garden",
    tagline: "A lush mixture of premium roses",
    description:
      "A timeless favorite for special occasions and heartfelt gifting.",
    price: 3500,
    image: flowerImageUrls.wrappedRoses,
    category: "Roses",
    occasion: ["Anniversary", "Romance"],
    colors: ["Pink", "White"],
    rating: 4.9,
    reviews: 267,
    premium: true,
    stock: 16,
    isActive: true,
  },
];

export function resolveImage(row: {
  image_key?: string | null;
  image_url?: string | null;
}) {
  if (row.image_url) return row.image_url;

  if (row.image_key && imageMap[row.image_key]) {
    return imageMap[row.image_key];
  }

  return flowerImageUrls.roseBouquet;
}

type ProductRow = {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  price: number | string;
  image_key: string | null;
  image_url: string | null;
  category: string;
  occasions: string[] | null;
  colors: string[] | null;
  rating: number | string;
  reviews: number;
  premium: boolean;
  stock: number;
  is_active: boolean;
};

export function mapProduct(row: ProductRow): Product {
  return {
    id: row.slug,
    dbId: row.id,
    name: row.name,
    tagline: row.tagline ?? "",
    description: row.description ?? "",
    price: Number(row.price),
    image: resolveImage(row),
    category: row.category,
    occasion: row.occasions ?? [],
    colors: row.colors ?? [],
    rating: Number(row.rating),
    reviews: row.reviews,
    premium: row.premium,
    stock: row.stock,
    isActive: row.is_active,
  };
}

/* -------------------------------------------------------------------------- */
/* Products                                                                    */
/* -------------------------------------------------------------------------- */

export function useProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("products")
        .select(
          "id, slug, name, tagline, description, price, image_key, image_url, category, occasions, colors, rating, reviews, premium, stock, is_active, created_at"
        )
        .eq("is_active", true)
        .order("created_at", { ascending: true });

      if (error) throw error;

      const mapped =
        (data as ProductRow[] | null | undefined)?.map(mapProduct) ?? [];

      setData(mapped.length > 0 ? mapped : fallbackProducts);
    } catch (err) {
      console.warn(
        "[products] Falling back to built-in catalog.",
        err
      );

      setError(err instanceof Error ? err : new Error("Failed to load products"));
      setData(fallbackProducts);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    data,
    loading,
    error,
    refetch: fetchProducts,
  };
}

/* -------------------------------------------------------------------------- */
/* Single Product                                                              */
/* -------------------------------------------------------------------------- */

export function useProduct(slug: string) {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!slug) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setData(mapProduct(data as ProductRow));
      } else {
        setData(
          fallbackProducts.find((product) => product.id === slug) ?? null
        );
      }
    } catch (err) {
      console.warn(
        `[products] Falling back for ${slug}.`,
        err
      );

      setError(err instanceof Error ? err : new Error("Failed to load product"));

      setData(
        fallbackProducts.find((product) => product.id === slug) ?? null
      );
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    data,
    loading,
    error,
    refetch: fetchProduct,
  };
}

/* -------------------------------------------------------------------------- */
/* Create Product                                                              */
/* -------------------------------------------------------------------------- */

export function useCreateProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createProduct = async (
    input: Record<string, unknown>
  ): Promise<Product> => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from("products")
        .insert(input as never)
        .select()
        .single();

      if (error) throw error;

      return mapProduct(data as ProductRow);
    } catch (err) {
      const normalizedError =
        err instanceof Error
          ? err
          : new Error("Failed to create product");

      setError(normalizedError);
      throw normalizedError;
    } finally {
      setLoading(false);
    }
  };

  return {
    createProduct,
    loading,
    error,
  };
}

/* -------------------------------------------------------------------------- */
/* Update Product                                                              */
/* -------------------------------------------------------------------------- */

export function useUpdateProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateProduct = async ({
    id,
    patch,
  }: {
    id: string;
    patch: Record<string, unknown>;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from("products")
        .update(patch as never)
        .eq("id", id);

      if (error) throw error;
    } catch (err) {
      const normalizedError =
        err instanceof Error
          ? err
          : new Error("Failed to update product");

      setError(normalizedError);
      throw normalizedError;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProduct,
    loading,
    error,
  };
}

/* -------------------------------------------------------------------------- */
/* Delete Product                                                              */
/* -------------------------------------------------------------------------- */

export function useDeleteProduct() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const deleteProduct = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) throw error;
    } catch (err) {
      const normalizedError =
        err instanceof Error
          ? err
          : new Error("Failed to delete product");

      setError(normalizedError);
      throw normalizedError;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteProduct,
    loading,
    error,
  };
};

/* -------------------------------------------------------------------------- */
/* Categories                                                                  */
/* -------------------------------------------------------------------------- */

export const categories = [
  { name: "Roses", image: flowerImageUrls.roseGiftBouquet, count: 24 },
  { name: "Peonies", image: flowerImageUrls.mixedBouquet, count: 12 },
  { name: "Lilies", image: flowerImageUrls.mixedBouquet, count: 18 },
  { name: "Wildflowers", image: flowerImageUrls.daisies, count: 21 },
  { name: "Seasonal", image: flowerImageUrls.purpleMumsBouquet, count: 9 },
  { name: "Tulips", image: flowerImageUrls.yellowBouquet, count: 15 },
] as const;

export const occasions = [
  "Romance",
  "Anniversary",
  "Birthday",
  "Thank You",
  "Sympathy",
  "Just Because",
  "Get Well",
  "Congratulations",
  "Housewarming",
];

export const flowerTypes = [
  "Roses",
  "Peonies",
  "Lilies",
  "Wildflowers",
  "Seasonal",
  "Tulips",
] as const;

export const flowerColors = [
  "Pink",
  "Cream",
  "White",
  "Burgundy",
  "Yellow",
  "Orange",
  "Green",
  "Lilac",
];