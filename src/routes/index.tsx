import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import logo from "@/assets/fresco-logo.png.asset.json";
import { Hero } from "@/components/fresco/Hero";
import { RestaurantLayers } from "@/components/fresco/RestaurantLayers";
import { AIWatching } from "@/components/fresco/AIWatching";
import { PriorityBars } from "@/components/fresco/PriorityBars";
import { IngredientSpotlight } from "@/components/fresco/IngredientSpotlight";
import { Connection } from "@/components/fresco/Connection";
import { Gallery } from "@/components/fresco/Gallery";
import { FinalCTA } from "@/components/fresco/FinalCTA";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FRESCÓ — Real food. Real time." },
      {
        name: "description",
        content:
          "FRESCÓ es un restaurante de carta fija donde la IA decide qué plato sale primero cada día según los ingredientes más frescos. Una experiencia gastronómica mediterránea.",
      },
      { property: "og:title", content: "FRESCÓ — Real food. Real time." },
      {
        property: "og:description",
        content:
          "Carta fija, prioridad viva. La IA mira la nevera y decide qué plato brilla hoy. Cocina mediterránea, producto real, cero desperdicio.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const marqueeWords = [
  "REAL FOOD",
  "REAL TIME",
  "CARTA FIJA",
  "PRIORIDAD VIVA",
  "PRODUCTO DE TEMPORADA",
  "CERO DESPERDICIO",
];

function Marquee() {
  return (
    <div className="overflow-hidden border-y-4 border-secondary bg-secondary py-4">
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap">
        {[...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map((w, i) => (
          <span
            key={i}
            className="font-display text-2xl font-bold uppercase tracking-tight text-primary md:text-4xl"
          >
            {w} <span className="text-cream/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Index() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <main className="overflow-x-clip bg-background">
      <motion.div
        style={{ scaleX: bar }}
        className="fixed inset-x-0 top-0 z-50 h-1.5 origin-left bg-terracotta"
      />
      <header className="fixed left-6 top-5 z-40 hidden md:block">
        <img src={logo.url} alt="FRESCÓ" className="w-24 mix-blend-multiply" />
      </header>

      <h1 className="sr-only">FRESCÓ — restaurante mediterráneo de carta fija y prioridad viva</h1>

      <Hero />
      <Marquee />
      <RestaurantLayers />
      <AIWatching />
      <PriorityBars />
      <IngredientSpotlight />
      <Connection />
      <Gallery />
      <FinalCTA />

    </main>
  );
}
