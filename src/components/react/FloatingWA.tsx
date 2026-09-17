import { motion } from "framer-motion";
import { useHalloReady } from "./useHalloReady";
import WaIcon from "./WaIcon";

const WA =
  "https://wa.me/62881026050105?text=Hello%20hallovanilla.indonesia%2C%20I%20would%20like%20to%20ask%20about%20your%20vanilla%20beans.";

export default function FloatingWA() {
  const ready = useHalloReady();
  return (
    <motion.a
      href={WA}
      target="_blank"
      rel="noopener"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.4 }}
      animate={ready ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.1, rotate: 6 }}
      whileTap={{ scale: 0.92 }}
      className="fixed bottom-6 right-6 z-[999] grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_14px_35px_rgba(37,211,102,0.45)] ring-4 ring-white/90"
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: [1, 1.45], opacity: [0.45, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeOut" }}
      />
      <WaIcon size={28} className="relative" />
    </motion.a>
  );
}
