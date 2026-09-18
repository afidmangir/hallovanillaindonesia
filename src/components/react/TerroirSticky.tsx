import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const STAGES = [
  {
    pill: "From East Java Terroir to Global Cuisine",
    line1: "Grown with Patience,",
    line2: "Cured with Reverence.",
    body: (
      <p className="mx-auto mt-6 max-w-[620px] text-[1.05rem] leading-relaxed text-amber-soft/90">
        Single-origin vanilla from East Java&apos;s rich soil — every bean carries its origin to the world&apos;s kitchens.
      </p>
    ),
  },
  {
    pill: "The Craft",
    line1: "A Few Hours of Bloom,",
    line2: "Weeks of Handwork.",
    body: (
      <>
        <p className="font-serif-display mx-auto mt-6 max-w-[700px] text-[clamp(1.1rem,2.4vw,1.6rem)] italic leading-[1.7] text-amber-soft">
          “Every single vanilla orchid opens for only a few hours in the cool morning mist. That fleeting moment shapes
          weeks of tender artisan handcraft.”
        </p>
        <span className="mt-5 block text-[0.78rem] font-bold uppercase tracking-[0.28em] text-amber-light/80">
          — East Java Highlands
        </span>
      </>
    ),
  },
  {
    pill: "The Character",
    line1: "Deep, Bold &",
    line2: "Unmistakably Real.",
    body: (
      <>
        <div className="mt-8 flex flex-wrap justify-center gap-3 md:gap-4">
          {["Slow Sun Sweating", "Premium Moisture 30-35%", "Rich Natural Vanillin"].map((t) => (
            <div
              key={t}
              className="inline-flex items-center gap-2 rounded-full border border-amber-soft/25 bg-white/10 px-5 py-2.5 text-[0.82rem] font-semibold uppercase tracking-[0.08em] backdrop-blur"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-glow" />
              {t}
            </div>
          ))}
        </div>
        <a
          href="https://wa.me/62881026050105?text=Hello%20hallovanilla%2C%20tell%20me%20about%20your%20terroir."
          target="_blank"
          rel="noopener"
          className="pointer-events-auto mt-8 inline-flex items-center gap-2 rounded-full bg-amber-glow px-8 py-3.5 text-[0.9rem] font-bold text-night-deep transition-all hover:bg-amber-light hover:shadow-[0_10px_30px_rgba(198,139,69,0.45)]"
        >
          Taste the Terroir <span>→</span>
        </a>
      </>
    ),
  },
];

export default function TerroirSticky() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: trackRef });

  // ---- background parallax (sticky) ----
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const wordX = useTransform(scrollYProgress, [0, 1], ["4%", "-22%"]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.75, 0.9]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(v < 0.34 ? 0 : v < 0.66 ? 1 : 2);
  });

  const stage = STAGES[active];

  return (
    <div ref={trackRef} className="relative h-[320vh]">
      {/* ===== STICKY BACKGROUND ===== */}
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden bg-night-deep text-cream">
        <motion.div style={{ scale: bgScale, y: bgY }} className="absolute inset-0 will-change-transform">
          <img src="/hallovanilla3.jpeg" alt="" aria-hidden="true" className="h-full w-full object-cover" loading="lazy" />
        </motion.div>
        <motion.div style={{ opacity: veilOpacity }} className="absolute inset-0 bg-night-deep" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at center, rgba(35,22,14,0.55) 0%, rgba(22,13,7,0.88) 100%)" }}
        />
        {/* kata raksasa parallax */}
        <motion.div
          aria-hidden
          style={{ x: wordX }}
          className="font-serif-display pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 select-none whitespace-nowrap text-[20vw] font-medium italic leading-none text-white/[0.06]"
        >
          HALLOVANILLA — HALLOVANILLA — HALLOVANILLA —
        </motion.div>

        {/* ===== SATU SLOT HEADING — teks berganti per titik dengan slide in/out ===== */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <AnimatePresence>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 90 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -90 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            >
              <span className="mb-5 inline-block rounded-full border border-amber-glow/35 bg-night/45 px-5 py-1.5 text-[0.8rem] font-bold uppercase tracking-[0.25em] text-amber-light backdrop-blur">
                {stage.pill}
              </span>
              <h2 className="font-serif-display text-[clamp(2.2rem,4.6vw,3.8rem)] font-medium leading-tight">
                {stage.line1}
                <br />
                {stage.line2}
              </h2>
              {stage.body}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ===== indikator progres: titik saja ===== */}
        <div className="absolute right-5 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-3.5 md:right-10">
          <div className="relative mb-1 h-28 w-[3px] overflow-hidden rounded-full bg-white/15">
            <motion.div style={{ scaleY: scrollYProgress }} className="h-full w-full origin-top bg-amber-glow" />
          </div>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${i === active ? "scale-125 bg-amber-glow" : "bg-white/30"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
