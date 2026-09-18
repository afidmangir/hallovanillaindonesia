import { motion, type Variants } from "framer-motion";
import { useHalloReady } from "./useHalloReady";
import WaIcon from "./WaIcon";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const emItem: Variants = {
  hidden: { opacity: 0, x: -18, skewX: -6 },
  show: {
    opacity: 1,
    x: 0,
    skewX: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const WA_QUOTE =
  "https://wa.me/62881026050105?text=Hello%20hallovanilla.indonesia%2C%20I%20would%20like%20to%20request%20an%20export%20quotation%20for%20vanilla%20beans.";

const POINTS = ["Grade A gourmet lots", "Vacuum-sealed export pack", "Direct Surabaya hub"];

const STATS = [
  { v: "Grade A", l: "Gourmet Lots" },
  { v: "30–35%", l: "Ideal Moisture" },
  { v: "Bulk", l: "Wholesale Supply" },
];

export default function HeroIntro() {
  // Tahan entrance sampai loading veil selesai terangkat
  const ready = useHalloReady();
  return (
    <motion.div variants={container} initial="hidden" animate={ready ? "show" : "hidden"} className="max-w-[640px]">
      <motion.div
        variants={item}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-glow/30 bg-amber-glow/10 px-4 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-amber-deep"
      >
        <span className="animate-pulse-dot h-[7px] w-[7px] rounded-full bg-amber-glow shadow-[0_0_10px_#C68B45]" />
        Indonesian Vanilla • Surabaya
      </motion.div>

      <motion.h1
        variants={item}
        className="font-serif-display text-[clamp(3.2rem,6vw,5.5rem)] font-medium leading-[1.02] tracking-tight text-pod"
      >
        Pure aroma.
        <br />
        <motion.em
          variants={emItem}
          className="inline-block font-normal italic text-toffee"
        >
          Real
        </motion.em>{" "}
        vanilla.
      </motion.h1>

      <motion.p variants={item} className="mb-7 mt-5 max-w-[530px] text-[1.1rem] leading-relaxed text-muted">
        Discover carefully selected vanilla beans with distinctive character — from classic, creamy Vanilla Planifolia
        to elegant, floral Tahitian Vanilla.
      </motion.p>

      <motion.ul variants={item} className="mb-9 flex flex-wrap gap-x-6 gap-y-2.5">
        {POINTS.map((t) => (
          <li key={t} className="inline-flex items-center gap-2 text-[0.9rem] font-medium text-pod">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-amber-glow/15 text-[0.7rem] font-bold text-amber-deep">
              ✓
            </span>
            {t}
          </li>
        ))}
      </motion.ul>

      <motion.div variants={item} className="mb-11 flex flex-wrap items-center gap-4">
        <motion.a
          href={WA_QUOTE}
          target="_blank"
          rel="noopener"
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2.5 rounded-full bg-pod px-8 py-4 text-[0.95rem] font-semibold text-cream shadow-[0_14px_30px_rgba(35,23,14,0.30)] transition-colors hover:bg-[#3B2618]"
        >
          <WaIcon size={18} />
          <span>Request Export Quotation</span>
        </motion.a>
        <motion.a
          href="#products"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-[0.95rem] font-semibold text-pod shadow-[0_8px_24px_rgba(35,23,14,0.08)] transition-all hover:text-amber-deep hover:shadow-[0_12px_30px_rgba(198,139,69,0.25)]"
        >
          <span>Explore Varieties</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="text-amber-deep transition-transform group-hover:translate-y-0.5"
          >
            ↓
          </motion.span>
        </motion.a>
      </motion.div>

      <motion.div variants={item} className="grid max-w-[520px] grid-cols-3 divide-x divide-line border-t border-line pt-7">
        {STATS.map((s, i) => (
          <motion.div key={s.v} variants={item} className={i === 0 ? "pr-6" : "px-6"}>
            <div className="font-serif-display text-[1.65rem] font-semibold leading-none text-pod">
              {s.v}
            </div>
            <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">{s.l}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
