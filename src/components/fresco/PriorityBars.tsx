import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { dishes } from "@/data/menu";

export function PriorityBars() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 2600);
    return () => clearInterval(id);
  }, []);

  const values = dishes.map((d, i) => {
    const jitter = Math.sin((tick + i * 2) * 1.3) * 5;
    return Math.max(12, Math.min(99, Math.round(d.base + jitter)));
  });

  return (
    <section className="relative overflow-hidden bg-background py-24">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-leaf">04 — el sistema</span>
          <h2 className="mt-3 max-w-3xl text-balance text-4xl font-bold text-secondary md:text-6xl">
            Nuestros platos.
            <span className="mt-4 block text-terracotta">Te señalamos los que tienen ingredientes urgentes.</span>
          </h2>
        </motion.div>

        <div className="mt-12 rounded-[2rem] border-4 border-secondary bg-card p-5 shadow-[var(--shadow-pop)] md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-secondary/70">
              <span className="pulse-dot h-2 w-2 rounded-full bg-leaf" /> prioridad en vivo
            </span>
            <span className="font-script text-xl text-terracotta">{"\n"}</span>
          </div>

          <ul className="space-y-5">
            {dishes.map((d, i) => (
              <motion.li
                key={d.name}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-lg font-semibold text-secondary md:text-xl">
                    {d.name}
                  </span>
                  <span className="font-mono text-sm tabular-nums text-secondary/70">
                    {d.id} · {values[i]}%
                  </span>
                </div>
                <div className="mt-2 h-4 overflow-hidden rounded-full bg-secondary/10">
                  <motion.div
                    animate={{ width: `${values[i]}%` }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    className={`h-full rounded-full ${
                      i === 0 ? "bg-primary" : i < 3 ? "bg-leaf" : "bg-secondary/30"
                    }`}
                  />
                </div>
                <p className="mt-1 font-script text-lg text-secondary/60">{d.why}</p>
              </motion.li>
            ))}
          </ul>
          <p className="mt-8 font-body text-base text-secondary/70">
            La prioridad mide cuánto de prisa tenemos en gastar los ingredientes que lleva cada plato. Así señalamos antes los platos que evitan que lo más fresco se eche a perder.
          </p>
        </div>
      </div>
    </section>
  );
}
