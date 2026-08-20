import { motion } from "framer-motion";
import sala from "@/assets/fresco-sala.png.asset.json";
import mesa from "@/assets/fresco-mesa.png.asset.json";
import terraza from "@/assets/fresco-terraza.png.asset.json";

const shots = [
  { src: sala.url, alt: "Sala de FRESCÓ con la pantalla de impacto en tiempo real", caption: "la sala", rotate: -2 },
  { src: mesa.url, alt: "Mesa de FRESCÓ con aceitunas, pan y mantel de la marca", caption: "la mesa", rotate: 1.5 },
  { src: terraza.url, alt: "Terraza de FRESCÓ con luces colgantes y plantas", caption: "la terraza", rotate: -1 },
];

export function Gallery() {
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
              className="group overflow-hidden rounded-[2rem] border-4 border-secondary bg-background shadow-[var(--shadow-pop)]"
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
    </section>
  );
}
