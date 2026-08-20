import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import basilAsset from "@/assets/albahaca-sticker.png.asset.json";
const basil = basilAsset.url;


const facts = [
  ["stock", "0,60 kg"],
  ["entrada", "hoy, 17:00"],
  ["vida útil", "18 h"],
  ["prioridad", "CRÍTICA"],
];

export function IngredientSpotlight() {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [18, -18]), { stiffness: 120, damping: 14 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-24, 24]), { stiffness: 120, damping: 14 });

  return (
    <section className="relative overflow-hidden bg-secondary py-28">
      <div
        ref={ref}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2"
      >
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary/70">05 — el ingrediente</span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-3 text-5xl font-bold leading-[0.95] text-primary md:text-7xl"
          >
            Urgente hoy:
            <span className="block font-script text-cream">la albahaca.</span>
          </motion.h2>
          <p className="mt-6 max-w-md text-lg text-cream/70">
            Llegó a las 17:00 y solo aguanta 18 horas. Es el ingrediente más caro y más frágil
            de la casa: 12 €/kg y ninguna prórroga. Así que hoy señalamos los platos que la gastan.
          </p>
          <dl className="mt-8 grid max-w-md grid-cols-2 gap-4">
            {facts.map(([k, v], i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-primary/30 p-3"
              >
                <dt className="font-mono text-[0.65rem] uppercase tracking-widest text-primary/60">{k}</dt>
                <dd className="font-display text-lg font-semibold text-cream">{v}</dd>
              </motion.div>
            ))}
          </dl>
        </div>

        <div className="relative flex items-center justify-center" style={{ perspective: 900 }}>
          <div className="absolute h-72 w-72 rounded-full bg-primary/20 blur-3xl md:h-96 md:w-96" />
          <motion.img
            src={basil}
            alt="Albahaca fresca"
            loading="lazy"
            width={1024}
            height={1024}
            style={{ rotateX: rx, rotateY: ry }}
            className="relative w-[min(80vw,26rem)] drop-shadow-[0_30px_50px_rgba(0,0,0,0.35)]"
          />
          <motion.span
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute right-2 top-6 rounded-full border-2 border-primary bg-secondary px-3 py-1 font-script text-xl text-primary"
          >
            prioridad 96%
          </motion.span>
        </div>
      </div>
    </section>
  );
}
