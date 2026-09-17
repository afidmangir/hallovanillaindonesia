import { useEffect, useState } from "react";

/** true setelah loading veil selesai (event "halloready"), dengan fallback timeout. */
export function useHalloReady(fallbackMs = 7000) {
  const [ready, setReady] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("is-ready")
  );
  useEffect(() => {
    if (document.documentElement.classList.contains("is-ready")) {
      setReady(true);
      return;
    }
    const on = () => setReady(true);
    window.addEventListener("halloready", on, { once: true });
    const t = setTimeout(() => setReady(true), fallbackMs);
    return () => {
      window.removeEventListener("halloready", on);
      clearTimeout(t);
    };
  }, [fallbackMs]);
  return ready;
}
