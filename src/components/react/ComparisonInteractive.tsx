import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLS = [
  { name: "Planifolia", tag: "Classic & Rich" },
  { name: "Tahitian", tag: "Floral & Elegant" },
  { name: "Powder", tag: "Bold & Practical" },
];

const ROWS: { feature: string; values: [string, string, string] }[] = [
  {
    feature: "Overall character",
    values: ["Rich, dark, warm, and classic", "Floral, fruity, delicate, aromatic", "Concentrated, bold, ready-to-mix"],
  },
  {
    feature: "Aroma direction",
    values: ["Vanillin-dominant, buttery", "Anisic, stone fruit, cherry", "Roasted vanilla, seed-flecked"],
  },
  {
    feature: "Ideal applications",
    values: ["Cakes, cookies, extract, chocolate", "Crème anglaise, gelato, fruit desserts", "Dough, coffee, drinks, instant mix"],
  },
  {
    feature: "Who may prefer it?",
    values: ["Traditional intense vanilla lovers", "Chefs seeking nuanced scent", "Bakeries needing practical dosing"],
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function ComparisonInteractive() {
  const [active, setActive] = useState(0);

  return (
    <div>
      {/* ===== Desktop: tabel premium interaktif ===== */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease }}
        className="relative hidden overflow-hidden rounded-[26px] border border-line bg-white shadow-sm transition-shadow hover:shadow-[0_20px_45px_rgba(30,19,11,0.12)] md:block"
      >
        {/* garis aksen gradien atas */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: 0.3 }}
          className="h-1 origin-left bg-gradient-to-r from-amber-glow via-amber-light to-amber-deep"
        />
        <table className="w-full border-separate border-spacing-0 text-left">
          <thead>
            <tr>
              <th className="w-[24%] bg-sand px-7 py-5 align-bottom text-[0.82rem] font-bold uppercase tracking-[0.12em] text-pod">
                Characteristic
              </th>
              {COLS.map((c, i) => {
                const isActive = i === active;
                return (
                  <th key={c.name} className={`relative px-4 py-3 transition-colors duration-300 ${isActive ? "bg-amber-glow/15" : "bg-sand"}`}>
                    <button
                      onClick={() => setActive(i)}
                      className={`relative flex w-full flex-col items-start gap-0.5 rounded-2xl px-4 py-3 text-left transition-all duration-300 ${
                        isActive ? "text-pod" : "text-pod/70 hover:text-pod"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="colPill"
                          transition={{ duration: 0.45, ease }}
                          className="absolute inset-0 rounded-2xl border border-amber-glow/60 bg-white shadow-[0_10px_30px_rgba(198,139,69,0.25)]"
                        />
                      )}
                      <span className="relative text-[0.95rem] font-bold uppercase tracking-[0.12em]">{c.name}</span>
                      <span className="relative text-[0.75rem] font-medium normal-case tracking-normal text-muted">{c.tag}</span>
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r, ri) => (
              <motion.tr
                key={r.feature}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: ri * 0.1, ease }}
                className="group/row transition-colors hover:bg-sand/60"
              >
                <td className="border-t border-line px-7 py-5 font-semibold text-pod">{r.feature}</td>
                {r.values.map((v, ci) => (
                  <td
                    key={ci}
                    className={`border-t border-line px-7 py-5 text-[0.94rem] transition-all duration-300 ${
                      ci === active ? "bg-amber-glow/[0.08] font-medium text-pod" : "text-cocoa/80"
                    }`}
                  >
                    <span className="flex items-start gap-2">
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + ri * 0.1 + ci * 0.06, type: "spring", stiffness: 400, damping: 18 }}
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${ci === active ? "bg-amber-glow" : "bg-line"}`}
                      />
                      {v}
                    </span>
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* ===== Mobile: tab + kartu animasi ===== */}
      <div className="md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-5 grid grid-cols-3 gap-2 rounded-2xl border border-line bg-white p-1.5 shadow-sm"
        >
          {COLS.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setActive(i)}
              className={`relative rounded-xl px-2 py-2.5 text-[0.8rem] font-bold transition-colors ${
                i === active ? "text-night-deep" : "text-muted"
              }`}
            >
              {i === active && (
                <motion.span
                  layoutId="mobileTab"
                  transition={{ duration: 0.4, ease }}
                  className="absolute inset-0 rounded-xl bg-amber-glow"
                />
              )}
              <span className="relative">{c.name}</span>
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 60, rotateY: -8 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -60, rotateY: 8 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden rounded-[22px] border border-line bg-white shadow-sm"
          >
            <div className="bg-gradient-to-r from-amber-glow to-amber-deep px-6 py-4">
              <div className="text-[0.95rem] font-bold uppercase tracking-[0.12em] text-white">{COLS[active].name}</div>
              <div className="text-[0.8rem] text-white/85">{COLS[active].tag}</div>
            </div>
            <div className="divide-y divide-line">
              {ROWS.map((r, ri) => (
                <motion.div
                  key={r.feature}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + ri * 0.07, duration: 0.4, ease }}
                  className="px-6 py-4"
                >
                  <div className="mb-1 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-toffee">{r.feature}</div>
                  <div className="text-[0.94rem] leading-relaxed text-pod">{r.values[active]}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-4 flex justify-center gap-2">
          {COLS.map((c, i) => (
            <button
              key={c.name}
              aria-label={`Show ${c.name}`}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-amber-glow" : "w-2 bg-line"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
