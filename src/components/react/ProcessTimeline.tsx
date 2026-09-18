import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    n: "01",
    t: "Pollination",
    d: "Each vanilla flower opens for only one day and is pollinated by hand with care.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
        <circle cx="12" cy="12" r="2.4" />
        <ellipse cx="12" cy="6.2" rx="2.2" ry="3" />
        <ellipse cx="12" cy="17.8" rx="2.2" ry="3" />
        <ellipse cx="6.2" cy="12" rx="3" ry="2.2" />
        <ellipse cx="17.8" cy="12" rx="3" ry="2.2" />
      </svg>
    ),
  },
  {
    n: "02",
    t: "Maturation",
    d: "Pods grow on the vine for several months until full maturity before harvesting.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
        <path d="M12 21c-5 0-8-3.5-8-9 0-4 2.5-7 5-8.5C10 5 11 6.5 12 6.5c2.5 0 3-2.5 3-2.5 3 2 5 5.5 5 9 0 5.5-3 8-8 8Z" strokeLinejoin="round" />
        <path d="M12 21V9" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: "03",
    t: "Curing",
    d: "Scalding, sweating, and slow sun-drying help vanillin develop naturally.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2.6M12 18.9v2.6M2.5 12h2.6M18.9 12h2.6M5 5l1.8 1.8M17.2 17.2 19 19M19 5l-1.8 1.8M6.8 17.2 5 19" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    n: "04",
    t: "Selection",
    d: "Beans are sorted for aroma, length, and moisture before reaching your kitchen.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-6 w-6">
        <path d="m5 12.5 4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function ProcessTimeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });

  return (
    <div ref={trackRef} className="relative mt-14">
      {/* garis trek + garis progres */}
      <div aria-hidden className="absolute bottom-4 left-[27px] top-2 w-[3px] -translate-x-1/2 rounded-full bg-line md:left-1/2">
        <motion.div style={{ scaleY: lineScale }} className="h-full w-full origin-top rounded-full bg-gradient-to-b from-amber-light via-amber-glow to-amber-deep" />
      </div>

      <div className="flex flex-col gap-10 md:gap-14">
        {STEPS.map((s, i) => {
          const left = i % 2 === 0;
          return (
            <div key={s.n} className="relative flex items-start gap-5 pl-0 md:items-center md:gap-0 md:pl-0">
              {/* titik node */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                className="absolute left-[27px] top-8 z-10 -translate-x-1/2 md:left-1/2 md:top-1/2 md:-translate-y-1/2"
              >
                <motion.div
                  animate={{ boxShadow: ["0 0 0 0 rgba(198,139,69,0.5)", "0 0 0 14px rgba(198,139,69,0)"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: i * 0.4 }}
                  className="grid h-12 w-12 place-items-center rounded-full border border-amber-glow/50 bg-white text-amber-deep shadow-[0_8px_24px_rgba(198,139,69,0.35)]"
                >
                  {s.icon}
                </motion.div>
              </motion.div>

              {/* kartu */}
              <motion.div
                initial={{ opacity: 0, x: 0, y: 50, rotate: left ? -1.5 : 1.5 }}
                whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.8, ease }}
                whileHover={{ y: -8, rotate: left ? -0.6 : 0.6, transition: { duration: 0.3 } }}
                className={`group ml-16 flex-1 md:ml-0 md:w-[calc(50%-4rem)] md:grow-0 ${
                  left ? "md:mr-auto md:text-right" : "md:ml-auto"
                }`}
              >
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white p-8 shadow-sm transition-shadow duration-500 hover:border-amber-glow hover:shadow-[0_20px_45px_rgba(30,19,11,0.15)]">
                  {/* nomor latar raksasa */}
                  <span
                    aria-hidden
                    className={`font-serif-display pointer-events-none absolute -top-4 select-none text-[6rem] font-bold leading-none text-sand transition-colors duration-500 group-hover:text-amber-glow/20 ${
                      left ? "right-4" : "left-4"
                    }`}
                  >
                    {s.n}
                  </span>
                  <div className={`relative mb-1 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-toffee`}>Step {s.n}</div>
                  <h4 className="font-serif-display relative mb-3 text-2xl font-semibold text-pod">{s.t}</h4>
                  <p className="relative text-[0.9rem] leading-relaxed text-muted">{s.d}</p>
                  {/* bar animasi */}
                  <div className={`relative mt-auto flex gap-1.5 pt-6 ${left ? "md:flex-row-reverse" : ""}`}>
                    {[0, 1, 2].map((b) => (
                      <motion.div
                        key={b}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + b * 0.15, duration: 0.6, ease }}
                        className="h-1 flex-1 origin-left rounded bg-gradient-to-r from-amber-glow to-amber-deep"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* spacer sisi berlawanan (desktop) */}
              <div aria-hidden className="hidden flex-1 md:block" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
