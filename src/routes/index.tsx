import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.asset.json";
import mascot from "@/assets/mascot.asset.json";
import interior from "@/assets/interior.asset.json";
import terraza from "@/assets/terraza.asset.json";
import plato from "@/assets/plato.asset.json";
import { Reveal } from "@/components/fresco/Reveal";
import { ImpactPanel } from "@/components/fresco/ImpactPanel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FRESCÓ — Real food. Real time." },
      {
        name: "description",
        content:
          "FRESCÓ es el restaurante de menú vivo: una IA reordena la carta cada día según los ingredientes frescos disponibles para que nada se desperdicie.",
      },
      { property: "og:title", content: "FRESCÓ — Real food. Real time." },
      {
        property: "og:description",
        content:
          "Menú dinámico impulsado por IA, cocina de producto fresco y cero desperdicio. Reserva mesa en FRESCÓ.",
      },
      { property: "og:image", content: interior.url },
      { name: "twitter:image", content: interior.url },
    ],
  }),
  component: Index,
});

const marqueeWords = [
  "REAL FOOD",
  "REAL TIME",
  "CERO DESPERDICIO",
  "MENÚ VIVO",
  "PRODUCTO DE TEMPORADA",
  "COCINA HONESTA",
];

const steps = [
  {
    n: "01",
    t: "Entra el producto",
    d: "Cada mañana registramos lo que llega del mercado: cantidad, frescura y ventana óptima de uso.",
  },
  {
    n: "02",
    t: "La IA piensa el menú",
    d: "El motor cruza inventario, demanda y coste para decidir qué platos merecen protagonismo hoy.",
  },
  {
    n: "03",
    t: "Tú eliges, nada sobra",
    d: "La carta digital se reordena en tiempo real y cada pedido convierte producto fresco en cero desperdicio.",
  },
];

const dishes = [
  { name: "Pollo crujiente", note: "patata asada · yogur · limón", tag: "Hoy destacado", urgency: 92 },
  { name: "Calabaza asada", note: "tahini · granada · menta", tag: "Aprovecha hoy", urgency: 78 },
  { name: "Ensalada de tomate", note: "albahaca · pan tostado", tag: "Últimas raciones", urgency: 64 },
];

function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const tick = () =>
      setTime(new Date().toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }));
    tick();
    const id = setInterval(tick, 20000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearInterval(id);
    };
  }, []);

  return (
    <main className="overflow-x-hidden bg-background">
      {/* NAV */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-primary/95 py-3 backdrop-blur" : "bg-transparent py-6"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5">
          <img src={logo.url} alt="FRESCÓ" className="h-9 w-auto md:h-11" />
          <div className="hidden items-center gap-8 text-sm font-bold uppercase tracking-[0.14em] md:flex">
            <a href="#menu" className="transition-opacity hover:opacity-60">
              Menú vivo
            </a>
            <a href="#impacto" className="transition-opacity hover:opacity-60">
              Impacto
            </a>
            <a href="#casa" className="transition-opacity hover:opacity-60">
              La casa
            </a>
          </div>
          <a
            href="#reserva"
            className="rounded-full bg-secondary px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-primary transition-transform hover:scale-105"
          >
            Reservar
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-primary pt-28 pb-16">
        <div className="blob-shape absolute -left-32 top-10 h-96 w-96 bg-secondary/10" />
        <div className="blob-shape absolute -right-24 bottom-0 h-[28rem] w-[28rem] bg-cream/50" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 md:grid-cols-[1.15fr_1fr]">
          <div>
            <Reveal>
              <span className="live-dot inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-primary">
                Menú actualizado {time || "ahora"}
              </span>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="mt-6 font-display text-6xl font-semibold leading-[0.92] text-secondary sm:text-7xl lg:text-8xl">
                Real food.
                <br />
                Real time.
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-md text-lg font-medium text-secondary/80">
                Un restaurante donde la carta cambia cada día. Nuestra IA escucha a la despensa y
                convierte lo más fresco en el plato que hoy te apetece.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#menu"
                  className="pop-card rounded-full bg-secondary px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-primary"
                >
                  Ver menú
                </a>
                <a
                  href="#impacto"
                  className="rounded-full border-2 border-secondary px-8 py-4 text-sm font-bold uppercase tracking-[0.16em] text-secondary transition-colors hover:bg-secondary hover:text-primary"
                >
                  Nuestro impacto
                </a>
              </div>
            </Reveal>
          </div>
          <div className="relative flex justify-center">
            <img
              src={mascot.url}
              alt="Mascota de FRESCÓ saludando"
              className="float-slow w-64 drop-shadow-xl md:w-80"
            />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y-2 border-secondary bg-secondary py-4">
        <div className="marquee-track gap-10 text-primary">
          {[0, 1].map((k) => (
            <div key={k} className="flex shrink-0 items-center gap-10 pr-10">
              {marqueeWords.map((w) => (
                <span
                  key={w + k}
                  className="font-display text-xl font-semibold uppercase tracking-[0.2em]"
                >
                  {w} <span className="opacity-50">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* MENÚ VIVO */}
      <section id="menu" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <div className="grid gap-14 md:grid-cols-2 md:items-center">
          <Reveal>
            <div className="relative">
              <img
                src={plato.url}
                alt="Pollo crujiente con patata y yogur de FRESCÓ"
                className="pop-card w-full rounded-[2rem] object-cover"
                loading="lazy"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="font-script text-3xl text-leaf">la carta de hoy</p>
              <h2 className="mt-2 font-display text-5xl font-semibold leading-tight md:text-6xl">
                Un menú que se escribe solo, cada servicio
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 text-lg text-muted-foreground">
                Los platos suben y bajan de la carta según lo que la cocina necesita aprovechar. Sin
                trampas: solo producto en su mejor momento.
              </p>
            </Reveal>
            <div className="mt-8 space-y-4">
              {dishes.map((d, i) => (
                <Reveal key={d.name} delay={160 + i * 90}>
                  <article className="pop-card group rounded-2xl bg-card p-5">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl font-semibold">{d.name}</h3>
                      <span className="rounded-full bg-primary px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.16em]">
                        {d.tag}
                      </span>
                    </div>
                    <p className="mt-1 font-script text-2xl text-leaf">{d.note}</p>
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-leaf transition-[width] duration-1000 ease-out group-hover:bg-terracotta"
                        style={{ width: `${d.urgency}%` }}
                      />
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="bg-cream py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5">
          <Reveal>
            <h2 className="max-w-2xl font-display text-5xl font-semibold leading-tight md:text-6xl">
              Del mercado a tu mesa, sin nada por el camino
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 120}>
                <div className="pop-card h-full rounded-[1.75rem] bg-background p-8">
                  <span className="font-display text-6xl font-semibold text-primary">{s.n}</span>
                  <h3 className="mt-4 font-display text-2xl font-semibold">{s.t}</h3>
                  <p className="mt-3 text-muted-foreground">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACTO */}
      <section id="impacto" className="bg-secondary py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5">
          <Reveal>
            <p className="text-center font-script text-3xl text-primary">nuestros números</p>
            <h2 className="mt-2 text-center font-display text-5xl font-semibold text-primary md:text-6xl">
              Cada plato cuenta
            </h2>
          </Reveal>
          <div className="mt-12">
            <ImpactPanel />
          </div>
        </div>
      </section>

      {/* LA CASA */}
      <section id="casa" className="mx-auto max-w-6xl px-5 py-24 md:py-32">
        <Reveal>
          <h2 className="max-w-xl font-display text-5xl font-semibold leading-tight md:text-6xl">
            Plantas, luz cálida y mesas largas
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <img
              src={interior.url}
              alt="Interior del restaurante FRESCÓ con plantas y pantalla de impacto"
              className="pop-card h-full w-full rounded-[2rem] object-cover"
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={140} className="md:col-span-2">
            <img
              src={terraza.url}
              alt="Terraza ajardinada del restaurante FRESCÓ"
              className="pop-card h-full w-full rounded-[2rem] object-cover"
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      {/* RESERVA */}
      <section id="reserva" className="relative overflow-hidden bg-primary py-24 md:py-32">
        <div className="blob-shape absolute -bottom-24 -left-16 h-80 w-80 bg-secondary/10" />
        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 text-center">
          <img src={mascot.url} alt="" aria-hidden className="float-slow w-28" />
          <Reveal>
            <h2 className="mt-6 font-display text-5xl font-semibold leading-tight text-secondary md:text-7xl">
              Ven a comer algo que hoy tenía prisa
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-lg text-lg font-medium text-secondary/80">
              Calle Verde 12, Madrid · Todos los días de 13:00 a 23:30
            </p>
          </Reveal>
          <Reveal delay={200}>
            <a
              href="mailto:hola@fresco.food"
              className="pop-card mt-9 inline-block rounded-full bg-secondary px-10 py-4 text-sm font-bold uppercase tracking-[0.18em] text-primary"
            >
              Reservar mesa
            </a>
          </Reveal>
        </div>
      </section>

      <footer className="bg-secondary py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 text-primary md:flex-row md:justify-between">
          <span className="font-display text-xl font-semibold uppercase tracking-[0.2em]">
            Frescó
          </span>
          <p className="text-sm opacity-70">Real food. Real time. © {new Date().getFullYear()}</p>
        </div>
      </footer>
    </main>
  );
}
