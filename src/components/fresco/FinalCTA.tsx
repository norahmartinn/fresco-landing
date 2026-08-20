import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mascot } from "./Mascot";
import { UnderlineDoodle } from "./doodles";

export function FinalCTA() {
  const [done, setDone] = useState(false);

  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-primary px-6 py-24 text-center">
      <div className="blob-shape absolute -left-24 top-10 h-80 w-80 bg-cream/50" />
      <div className="blob-shape absolute -right-20 bottom-10 h-96 w-96 bg-secondary/10" />

      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="relative text-[clamp(3rem,13vw,10rem)] font-bold leading-[0.85] text-secondary"
      >
        ¿Tienes
        <span className="block font-script text-terracotta">hambre?</span>
        <UnderlineDoodle className="mx-auto mt-2 w-56 text-secondary/60" />
      </motion.h2>

      <div className="relative mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <motion.button
          whileHover={{ scale: 1.06, rotate: -1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDone(true)}
          className="rounded-full border-4 border-secondary bg-secondary px-10 py-5 font-display text-xl font-bold text-primary shadow-[var(--shadow-pop)]"
        >
          Reservar mesa
        </motion.button>
        <motion.a
          whileHover={{ scale: 1.04 }}
          href="#carta"
          className="rounded-full border-4 border-secondary px-8 py-5 font-display text-xl font-bold text-secondary"
        >
          Ver la carta
        </motion.a>
      </div>

      <AnimatePresence>
        {done && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 font-script text-3xl text-secondary"
          >
            Hecho. Te guardamos la mesa junto a las plantas.
          </motion.p>
        )}
      </AnimatePresence>

      <div className="relative mt-14 flex flex-col items-center">
        <Mascot mood={done ? "cheer" : "surprised"} className="w-32 md:w-44" />
        <p className="mt-3 font-script text-2xl text-secondary/70">
          {done ? "¡nos vemos!" : "yo ya estoy en la mesa"}
        </p>
      </div>

      <footer className="relative mt-20 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.25em] text-secondary/60">
        <span>FRESCÓ</span>
        <span>Carrer de la Mar, 12 · València</span>
        <span>13:00–16:00 · 20:00–23:30</span>
      </footer>
    </section>
  );
}
