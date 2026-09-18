import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function TerroirSticky() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({ target: trackRef });

  // ---- background parallax (sticky) ----
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const wordX = useTransform(scrollYProgress, [0, 1], ["4%", "-22%"]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.75, 0.9]);

  // ---- panel storytelling ----
  const p1Opacity = useTransform(scrollYProgress, [0, 0.06, 0.24, 0.32], [0, 1, 1, 0]);
  const p1Y = useTransform(scrollYProgress, [0, 0.06, 0.32], [80, 0, -80]);
  const p2Opacity = useTransform(scrollYProgress, [0.3, 0.38, 0.58, 0.66], [0, 1, 1, 0]);
  const p2Y = useTransform(scrollYProgress, [0.3, 0.38, 0.66], [80, 0, -80]);
  const p3Opacity = useTransform(scrollYProgress, [0.64, 0.72, 1], [0, 1, 1]);
  const p3Y = useTransform(scrollYProgress, [0.64, 0.72], [80, 0]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(v < 0.33 ? 0 : v < 0.64 ? 1 : 2);
  });

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

        {/* indikator progres samping */}
        <div className="absolute right-5 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-3 md:right-10">
          <div className="relative h-28 w-[3px] overflow-hidden rounded-full bg-white/15">
            <motion.div style={{ scaleY: scrollYProgress }} className="h-full w-full origin-top bg-amber-glow" />
          </div>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${i === active ? "scale-125 bg-amber-glow" : "bg-white/30"}`}
            />
          ))}
        </div>

        {/* ===== FOREGROUND PANELS ===== */}
        <div className="pointer-events-none absolute inset-0 z-10">
          {/* Panel 1 */}
          <motion.div style={{ opacity: p1Opacity, y: p1Y }} className="flex h-screen flex-col items-center justify-center px-6 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="mb-5 inline-block rounded-full border border-amber-glow/35 bg-night/45 px-5 py-1.5 text-[0.8rem] font-bold uppercase tracking-[0.25em] text-amber-light backdrop-blur"
            >
              From East Java Terroir to Global Cuisine
            </motion.span>
            <h2 className="font-serif-display text-[clamp(2.6rem,5vw,4.2rem)] font-medium leading-tight">
              Grown with Patience,
              <br />
              Cured with Reverence.
            </h2>
            <div className="mt-8 flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.25em] text-amber-light/80">
              <motion.span animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>↓</motion.span>
              Keep scrolling
            </div>
          </motion.div>

          {/* Panel 2 */}
          <motion.div style={{ opacity: p2Opacity, y: p2Y }} className="flex h-screen flex-col items-center justify-center px-6 text-center">
            <span className="font-serif-display text-6xl leading-none text-amber-glow">“</span>
            <p className="font-serif-display mx-auto -mt-2 max-w-[760px] text-[clamp(1.4rem,3vw,2.2rem)] italic leading-[1.7] text-amber-soft">
              Every single vanilla orchid opens for only a few hours in the cool morning mist. That fleeting moment shapes
              weeks of tender artisan handcraft.
            </p>
            <span className="mt-6 text-[0.78rem] font-bold uppercase tracking-[0.28em] text-amber-light/80">
              — East Java Highlands
            </span>
          </motion.div>

          {/* Panel 3 */}
          <motion.div style={{ opacity: p3Opacity, y: p3Y }} className="flex h-screen flex-col items-center justify-center px-6 text-center">
            <div className="flex flex-wrap justify-center gap-4">
              {["Slow Sun Sweating", "Premium Moisture 30-35%", "Rich Natural Vanillin"].map((t, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="inline-flex items-center gap-2 rounded-full border border-amber-soft/25 bg-white/10 px-5 py-2.5 text-[0.82rem] font-semibold uppercase tracking-[0.08em] backdrop-blur transition hover:border-amber-glow hover:bg-white/15"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-glow" />
                  {t}
                </motion.div>
              ))}
            </div>
            <a
              href="https://wa.me/62881026050105?text=Hello%20hallovanilla%2C%20tell%20me%20about%20your%20terroir."
              target="_blank"
              rel="noopener"
              className="pointer-events-auto mt-10 inline-flex items-center gap-2 rounded-full bg-amber-glow px-8 py-3.5 text-[0.9rem] font-bold text-night-deep transition-all hover:bg-amber-light hover:shadow-[0_10px_30px_rgba(198,139,69,0.45)]"
            >
              Taste the Terroir <span>→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
