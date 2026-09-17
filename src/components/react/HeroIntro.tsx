import { motion, type Variants } from "framer-motion";
import { useHalloReady } from "./useHalloReady";
import WaIcon from "./WaIcon";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(6px)" },
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

export default function HeroIntro() {
  // Tahan entrance sampai loading veil selesai terangkat
  const ready = useHalloReady();
  return (
    <motion.div variants={container} initial="hidden" animate={ready ? "show" : "hidden"} className="max-w-[600px]">
      <motion.div
        variants={item}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-glow/30 bg-amber-glow/10 px-4 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-amber-deep"
      >
        <span className="animate-pulse-dot h-[7px] w-[7px] rounded-full bg-amber-glow shadow-[0_0_10px_#C68B45]" />
        Indonesian Vanilla • Surabaya
      </motion.div>

      <motion.h1
        variants={item}
        className="font-serif-display text-[clamp(3rem,5.5vw,5rem)] font-medium leading-[1.05] tracking-tight"
      >
        Pure aroma.
        <br />
        <motion.em
          variants={emItem}
          className="inline-block font-normal text-toffee"
        >
          Real
        </motion.em>{" "}
        vanilla.
      </motion.h1>

      <motion.p variants={item} className="mb-9 mt-6 max-w-[530px] text-[1.1rem] leading-relaxed text-muted">
        Discover carefully selected vanilla beans with distinctive character — from classic, creamy Vanilla Planifolia
        to elegant, floral Tahitian Vanilla and pure Vanilla Powder.
      </motion.p>

      <motion.div variants={item} className="mb-12 flex flex-wrap items-center gap-4">
        <motion.a
          href={WA}
          target="_blank"
          rel="noopener"
          whileHover={{ y: -3, scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-pod px-8 py-4 text-[0.95rem] font-semibold text-cream shadow-[0_10px_25px_rgba(35,23,14,0.28)] transition-colors hover:bg-[#3B2618]"
        >
          <WaIcon size={18} />
          <span>Ask via WhatsApp</span>
        </motion.a>
        <motion.a
          href="#products"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-7 py-4 text-[0.95rem] font-semibold shadow-sm transition-colors hover:border-amber-glow hover:text-amber-deep"
        >
          <span>Explore Our Vanilla</span>
          <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            ↓
          </motion.span>
        </motion.a>
      </motion.div>

      <motion.div variants={item} className="grid max-w-[500px] grid-cols-3 gap-6 border-t border-line pt-8">
        {[
          { v: "Grade A", l: "Gourmet Selection" },
          { v: "100%", l: "Natural Curing" },
          { v: "Surabaya", l: "Direct Distribution" },
        ].map((s) => (
          <motion.div key={s.v} variants={item}>
            <h4 className="font-serif-display text-3xl font-semibold text-toffee">{s.v}</h4>
            <p className="text-[0.75rem] uppercase tracking-wide text-muted">{s.l}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
