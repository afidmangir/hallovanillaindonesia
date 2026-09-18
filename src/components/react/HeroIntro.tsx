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

const WA =
  "https://wa.me/62881026050105?text=Hello%20hallovanilla.indonesia%2C%20I%20would%20like%20to%20ask%20about%20your%20vanilla%20beans.";

const POINTS = ["Grade A gourmet pods", "Slow natural curing", "Vacuum-sealed export pack"];

const STATS = [
  { v: "Grade A", l: "Gourmet Selection" },
  { v: "30–35%", l: "Ideal Moisture" },
  { v: "Surabaya", l: "Direct Distribution" },
];

export default function HeroIntro() {
  // Tahan entrance sampai loading veil selesai terangkat
  const ready = useHalloReady();
  return (
    <motion.div variants={container} initial="hidden" animate={ready ? "show" : "hidden"} className="max-w-[600px]">
      <motion.div
        variants={item}
        className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-white py-1.5 pl-2 pr-4 shadow-[0_8px_24px_rgba(35,23,14,0.10)]"
      >
        <span className="inline-flex items-center gap-1.5 rounded-full bg-pod px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-cream">
          <span className="animate-pulse-dot h-[6px] w-[6px] rounded-full bg-amber-glow" />
          Single Origin
        </span>
        <span className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-muted">
          Surabaya • Indonesia
        </span>
      </motion.div>

      <motion.h1
        variants={item}
        className="font-serif-display max-w-[12ch] text-balance text-[clamp(2.9rem,5.2vw,4.75rem)] font-medium leading-[1.04] tracking-tight text-pod"
      >
        Pure aroma.{" "}
        <motion.em variants={emItem} className="inline-block font-normal italic text-toffee">
          Real
        </motion.em>{" "}
        vanilla.
      </motion.h1>

      <motion.p variants={item} className="mb-7 mt-5 max-w-[530px] text-[1.05rem] leading-relaxed text-muted">
        Carefully selected vanilla beans with distinctive character — from classic, creamy Vanilla Planifolia
        to elegant, floral Tahitian Vanilla and pure Vanilla Powder.
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
          href={WA}
          target="_blank"
          rel="noopener"
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2.5 rounded-full bg-pod px-8 py-4 text-[0.95rem] font-semibold text-cream shadow-[0_14px_30px_rgba(35,23,14,0.30)] transition-colors hover:bg-[#3B2618]"
        >
          <WaIcon size={18} />
          <span>Ask via WhatsApp</span>
        </motion.a>
        <motion.a
          href="#products"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-[0.95rem] font-semibold text-pod shadow-[0_8px_24px_rgba(35,23,14,0.08)] transition-all hover:text-amber-deep hover:shadow-[0_12px_30px_rgba(198,139,69,0.25)]"
        >
          <span>Explore Our Vanilla</span>
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
