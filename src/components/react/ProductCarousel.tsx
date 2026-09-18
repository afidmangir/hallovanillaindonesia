import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

type Product = {
  img: string;
  badge: string;
  species: string;
  title: string;
  desc: string;
  specs: { label: string; val: string }[];
  cta: string;
  wa: string;
  tag: string;
};

const PRODUCTS: Product[] = [
  {
    img: "/vanillaplanifolia.jpeg",
    badge: "Classic • Rich • Creamy",
    species: "Vanilla planifolia",
    title: "Vanilla Planifolia",
    desc: "The most popular vanilla in the world. Deep, warm, creamy sweetness with subtle woody undertones.",
    specs: [
      { label: "Profile", val: "Classic, rich, and comforting" },
      { label: "Aroma", val: "Warm vanillin, sweet butter, hints of caramel" },
      { label: "Best for", val: "Baking, extract, custards, ice cream, chocolate" },
    ],
    cta: "Ask about Planifolia",
    wa: "https://wa.me/62881026050105?text=Hello%20hallovanilla%2C%20I%20am%20interested%20in%20Vanilla%20Planifolia.",
    tag: "Traditional Favorite",
  },
  {
    img: "/vanillatahiti.jpeg",
    badge: "Floral • Fruity • Elegant",
    species: "Vanilla × tahitensis",
    title: "Tahitian Vanilla",
    desc: "Prized variety with floral, fruity bouquet. Plump moist pods with exquisite lingering aroma.",
    specs: [
      { label: "Profile", val: "Delicate, aromatic, and perfumed" },
      { label: "Aroma", val: "Floral, stone fruit, cherry, hint of anise" },
      { label: "Best for", val: "Pastry creams, fruit tarts, crème brûlée, gelato" },
    ],
    cta: "Ask about Tahitian",
    wa: "https://wa.me/62881026050105?text=Hello%20hallovanilla%2C%20I%20am%20interested%20in%20Tahitian%20Vanilla.",
    tag: "Gourmet Specialty",
  },
  {
    img: "/vanillapowder.jpeg",
    badge: "Ground • Pure • Versatile",
    species: "Vanilla planifolia ground",
    title: "Vanilla Powder",
    desc: "Pure ground vanilla from cured pods — intense, easy to dose for bakery, coffee & chocolate makers.",
    specs: [
      { label: "Profile", val: "Concentrated, dark, seed-rich" },
      { label: "Aroma", val: "Bold vanillin, roasted, earthy-sweet" },
      { label: "Best for", val: "Cookies, bread, coffee, chocolate, ice cream mix" },
    ],
    cta: "Ask about Powder",
    wa: "https://wa.me/62881026050105?text=Hello%20hallovanilla%2C%20I%20am%20interested%20in%20Vanilla%20Powder.",
    tag: "Ready to Use",
  },
];

function Card({ p, i }: { p: Product; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex w-[82vw] shrink-0 flex-col overflow-hidden rounded-[26px] border border-white/15 bg-night-card transition-colors hover:border-amber-glow/60 hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)] sm:w-[420px] md:w-[700px] md:flex-row lg:w-[780px]"
    >
      {/* Gambar: di atas pada mobile, panel kiri full-bleed pada desktop */}
      <div className="relative h-[160px] shrink-0 overflow-hidden bg-night-deep sm:h-[190px] md:h-auto md:min-h-[380px] md:w-[280px] lg:w-[320px]">
        <motion.img
          src={p.img}
          alt={p.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.7 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-night-deep/60 via-transparent to-transparent md:bg-gradient-to-r" />
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-night-deep/85 px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-amber-light backdrop-blur lg:text-[0.72rem]">
          {p.badge}
        </span>
        <span className="font-serif-display pointer-events-none absolute bottom-2 right-4 select-none text-[3.2rem] font-medium leading-none text-white/15 md:bottom-4 md:text-[4.5rem]">
          0{i + 1}
        </span>
      </div>
      <div className="flex grow flex-col p-5 sm:p-6 md:p-7 lg:p-8">
        <div className="font-serif-display text-base italic text-amber-light">{p.species}</div>
        <h3 className="font-serif-display mb-2 text-[1.5rem] font-medium text-cream lg:text-[1.9rem]">{p.title}</h3>
        <p className="mb-4 text-[0.85rem] leading-relaxed text-[#D3C3B6] lg:text-[0.92rem]">{p.desc}</p>
        <div className="mb-5 grid gap-2 border-y border-white/15 py-3.5 lg:gap-2.5 lg:py-4">
          {p.specs.map((s) => (
            <div key={s.label} className="grid grid-cols-[92px_1fr] items-baseline gap-2 text-[0.8rem] lg:text-[0.85rem]">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-amber-glow lg:text-[0.72rem]">
                {s.label}
              </span>
              <span className="text-[#F7EFE8]">{s.val}</span>
            </div>
          ))}
        </div>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-3">
          <motion.a
            href={p.wa}
            target="_blank"
            rel="noopener"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex items-center gap-2 rounded-full bg-amber-glow px-5 py-2.5 text-[0.82rem] font-bold text-night-deep transition-colors hover:bg-amber-light hover:shadow-[0_8px_20px_rgba(198,139,69,0.4)]"
          >
            <span>{p.cta}</span>
            <span>→</span>
          </motion.a>
          <span className="text-[0.75rem] italic text-[#BCAAA0]">{p.tag}</span>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProductCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [range, setRange] = useState(0);
  const [active, setActive] = useState(0);

  // Plugin framer-motion: progres scroll vertikal section → gerak horizontal track
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -range]);
  const bgX = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  // Jarak geser = lebar track − lebar layar, diukur ulang otomatis
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const visible = track.parentElement?.clientWidth ?? window.innerWidth;
      setRange(Math.max(0, track.scrollWidth - visible));
    };
    measure();
    const raf = requestAnimationFrame(measure);
    const t = setTimeout(measure, 600);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;
    if (ro && trackRef.current) ro.observe(trackRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
      clearTimeout(t);
      cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(PRODUCTS.length - 1, Math.max(0, Math.round(v * (PRODUCTS.length - 1)))));
  });

  const goTo = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const scrollable = section.offsetHeight - window.innerHeight;
    const clamped = Math.min(PRODUCTS.length - 1, Math.max(0, i));
    window.scrollTo({ top: top + (scrollable * clamped) / Math.max(1, PRODUCTS.length - 1), behavior: "smooth" });
  };

  return (
    <section ref={sectionRef} className="relative h-[300vh]">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        {/* teks latar parallax */}
        <div
          aria-hidden
          className="font-serif-display pointer-events-none absolute left-0 top-1/2 w-full -translate-y-1/2 select-none overflow-hidden whitespace-nowrap text-[22vw] font-medium italic leading-none text-white/[0.035]"
        >
          <motion.div style={{ x: bgX }} className="will-change-transform">
            Planifolia — Tahitian — Powder — Planifolia — Tahitian —
          </motion.div>
        </div>

        <div className="relative mb-5 flex items-center justify-between gap-4 px-1 lg:mb-7">
          <div className="flex items-center gap-3 text-[0.75rem] font-semibold uppercase tracking-[0.22em] text-amber-light/90 lg:text-[0.8rem]">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-glow" />
              Signature Collection
            </div>
          <div className="flex gap-2">
            {[-1, 1].map((d) => (
              <motion.button
                key={d}
                type="button"
                aria-label={d < 0 ? "Previous variety" : "Next variety"}
                onClick={() => goTo(active + d)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 text-lg text-white transition-colors hover:bg-amber-glow hover:text-night-deep"
              >
                {d < 0 ? "←" : "→"}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div ref={trackRef} style={{ x }} className="relative flex w-max items-stretch gap-6 will-change-transform lg:gap-8">
          <div className="flex w-[70vw] min-w-[230px] max-w-[360px] shrink-0 flex-col justify-center pr-2 sm:w-[300px]">
            <p className="font-serif-display text-[clamp(1.5rem,2.4vw,2.6rem)] leading-tight text-cream">
              Three profiles, <span className="italic text-amber-light">one origin</span>
            </p>
            <p className="mt-4 max-w-[300px] text-[0.88rem] leading-relaxed text-[#CFBEB2] lg:text-[0.95rem]">
              Planifolia, Tahitian &amp; Powder — each with its own character. Find yours.
            </p>
          </div>

          {PRODUCTS.map((p, i) => (
            <Card key={p.title} p={p} i={i} />
          ))}

          <div className="flex w-[70vw] min-w-[230px] max-w-[340px] shrink-0 flex-col items-start justify-center rounded-[26px] border border-dashed border-amber-glow/40 p-6 sm:w-[300px] lg:p-8">
            <p className="font-serif-display text-xl italic text-amber-light lg:text-2xl">Not sure which one?</p>
            <p className="mt-2 text-sm leading-relaxed text-[#CFBEB2]">Chat with us — we&apos;ll help you pick the right profile.</p>
            <a
              href="https://wa.me/62881026050105?text=Hello%20hallovanilla%2C%20I%20need%20help%20choosing%20vanilla."
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-glow/60 px-6 py-3 text-[0.88rem] font-bold text-amber-light transition-colors hover:bg-amber-glow hover:text-night-deep"
            >
              Chat WhatsApp →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
