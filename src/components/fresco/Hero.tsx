import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import logo from "@/assets/logo.asset.json";
import { Mascot, Bubble } from "./Mascot";
import {
  TomatoDoodle,
  BasilDoodle,
  AubergineDoodle,
  PotatoDoodle,
  LemonDoodle,
} from "./doodles";

const floaters = [
  { C: TomatoDoodle, style: "left-[4%] top-[18%] w-20 md:w-28", depth: 40, delay: 0.9 },
  { C: BasilDoodle, style: "right-[8%] top-[14%] w-16 md:w-24", depth: -30, delay: 1.05 },
  { C: AubergineDoodle, style: "left-[12%] bottom-[16%] w-20 md:w-28", depth: 60, delay: 1.2 },
  { C: LemonDoodle, style: "right-[6%] bottom-[26%] w-16 md:w-24", depth: -50, delay: 1.35 },
  { C: PotatoDoodle, style: "left-[46%] top-[6%] w-14 md:w-20", depth: 25, delay: 1.5 },
];

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const tomatoScale = useTransform(scrollYProgress, [0, 0.6], [1, 2.1]);
  const tomatoX = useTransform(scrollYProgress, [0, 0.6], [0, 60]);
  const psstOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const talkOpacity = useTransform(scrollYProgress, [0.18, 0.35], [0, 1]);
  const mascotY = useTransform(scrollYProgress, [0.2, 0.6], [220, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  return (
    <section
      ref={ref}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-primary"
    >
      <div className="blob-shape absolute -left-40 top-0 h-[30rem] w-[30rem] bg-secondary/10" />
      <div className="blob-shape absolute -right-32 bottom-0 h-[34rem] w-[34rem] bg-cream/40" />

      {floaters.map(({ C, style, depth, delay }, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay, type: "spring", stiffness: 120, damping: 12 }}
          className={`absolute text-secondary ${style}`}
          style={{
            x: useTransform(sx, (v) => v * depth),
            y: useTransform(sy, (v) => v * depth),
            ...(i === 0 ? { scale: tomatoScale, translateX: tomatoX } : {}),
          }}
        >
          <div className="float-slow" style={{ animationDelay: `${i * 0.6}s` }}>
            <C className="h-auto w-full" />
          </div>
          {i === 0 && (
            <>
              <motion.div style={{ opacity: psstOpacity }} className="absolute -right-16 -top-8">
                <span className="rounded-full border-2 border-secondary bg-background px-3 py-1 font-script text-xl text-secondary">
                  Psst...
                </span>
              </motion.div>
              <motion.div
                style={{ opacity: talkOpacity }}
                className="absolute -right-4 -top-14 w-52 rounded-2xl border-2 border-secondary bg-background px-4 py-2 text-center font-script text-xl leading-tight text-secondary"
              >
                Hoy me interesa que me comas.
              </motion.div>
            </>
          )}
        </motion.div>
      ))}

      <motion.div
        style={{ y: logoY, opacity: logoOpacity }}
        className="relative z-10 flex flex-col items-center px-6 text-center"
      >
        <motion.img
          src={logo.url}
          alt="FRESCÓ — Real food. Real time."
          initial={{ opacity: 0, scale: 0.85, filter: "blur(12px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="w-[min(80vw,640px)]"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-6 max-w-md font-display text-lg font-medium text-secondary/70"
        >
          La carta es fija. Pero hoy ciertos platos se destacan: los que llevan ingredientes a punto de caducar.
        </motion.p>
      </motion.div>

      <motion.div
        style={{ y: mascotY }}
        className="pointer-events-none absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center"
      >
        <Bubble className="mb-2">Te cuento.</Bubble>
        <Mascot mood="idle" className="w-28 md:w-36" />
      </motion.div>

      <motion.span
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-4 right-6 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-secondary/60"
      >
        scroll
      </motion.span>
    </section>
  );
}
