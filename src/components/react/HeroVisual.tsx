import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { useHalloReady } from "./useHalloReady";

export default function HeroVisual() {
  // Tahan entrance sampai loading veil selesai terangkat
  const ready = useHalloReady();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 120, damping: 16 });
  const sy = useSpring(my, { stiffness: 120, damping: 16 });
  const rotateX = useTransform(sy, [0, 1], [7, -7]);
  const rotateY = useTransform(sx, [0, 1], [-9, 9]);
  const imgX = useTransform(sx, [0, 1], [-12, 12]);
  const imgY = useTransform(sy, [0, 1], [-10, 10]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      initial={{ opacity: 0, scale: 0.92, y: 40 }}
      animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      className="relative mx-auto w-full max-w-[500px]"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[4/5] overflow-hidden rounded-[26px] border border-amber-glow/25 bg-night shadow-[0_20px_45px_rgba(30,19,11,0.12)]"
      >
        <motion.img
          src="/hallovanilla4.jpeg"
          alt="Gourmet Cured Vanilla Beans — hallovanilla"
          className="h-full w-full object-cover"
          style={{ x: imgX, y: imgY, scale: 1.12 }}
          initial={{ scale: 1.25 }}
          animate={ready ? { scale: 1.12 } : {}}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-night-deep/90 via-night-deep/10 to-transparent p-8 text-white">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="mb-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-amber-light"
          >
            Curated Selection
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 18 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.72 }}
            className="font-serif-display text-[1.6rem] font-medium leading-tight"
          >
            Gourmet Grade Vanilla Pods
          </motion.h3>
        </div>
        {/* rotating seal */}
        <motion.div
          className="absolute right-5 top-5 grid h-20 w-20 place-items-center"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <path id="circ" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" />
            </defs>
            <circle cx="50" cy="50" r="48" fill="rgba(22,13,7,0.72)" stroke="rgba(212,154,86,0.5)" />
            <text fill="#F3DEC2" fontSize="10.5" letterSpacing="2.5" fontWeight="700">
              <textPath href="#circ">PURE VANILLA • SURABAYA • GRADE A •</textPath>
            </text>
            <text x="50" y="58" textAnchor="middle" fill="#D49A56" fontSize="22">★</text>
          </svg>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -16, scale: 0.9 }}
        animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 18 }}
        className="absolute -top-4 -right-3 md:-right-5"
      >
        <motion.div
          animate={{ y: [0, -9, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
          className="flex items-center gap-3.5 rounded-2xl border border-amber-glow/25 bg-white/95 p-4 pr-5 shadow-lg backdrop-blur-md"
        >
          <div className="grid h-11 w-11 place-items-center rounded-full bg-tint text-xl text-toffee">★</div>
          <div>
            <strong className="block text-[0.85rem] text-cocoa">Patient Curing</strong>
            <span className="text-xs text-muted">Sweated &amp; slow-conditioned</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.9 }}
        animate={ready ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: 0.65, type: "spring", stiffness: 200, damping: 18 }}
        className="absolute -bottom-4 -left-3 md:-left-5"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.6 }}
          className="flex items-center gap-3 rounded-2xl border border-white/15 bg-night px-5 py-3.5 text-white shadow-[0_24px_60px_rgba(15,8,4,0.55)]"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute h-full w-full animate-ping rounded-full bg-[#25D366]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#25D366] shadow-[0_0_10px_#25D366]" />
          </span>
          <span className="text-[0.8rem] tracking-wide">
            Hub: <strong className="text-amber-light">Surabaya, Indonesia</strong>
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
