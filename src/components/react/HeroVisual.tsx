import { motion, AnimatePresence, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useHalloReady } from "./useHalloReady";

const SLIDES = [
  { src: "/hallovanilla4.jpeg", alt: "Gourmet Cured Vanilla Beans — hallovanilla" },
  { src: "/hallovanilla1.jpeg", alt: "Vanilla orchid vine and growing beans — hallovanilla" },
  { src: "/hallovanilla2.jpeg", alt: "Lush vanilla plantation — hallovanilla" },
  { src: "/hallovanilla3.jpeg", alt: "Artisan curing and sun-sweating — hallovanilla" },
];

const SLIDE_MS = 5000;

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

  // Parallax scroll: gambar melayang bergerak beda kecepatan saat halaman di-scroll
  const { scrollY } = useScroll();
  const mainY = useTransform(scrollY, [0, 700], [0, 55]);
  const floatAY = useTransform(scrollY, [0, 700], [0, -85]);
  const floatARotate = useTransform(scrollY, [0, 700], [-6, 0]);
  const floatBY = useTransform(scrollY, [0, 700], [0, 95]);
  const floatBRotate = useTransform(scrollY, [0, 700], [6, 12]);

  // Slideshow fade — jalan setelah veil terangkat
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    SLIDES.forEach((s) => {
      const im = new Image();
      im.src = s.src;
    });
  }, []);
  useEffect(() => {
    if (!ready) return;
    const t = setInterval(() => setSlide((i) => (i + 1) % SLIDES.length), SLIDE_MS);
    return () => clearInterval(t);
  }, [ready]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  return (
    <motion.div style={{ y: mainY }} className="relative mx-auto w-full max-w-[520px]">
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
      className="relative w-full"
    >
      {/* cahaya lembut di belakang foto */}
      <div aria-hidden className="absolute -inset-10 rounded-full bg-gradient-to-br from-amber-glow/25 via-amber-glow/10 to-transparent blur-3xl" />
      {/* bingkai arch offset */}
      <div aria-hidden className="absolute -inset-3 rotate-2 rounded-b-[30px] rounded-t-[230px] border border-amber-glow/30" />
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative aspect-[4/5] overflow-hidden rounded-b-[26px] rounded-t-[220px] border border-amber-glow/25 bg-night shadow-[0_20px_45px_rgba(30,19,11,0.12)]"
      >
        {/* slideshow fade + parallax (skala 1.12 menutup tepi saat tilt) */}
        <motion.div style={{ x: imgX, y: imgY }} className="absolute inset-0">
          <div className="h-full w-full scale-[1.12]">
            <AnimatePresence>
            <motion.img
              key={slide}
              src={SLIDES[slide].src}
              alt={SLIDES[slide].alt}
              fetchPriority="high"
              className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: ready ? 1 : 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 6, ease: "linear" },
                }}
              />
            </AnimatePresence>
          </div>
        </motion.div>
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

      {/* foto vanilla melayang — Planifolia (parallax scroll ke atas) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 30 }}
        animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ delay: 0.85, type: "spring", stiffness: 200, damping: 17 }}
        style={{ y: floatAY, rotate: floatARotate }}
        className="absolute -left-2 top-24 z-10 md:-left-12"
      >
        <motion.div
          animate={{ y: [0, -11, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="w-24 rounded-2xl bg-white p-1.5 shadow-[0_20px_45px_rgba(30,19,11,0.25)] md:w-32"
        >
          <img src="/vanillaplanifolia.jpeg" alt="Vanilla Planifolia pods" className="h-24 w-full rounded-xl object-cover md:h-32" loading="lazy" />
          <p className="py-1.5 text-center text-[0.62rem] font-bold uppercase tracking-[0.12em] text-pod md:text-[0.68rem]">Planifolia</p>
        </motion.div>
      </motion.div>

      {/* foto vanilla melayang — Tahitian (parallax scroll ke bawah) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 30 }}
        animate={ready ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 17 }}
        style={{ y: floatBY, rotate: floatBRotate }}
        className="absolute -right-2 bottom-28 z-10 md:-right-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 5.6, ease: "easeInOut", delay: 0.8 }}
          className="w-24 rounded-2xl bg-white p-1.5 shadow-[0_20px_45px_rgba(30,19,11,0.25)] md:w-32"
        >
          <img src="/vanillatahiti.jpeg" alt="Tahitian vanilla pods" className="h-24 w-full rounded-xl object-cover md:h-32" loading="lazy" />
          <p className="py-1.5 text-center text-[0.62rem] font-bold uppercase tracking-[0.12em] text-pod md:text-[0.68rem]">Tahitian</p>
        </motion.div>
      </motion.div>

    </motion.div>
    </motion.div>
  );
}
