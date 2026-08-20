import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import basilAsset from "@/assets/albahaca-sticker.asset.json";
const basil = basilAsset.url;
import pestoAsset from "@/assets/pasta-pesto-pollo.asset.json";

const pesto = pestoAsset.url;

export function Connection() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const draw = useTransform(scrollYProgress, [0.15, 0.7], [0, 1]);
  const dishScale = useTransform(scrollYProgress, [0.4, 0.85], [0.7, 1]);
  const dishOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream py-28">
      <div className="mx-auto max-w-6xl px-6">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-leaf">06 — conexión</span>
        <h2 className="mt-3 max-w-2xl text-4xl font-bold text-secondary md:text-6xl">
          Un ingrediente no es un plato.
          <span className="font-script text-terracotta"> hasta que lo es.</span>
        </h2>

        <div className="relative mt-16 grid grid-cols-2 items-center gap-6 md:gap-16">
          <div className="flex justify-center">
            <img src={basil} alt="Albahaca" loading="lazy" width={1024} height={1024} className="w-40 md:w-64" />
          </div>
          <motion.div style={{ scale: dishScale, opacity: dishOpacity }} className="flex justify-center">
            <img
              src={pesto}
              alt="Pasta al pesto con pollo"
              loading="lazy"
              className="aspect-square w-40 rounded-full border-4 border-secondary object-cover md:w-64"
            />
          </motion.div>

          <svg
            className="pointer-events-none absolute inset-0 h-full w-full text-terracotta"
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M26 20 C 42 2, 58 38, 74 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeDasharray="2 2"
              style={{ pathLength: draw }}
            />
          </svg>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-3 text-center">
          <span className="rounded-full bg-secondary px-4 py-2 font-display font-semibold text-primary">Albahaca</span>
          <span className="font-script text-2xl text-secondary/60">se convierte en</span>
          <span className="rounded-full bg-primary px-4 py-2 font-display font-semibold text-secondary">
            Pasta al pesto con pollo
          </span>
          <span className="font-mono text-xs uppercase tracking-widest text-secondary/50">
            18 g de albahaca por ración
          </span>
        </div>
      </div>
    </section>
  );
}
