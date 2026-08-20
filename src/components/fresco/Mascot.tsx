import { motion } from "framer-motion";
import mascot from "@/assets/mascot.asset.json";

type Mood = "idle" | "walk" | "point" | "surprised" | "cheer";

const variants: Record<Mood, any> = {
  idle: { y: [0, -10, 0], rotate: [-2, 2, -2], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } },
  walk: { rotate: [-6, 6, -6], y: [0, -6, 0], transition: { duration: 0.7, repeat: Infinity, ease: "easeInOut" } },
  point: { rotate: [0, -8, 0], transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" } },
  surprised: { scale: [1, 1.08, 1], y: [0, -14, 0], transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" } },
  cheer: { rotate: [-10, 10, -10], scale: [1, 1.05, 1], transition: { duration: 1, repeat: Infinity, ease: "easeInOut" } },
};

export function Mascot({
  mood = "idle",
  className = "",
  flip = false,
}: {
  mood?: Mood;
  className?: string;
  flip?: boolean;
}) {
  return (
    <motion.img
      src={mascot.url}
      alt="Mascota de FRESCÓ"
      animate={variants[mood]}
      style={{ scaleX: flip ? -1 : 1 }}
      className={`select-none ${className}`}
      draggable={false}
    />
  );
}

export function Bubble({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ delay, type: "spring", stiffness: 240, damping: 18 }}
      className={`relative inline-block rounded-[1.25rem] border-2 border-secondary bg-background px-4 py-2 font-script text-2xl leading-none text-secondary shadow-[4px_4px_0_var(--secondary)] ${className}`}
    >
      {children}
      <span className="absolute -bottom-2 left-6 h-4 w-4 rotate-45 border-b-2 border-r-2 border-secondary bg-background" />
    </motion.div>
  );
}
