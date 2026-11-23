import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Truck,  Heart,  Flower2,  Star,} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { useProducts, categories, flowerImageUrls } from "@/lib/products";
import AccordionGallery from "@/components/ui/accordionGallery";

const testimonials = [
  {
    name: "Amara J.",
    quote:
      "The peonies arrived looking like they were just picked. My mom cried.",
    role: "Birthday gift",
  },
  {
    name: "Marcus O.",
    quote:
      "Same-day delivery actually worked. Bouquet was gorgeous. New go-to.",
    role: "Anniversary",
  },
  {
    name: "Lena P.",
    quote:
      "The custom bouquet builder is magic. Felt so personal.",
    role: "Just because",
  },
];

const steps = [
  {
    icon: Flower2,
    title: "Choose your bloom",
    desc: "Browse curated bouquets or build your own.",
  },
  {
    icon: Heart,
    title: "Add a note",
    desc: "Personal card, wrapping, delivery date.",
  },
  {
    icon: Truck,
    title: "Same-day delivery",
    desc: "Hand-tied and delivered by local florists.",
  },
];


export default function Home() {
  const { data: products = [] } = useProducts();
  

  const featured = products.slice(0, 3);
  const bestSellers = products.slice(2, 6);

  return (
    <div>
{/* HERO */}
<section className="relative overflow-hidden pt-[110px]">
  <div className="absolute inset-0 bloom-gradient" />

  <div className="relative mx-auto grid min-h-[calc(100vh-110px)] max-w-7xl grid-cols-2 items-center gap-12 px-8 lg:gap-16 lg:px-8">

    {/* Hero content */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="flex flex-col justify-center"
    >
      <h1 className="font-display text-4xl leading-[1.02] text-olive sm:text-5xl lg:text-6xl xl:text-7xl">
        Beautiful flowers{" "}
        <em className="italic text-deep-rose">
          for every moment.
        </em>
      </h1>

      <p className="mt-5 max-w-xl text-base leading-relaxed text-espresso/70 lg:text-lg">
        Hand-tied bouquets, custom arrangements, and same-day
        delivery from local florists. Because the best moments
        deserve to bloom.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          asChild
          size="lg"
          className="rounded-full bg-olive px-8 text-white hover:bg-deep-olive"
        >
          <Link to="/shop">
            Shop flowers
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>

        <Button
          asChild
          size="lg"
          variant="outline"
          className="rounded-full border-olive/30 bg-white/70 px-8 text-olive hover:bg-white"
        >
          <Link to="/custom">
            Create custom bouquet
          </Link>
        </Button>
      </div>

      <div className="mt-6 flex items-center gap-6 text-sm text-espresso/60">
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-gold text-gold"
              />
            ))}
          </div>

          <span className="font-medium text-espresso">
            4.9
          </span>

          <span>· 2,400+ reviews</span>
        </div>
      </div>
    </motion.div>

    {/* Hero image */}
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.9,
        delay: 0.1,
      }}
      className="relative flex min-h-[calc(100vh-150px)] items-center justify-center"
    >
      <div className="relative h-[calc(100vh-150px)] max-h-[700px] w-full overflow-hidden rounded-[2.5rem] shadow-petal">
        <img
          src={flowerImageUrls.luxuryRoseBouquet}
          alt="Red roses arranged with a gift"
          className="h-full w-full object-cover"
          width={960}
          height={1280}
        />
      </div>
    </motion.div>

  </div>
</section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-deep-rose">
              Categories
            </p>

            <h2 className="mt-2 font-display text-4xl text-olive">
              Shop by bloom
            </h2>
          </div>

          <Link
            to="/shop"
            className="hidden text-sm font-medium text-deep-rose hover:underline sm:inline"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.4,
                delay: i * 0.05,
              }}
            >
              <Link
                to="/shop"
                className="group block overflow-hidden rounded-2xl bg-card transition hover:shadow-soft"
              >
                <div className="aspect-square overflow-hidden bloom-gradient">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-3 text-center">
                  <p className="font-display text-base text-espresso">
                    {cat.name}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {cat.count} bouquets
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="bg-blush/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs uppercase tracking-widest text-deep-rose">
              Featured
            </p>

            <h2 className="mt-2 font-display text-4xl text-olive sm:text-5xl">
              This week's most-loved
            </h2>
          </div>
          <AccordionGallery
            items={featured.map((product) => ({
              image: product.image,
              label: product.name,
              link: `/shop/${product.id}`,
              alt: product.name,
            }))}
            defaultIndex={0}
            expandRatio={0.52}
            trigger="hover"
            accentColor="#ffffff"
            overlayColor="#3A2420"
            textColor="#ffffff"
            grayscale={false}
            showLabels
            duration={0.6}
            ease="power3.out"
            parallax={0.5}
            tilt={8}
            stagger={0.06}
            height={460}
            gap={10}
            radius={16}
            orientation="horizontal"
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-widest text-deep-rose">
            How it works
          </p>

          <h2 className="mt-2 font-display text-4xl text-olive sm:text-5xl">
            From bloom to doorstep
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
                className="relative rounded-3xl border border-border/60 bg-card p-8 text-center"
              >
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bloom-gradient">
                  <Icon className="h-6 w-6 text-olive" />
                </div>

                <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">
                  Step {i + 1}
                </p>

                <h3 className="mt-1 font-display text-2xl text-espresso">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-deep-rose">
              Best sellers
            </p>

            <h2 className="mt-2 font-display text-4xl text-olive">
              Loved by everyone
            </h2>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
            />
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-olive py-20 text-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-widest text-soft-pink">
              Kind words
            </p>

            <h2 className="mt-2 font-display text-4xl sm:text-5xl">
              From people who bloomed
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, i) => (
              <motion.blockquote
                key={testimonial.name}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                }}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
              >
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-gold text-gold"
                    />
                  ))}
                </div>

                <p className="font-display text-xl leading-snug">
                  "{testimonial.quote}"
                </p>

                <footer className="mt-6 text-sm">
                  <span className="font-semibold">
                    {testimonial.name}
                  </span>

                  <span className="text-soft-pink/70">
                    {" "}
                    · {testimonial.role}
                  </span>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-widest text-deep-rose">
          Newsletter
        </p>

        <h2 className="mt-2 font-display text-4xl text-olive sm:text-5xl">
          Seasonal blooms, monthly.
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
          Get 10% off your first order plus early access to
          seasonal collections.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-8 flex max-w-md flex-col gap-2 sm:flex-row"
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            className="flex-1 rounded-full border border-border bg-card px-5 py-3 text-sm outline-none focus:border-rose focus:ring-2 focus:ring-rose/20"
          />

          <Button
            type="submit"
            size="lg"
            className="rounded-full bg-olive px-8 text-white hover:bg-deep-olive"
          >
            Subscribe
          </Button>
        </form>
      </section>
    </div>
  );
}