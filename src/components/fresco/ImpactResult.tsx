import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {v.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 1240, suffix: " kg", label: "de comida que no acabó en la basura", note: "este año" },
  { value: 38, suffix: "%", label: "menos desperdicio que la media del barrio", note: "y bajando" },
  { value: 4.2, suffix: "", decimals: 1, label: "toneladas de CO₂ que nos ahorramos", note: "más o menos un vuelo largo" },
];

export function ImpactResult() {
  return (
    <section className="relative overflow-hidden bg-secondary py-28">
      <div className="mx-auto max-w-6xl px-6">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary/70">10 — lo que pasa después</span>
        <h2 className="mt-3 max-w-3xl text-balance text-4xl font-bold text-primary md:text-6xl">
          Nadie viene por esto.
          <span className="block font-script text-cream">Pero pasa igual.</span>
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="rounded-[1.75rem] border-2 border-primary/40 p-7"
            >
              <p className="font-display text-6xl font-bold text-primary md:text-7xl">
                <Counter to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
              </p>
              <p className="mt-3 text-cream/80">{s.label}</p>
              <p className="mt-2 font-script text-xl text-primary/70">{s.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
