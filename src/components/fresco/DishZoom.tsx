import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import pestoAsset from "@/assets/pasta-pesto-pollo.asset.json";

const pesto = pestoAsset.url;

export function DishZoom() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.6]);
  const titleY = useTransform(scrollYProgress, [0, 1], [40, -120]);
  const veil = useTransform(scrollYProgress, [0, 0.4, 1], [0.55, 0.15, 0.5]);
  const cardOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);

  return (
    <section ref={ref} className="relative h-[260vh] bg-secondary">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.img
          src={pesto}
          alt="Pasta al pesto con pollo recién emplatada"
          loading="lazy"
          style={{ scale }}
          className="h-full w-full object-cover"
        />
        <motion.div style={{ opacity: veil }} className="absolute inset-0 bg-secondary" />

        <motion.div
          style={{ y: titleY }}
          className="absolute inset-x-0 top-[18%] px-6 text-center"
        >
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-primary/80">07 — el plato</span>
          <h2 className="mt-3 text-[clamp(2.5rem,10vw,8rem)] font-bold leading-[0.9] text-cream">
            Pasta al pesto
            <span className="block font-script text-primary">con pollo</span>
          </h2>
        </motion.div>

        <motion.div
          style={{ opacity: cardOpacity }}
          className="absolute bottom-10 left-1/2 w-[min(92vw,34rem)] -translate-x-1/2 rounded-[1.5rem] border-2 border-primary/60 bg-secondary/80 p-5 backdrop-blur"
        >
          <p className="font-script text-2xl text-primary">hoy sale primero</p>
          <p className="mt-2 text-cream/80">
18 g de albahaca, 120 g de pollo, 50 g de tomate y 25 g de parmesano. El mismo plato de
            siempre, servido justo el día que la albahaca lo pide.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
