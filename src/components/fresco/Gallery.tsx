import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import sala from "@/assets/fresco-sala.png.asset.json";
import mesa from "@/assets/fresco-mesa.png.asset.json";
import terraza from "@/assets/fresco-terraza.png.asset.json";

const shots = [
  { src: sala.url, alt: "Sala de FRESCÓ con la pantalla de impacto en tiempo real", caption: "la sala", rotate: -2 },
  { src: mesa.url, alt: "Mesa de FRESCÓ con aceitunas, pan y mantel de la marca", caption: "la mesa", rotate: 1.5 },
  { src: terraza.url, alt: "Terraza de FRESCÓ con luces colgantes y plantas", caption: "la terraza", rotate: -1 },
];

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback((dir: number) => {
    setOpen((i) => (i === null ? i : (i + dir + shots.length) % shots.length));
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close, go]);

  const current = open === null ? null : shots[open];

  return (
    <section className="relative overflow-hidden bg-cream px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center font-display text-[clamp(2.2rem,7vw,5rem)] font-bold leading-[0.9] text-secondary"
        >
          Así se siente
          <span className="block font-script text-terracotta">estar aquí</span>
        </motion.h2>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {shots.map((s, i) => (
            <motion.figure
              key={s.caption}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: s.rotate }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 90, damping: 16 }}
              whileHover={{ rotate: 0, scale: 1.03 }}
              onClick={() => setOpen(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setOpen(i);
              }}
              className="group cursor-pointer overflow-hidden rounded-[2rem] border-4 border-secondary bg-background shadow-[var(--shadow-pop)]"
            >
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <figcaption className="px-5 py-3 font-script text-2xl text-secondary">
                {s.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-secondary/95 p-4 backdrop-blur-sm"
          >
            <button
              onClick={close}
              aria-label="Cerrar"
              className="absolute right-5 top-5 rounded-full border-2 border-cream/40 p-2 text-cream transition hover:bg-cream hover:text-secondary"
            >
              <X className="h-6 w-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              aria-label="Anterior"
              className="absolute bottom-8 left-[calc(50%-4rem)] rounded-full md:bottom-auto md:left-8 border-2 border-cream/40 p-3 text-cream transition hover:bg-cream hover:text-secondary"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); go(1); }}
              aria-label="Siguiente"
              className="absolute bottom-8 right-[calc(50%-4rem)] rounded-full md:bottom-auto md:right-8 border-2 border-cream/40 p-3 text-cream transition hover:bg-cream hover:text-secondary"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <motion.figure
              key={current.src}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] w-full max-w-4xl overflow-hidden rounded-[2rem] border-4 border-cream bg-background"
            >
              <img src={current.src} alt={current.alt} className="max-h-[70vh] w-full object-contain bg-cream" />
              <figcaption className="flex items-center justify-between px-5 py-3 font-script text-2xl text-secondary">
                {current.caption}
                <span className="font-body text-sm text-secondary/60">
                  {(open ?? 0) + 1} / {shots.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
