const tips = [
  {
    title: "Trim the stems",
    desc: "Cut 1–2 cm off the bottom at a 45° angle every 2–3 days to help water absorption.",
  },
  {
    title: "Fresh, cool water",
    desc: "Change the vase water every 2 days and keep flowers away from direct sun and heat.",
  },
  {
    title: "Remove leaves below water",
    desc: "Leaves in water accelerate bacteria — strip anything below the waterline.",
  },
  {
    title: "Feed your blooms",
    desc: "Use the flower food sachet included with your bouquet, or a pinch of sugar.",
  },
  {
    title: "Mind the neighbors",
    desc: "Keep flowers away from ripening fruit — the ethylene gas shortens their life.",
  },
];

export default function CareGuidePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-widest text-[color:var(--rose)]">
        Care guide
      </p>

      <h1 className="mt-2 font-display text-5xl text-[color:var(--burgundy)]">
        Keep your blooms beautiful.
      </h1>

      <p className="mt-4 text-lg text-muted-foreground">
        A little care goes a long way. Follow these simple steps and most
        bouquets will last 7–10 days.
      </p>

      <ol className="mt-12 space-y-6">
        {tips.map((tip, index) => (
          <li
            key={tip.title}
            className="flex gap-5 rounded-3xl border border-border bg-card p-6"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[color:var(--burgundy)] font-display text-lg text-primary-foreground">
              {index + 1}
            </span>

            <div>
              <h2 className="font-display text-2xl text-foreground">
                {tip.title}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                {tip.desc}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}