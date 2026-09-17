import { useRef } from "react";
import { motion } from "framer-motion";

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

export default function ProductCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("article");
    const w = card ? (card as HTMLElement).offsetWidth + 32 : 500;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-8 flex justify-end gap-3">
        {[-1, 1].map((d) => (
          <motion.button
            key={d}
            aria-label={d < 0 ? "Scroll left" : "Scroll right"}
            onClick={() => scroll(d)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/10 text-xl text-white transition-colors hover:bg-amber-glow hover:text-night-deep"
          >
            {d < 0 ? "←" : "→"}
          </motion.button>
        ))}
      </div>

      <div ref={ref} className="nice-scroll flex snap-x snap-mandatory gap-8 overflow-x-auto pb-6">
        {PRODUCTS.map((p, i) => (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 60, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.14, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -10, scale: 1.01 }}
            className="group flex w-[min(560px,88vw)] shrink-0 snap-start flex-col overflow-hidden rounded-[26px] border border-white/15 bg-night-card transition-colors hover:border-amber-glow/60 hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)]"
          >
            <div className="relative h-[300px] overflow-hidden bg-night-deep">
              <motion.img
                src={p.img}
                alt={p.title}
                loading="lazy"
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.7 }}
              />
              <motion.span
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.14 }}
                className="absolute left-5 top-5 rounded-full border border-white/15 bg-night-deep/85 px-3.5 py-1.5 text-[0.74rem] font-bold uppercase tracking-[0.1em] text-amber-light backdrop-blur"
              >
                {p.badge}
              </motion.span>
            </div>
            <div className="flex grow flex-col p-8 md:p-9">
              <div className="font-serif-display text-lg italic text-amber-light">{p.species}</div>
              <h3 className="font-serif-display mb-3 text-[2rem] font-medium text-cream">{p.title}</h3>
              <p className="mb-6 text-[0.95rem] leading-relaxed text-[#D3C3B6]">{p.desc}</p>
              <div className="mb-7 grid gap-3 border-y border-white/15 py-5">
                {p.specs.map((s, j) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + j * 0.08 }}
                    className="grid grid-cols-[110px_1fr] text-[0.88rem]"
                  >
                    <span className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-amber-glow">
                      {s.label}
                    </span>
                    <span className="text-[#F7EFE8]">{s.val}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between gap-4">
                <motion.a
                  href={p.wa}
                  target="_blank"
                  rel="noopener"
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 rounded-full bg-amber-glow px-6 py-3 text-[0.88rem] font-bold text-night-deep transition-colors hover:bg-amber-light hover:shadow-[0_8px_20px_rgba(198,139,69,0.4)]"
                >
                  <span>{p.cta}</span>
                  <span>→</span>
                </motion.a>
                <span className="text-[0.8rem] text-[#BCAAA0]">{p.tag}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
