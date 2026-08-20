import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const words = ["LA", "IA", "ESTÁ", "MIRANDO"];

const signals = [
  "temperatura de cámara",
  "stock real",
  "días de vida",
  "reservas de esta noche",
  "lo que se pidió ayer",
  "el tiempo que hará",
];

export function AIWatching() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bg = useTransform(scrollYProgress, [0, 0.3], ["oklch(0.32 0.07 145)", "oklch(0.22 0.05 150)"]);
  const lineProgress = useTransform(scrollYProgress, [0.3, 0.8], [0, 1]);

  return (
    <section ref={ref} className="relative h-[220vh] bg-secondary">
      <motion.div
        style={{ backgroundColor: bg }}
        className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-6"
      >
        <svg className="absolute inset-0 h-full w-full text-primary/25">
          {[...Array(14)].map((_, i) => (
            <motion.line
              key={i}
              x1={`${(i * 37) % 100}%`}
              y1={`${(i * 53) % 100}%`}
              x2={`${(i * 71 + 20) % 100}%`}
              y2={`${(i * 29 + 40) % 100}%`}
              stroke="currentColor"
              strokeWidth="1"
              style={{ pathLength: lineProgress, opacity: lineProgress }}
            />
          ))}
        </svg>

        <h2 className="relative flex flex-wrap justify-center gap-x-5 text-center text-[clamp(2.5rem,11vw,9rem)] font-bold leading-[0.9] text-primary">
          {words.map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 80, rotateX: -60 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 120, damping: 14 }}
            >
              {w}
            </motion.span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="relative mt-6 max-w-lg text-center font-script text-2xl text-cream/80"
        >
          no para vigilarte a ti. para vigilar la nevera.
        </motion.p>

        <div className="relative mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
          {signals.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 + i * 0.09, type: "spring", stiffness: 200 }}
              className="rounded-full border border-primary/40 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-primary/80"
            >
              {s}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
