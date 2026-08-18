const faqs = [
  {
    q: "How do I place an order?",
    a: "Browse the shop, pick a bouquet, choose a size and delivery date, and check out. It takes about a minute.",
  },
  {
    q: "What areas do you deliver to?",
    a: "We deliver across the metro area and select suburbs. Enter your zip code at checkout to confirm.",
  },
  {
    q: "Can I schedule a delivery in advance?",
    a: "Yes — pick any date up to 60 days ahead when you check out.",
  },
  {
    q: "How long will my flowers last?",
    a: "Most bouquets last 7–10 days with proper care. See our care guide for tips.",
  },
  {
    q: "Can I customize a bouquet?",
    a: "Absolutely. Use the Custom Bouquet builder to pick blooms, colors, and wrapping.",
  },
  {
    q: "What is your refund policy?",
    a: "If you're not happy, contact us within 24 hours of delivery and we'll refund or replace your order.",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-widest text-[color:var(--rose)]">
        FAQ
      </p>

      <h1 className="mt-2 font-display text-5xl text-[color:var(--burgundy)]">
        Questions, answered.
      </h1>

      <p className="mt-4 text-muted-foreground">
        Everything you need to know about ordering, delivery, bouquets, and
        caring for your flowers.
      </p>

      <div className="mt-12 space-y-4">
        {faqs.map((faq) => (
          <details
            key={faq.q}
            className="group rounded-3xl border border-border bg-card p-6 transition open:shadow-soft"
          >
            <summary className="cursor-pointer list-none font-display text-xl text-foreground">
              <span className="flex items-center justify-between gap-4">
                <span>{faq.q}</span>

                <span className="shrink-0 text-2xl font-light text-[color:var(--rose)] transition-transform duration-200 group-open:rotate-45">
                  +
                </span>
              </span>
            </summary>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}