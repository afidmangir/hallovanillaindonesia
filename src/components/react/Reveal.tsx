import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type VariantName = "up" | "left" | "right" | "zoom" | "blur" | "flip";

const baseTransition = (delay: number, duration = 0.8) => ({
  duration,
  delay,
  ease: [0.16, 1, 0.3, 1] as const,
});

const variantMap: Record<VariantName, Variants> = {
  up: {
    hidden: { opacity: 0, y: 44 },
    show: (d: number = 0) => ({ opacity: 1, y: 0, transition: baseTransition(d) }),
  },
  left: {
    hidden: { opacity: 0, x: -56 },
    show: (d: number = 0) => ({ opacity: 1, x: 0, transition: baseTransition(d) }),
  },
  right: {
    hidden: { opacity: 0, x: 56 },
    show: (d: number = 0) => ({ opacity: 1, x: 0, transition: baseTransition(d) }),
  },
  zoom: {
    hidden: { opacity: 0, scale: 0.88, y: 24 },
    show: (d: number = 0) => ({ opacity: 1, scale: 1, y: 0, transition: baseTransition(d) }),
  },
  blur: {
    hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
    show: (d: number = 0) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: baseTransition(d, 0.9),
    }),
  },
  flip: {
    hidden: { opacity: 0, rotateX: -18, y: 30, transformPerspective: 800 },
    show: (d: number = 0) => ({
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: baseTransition(d),
    }),
  },
};

export default function Reveal({
  children,
  delay = 0,
  className = "",
  variant = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  variant?: VariantName;
}) {
  return (
    <motion.div
      className={className}
      variants={variantMap[variant]}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-70px" }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}
