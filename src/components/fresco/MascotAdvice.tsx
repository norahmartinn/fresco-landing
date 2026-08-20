import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mascot } from "./Mascot";

const options = [
  { q: "Tengo mucha hambre", a: "Pasta al pesto con pollo. La albahaca entró a las 17:00 y solo aguanta 18 h." },
  { q: "Quiero algo ligero", a: "Gazpacho de tomate asado. 240 g de tomate por ración, y el tomate manda hoy." },
  { q: "Sorpréndeme", a: "Berenjena asada con garbanzos y yogur. Nadie la pide y todo el mundo repite." },
];

export function MascotAdvice() {
  const [sel, setSel] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden bg-primary py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-[auto_1fr]">
        <div className="flex justify-center">
          <Mascot mood={sel === null ? "point" : "cheer"} className="w-40 md:w-56" />
        </div>
        <div>
          <h2 className="text-balance text-4xl font-bold leading-[1] text-secondary md:text-6xl">
            ¿No sabes qué pedir?
            <span className="block font-script text-terracotta">Yo sí.</span>
          </h2>

          <div className="mt-8 flex flex-wrap gap-3">
            {options.map((o, i) => (
              <button
                key={o.q}
                onClick={() => setSel(i)}
                className={`rounded-full border-2 border-secondary px-5 py-2.5 font-display font-semibold transition-transform hover:-translate-y-0.5 ${
                  sel === i ? "bg-secondary text-primary" : "bg-background text-secondary"
                }`}
              >
                {o.q}
              </button>
            ))}
          </div>

          <div className="mt-6 min-h-20">
            <AnimatePresence mode="wait">
              {sel !== null && (
                <motion.p
                  key={sel}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="inline-block rounded-2xl border-2 border-secondary bg-background px-5 py-3 font-script text-2xl text-secondary shadow-[var(--shadow-pop)]"
                >
                  {options[sel]?.a}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
