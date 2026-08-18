import { Truck, Clock, MapPin, Package } from "lucide-react";

const items = [
  {
    icon: Clock,
    title: "Same-day delivery",
    desc: "Order before 2 PM for delivery between 4–8 PM the same day.",
  },
  {
    icon: MapPin,
    title: "Local coverage",
    desc: "We deliver across the metro area and select suburbs. Enter your delivery location at checkout.",
  },
  {
    icon: Package,
    title: "Careful handling",
    desc: "Every bouquet is hand-tied, hydrated, and boxed to arrive fresh.",
  },
  {
    icon: Truck,
    title: "Scheduled delivery",
    desc: "Pick any date up to 60 days ahead — perfect for birthdays and anniversaries.",
  },
];

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-[color:var(--cream)]">
      {/* Hero */}
      <section className="bloom-gradient">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[color:var(--deep-rose)]">
            Delivery
          </p>

          <h1 className="mt-3 font-display text-5xl leading-tight text-[color:var(--deep-olive)] sm:text-6xl">
            From our florists to your door.
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[color:var(--espresso)]/75">
            Fresh flowers, delivered the same day by local florists who care
            as much about the arrangement as you do.
          </p>
        </div>
      </section>

      {/* Delivery Options */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="
                  rounded-3xl
                  border
                  border-[color:var(--border)]
                  bg-[color:var(--card)]
                  p-7
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:shadow-[var(--shadow-soft)]
                "
              >
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[color:var(--secondary)]">
                  <Icon className="h-5 w-5 text-[color:var(--deep-olive)]" />
                </div>

                <h2 className="mt-5 font-display text-2xl text-[color:var(--deep-olive)]">
                  {item.title}
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-[color:var(--muted-foreground)]">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Pricing */}
        <div className="mt-12 overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--secondary)]/60">
          <div className="p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--deep-rose)]">
              Delivery rates
            </p>

            <h2 className="mt-2 font-display text-3xl text-[color:var(--deep-olive)]">
              Delivery pricing
            </h2>

            <div className="mt-6 divide-y divide-[color:var(--border)]">
              <div className="flex items-center justify-between py-4 text-sm">
                <span className="text-[color:var(--espresso)]">
                  Standard delivery
                </span>

                <span className="font-semibold text-[color:var(--deep-olive)]">
                  KSh 800
                </span>
              </div>

              <div className="flex items-center justify-between py-4 text-sm">
                <span className="text-[color:var(--espresso)]">
                  Same-day delivery
                </span>

                <span className="font-semibold text-[color:var(--deep-olive)]">
                  KSh 1,400
                </span>
              </div>

              <div className="flex items-center justify-between py-4 text-sm">
                <span className="text-[color:var(--espresso)]">
                  Orders over KSh 7,500
                </span>

                <span className="font-semibold text-[color:var(--deep-rose)]">
                  Free
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom information */}
        <div className="mt-8 rounded-3xl bg-[color:var(--deep-olive)] p-8 text-white">
          <div className="flex gap-4">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10">
              <Truck className="h-5 w-5 text-[color:var(--soft-pink)]" />
            </div>

            <div>
              <h3 className="font-display text-2xl">
                Freshness guaranteed
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-white/75">
                Every Blumora bouquet is prepared shortly before dispatch,
                carefully hydrated, and packaged to help it arrive looking
                fresh and beautiful.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}