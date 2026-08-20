import { motion } from "framer-motion";
import people from "@/assets/people.jpg";
import night from "@/assets/night.jpg";
import terraza from "@/assets/terraza.asset.json";

export function HumanExperience() {
  return (
    <section className="relative overflow-hidden bg-background py-28">
      <div className="mx-auto max-w-6xl px-6">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-leaf">09 — la parte humana</span>
        <h2 className="mt-3 max-w-3xl text-balance text-4xl font-bold text-secondary md:text-6xl">
          Al final, alguien parte el pan
          <span className="font-script text-terracotta"> y lo comparte.</span>
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[
            { src: people, alt: "Amigos compartiendo comida", cls: "md:col-span-2 md:row-span-2 h-72 md:h-[32rem]" },
            { src: terraza.url, alt: "Terraza de FRESCÓ", cls: "h-56 md:h-[15.5rem]" },
            { src: night, alt: "Sala llena por la noche", cls: "h-56 md:h-[15.5rem]" },
          ].map((img, i) => (
            <motion.figure
              key={img.alt}
              initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.5 : -1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02 }}
              className={`overflow-hidden rounded-[1.75rem] border-4 border-secondary ${img.cls}`}
            >
              <img src={img.src} alt={img.alt} loading="lazy" className="h-full w-full object-cover" />
            </motion.figure>
          ))}
        </div>

        <p className="mt-10 max-w-xl font-script text-3xl text-secondary/70">
          la tecnología se queda en la cocina. tú solo cenas.
        </p>
      </div>
    </section>
  );
}
