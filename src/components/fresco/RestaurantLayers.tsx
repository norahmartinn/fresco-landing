import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import interior from "@/assets/interior.asset.json";

const pins = [
  { label: "Albahaca", pct: 92, x: "18%", y: "34%", note: "pico de frescura" },
  { label: "Tomate", pct: 78, x: "62%", y: "22%", note: "48h de vida" },
  { label: "Berenjena", pct: 41, x: "76%", y: "62%", note: "en reserva" },
  { label: "Patata", pct: 63, x: "34%", y: "70%", note: "estable" },
];

export function RestaurantLayers() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const grid = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);
  const dim = useTransform(scrollYProgress, [0.25, 0.5], [0, 0.55]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-cream py-24">
      <div className="mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl text-balance text-4xl font-bold text-secondary md:text-6xl"
        >
          Un restaurante normal.
          <span className="block font-script text-primary drop-shadow-[2px_2px_0_var(--secondary)]">
            con una segunda capa.
          </span>
        </motion.h2>

        <div className="relative mt-12 overflow-hidden rounded-[2rem] border-4 border-secondary shadow-[var(--shadow-soft)]">
          <motion.img
            src={interior.url}
            alt="Interior del restaurante FRESCÓ"
            loading="lazy"
            style={{ scale }}
            className="h-[60vh] w-full object-cover md:h-[72vh]"
          />
          <motion.div style={{ opacity: dim }} className="absolute inset-0 bg-secondary" />
          <motion.svg
            style={{ opacity: grid }}
            className="absolute inset-0 h-full w-full text-primary/40"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern id="fgrid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#fgrid)" />
          </motion.svg>

          {pins.map((p, i) => (
            <motion.div
              key={p.label}
              style={{ left: p.x, top: p.y, opacity: grid }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <motion.div
                initial={{ scale: 0.6 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.1 * i, type: "spring", stiffness: 200 }}
                className="rounded-2xl border-2 border-primary bg-secondary/90 px-3 py-2 text-left backdrop-blur"
              >
                <div className="flex items-center gap-2 text-primary">
                  <span className="pulse-dot h-2 w-2 rounded-full bg-primary" />
                  <span className="font-display text-sm font-semibold">{p.label}</span>
                  <span className="font-mono text-xs opacity-80">{p.pct}%</span>
                </div>
                <div className="mt-1 h-1 w-28 overflow-hidden rounded-full bg-primary/20">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${p.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.1 }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
                <p className="mt-1 font-script text-base text-primary/80">{p.note}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 max-w-xl font-body text-lg text-secondary/80">
          {"\n"}
        </p>
      </div>
    </section>
  );
}
