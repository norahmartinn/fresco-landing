import { useReveal, useCountUp } from "@/hooks/use-reveal";

const bars = [
  { d: "L", v: 42 },
  { d: "M", v: 61 },
  { d: "X", v: 38 },
  { d: "J", v: 74 },
  { d: "V", v: 96 },
  { d: "S", v: 88 },
  { d: "D", v: 55 },
];

function Stat({
  label,
  value,
  unit,
  sub,
  decimals = 0,
  active,
}: {
  label: string;
  value: number;
  unit: string;
  sub?: string;
  decimals?: number;
  active: boolean;
}) {
  const n = useCountUp(value, active);
  return (
    <div>
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] opacity-70">{label}</p>
      <p className="mt-1 font-display text-4xl font-semibold tabular-nums md:text-5xl">
        {n.toLocaleString("es-ES", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        <span className="ml-1 text-xl font-medium">{unit}</span>
      </p>
      {sub ? <p className="text-xs font-semibold uppercase tracking-wide opacity-70">{sub}</p> : null}
    </div>
  );
}

export function ImpactPanel() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.25);

  return (
    <div
      ref={ref}
      data-visible={visible}
      className="reveal pop-card rounded-[2rem] bg-primary p-6 text-secondary md:p-10"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-secondary/25 pb-4">
        <h3 className="font-display text-lg font-semibold uppercase tracking-[0.16em]">
          Impacto en tiempo real
        </h3>
        <span className="live-dot inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary">
          En directo
        </span>
      </div>

      <div className="grid gap-8 py-8 md:grid-cols-[1.1fr_1fr]">
        <Stat
          label="Comida salvada hoy"
          value={24.7}
          decimals={1}
          unit="kg"
          sub="de comida salvada"
          active={visible}
        />
        <div className="grid grid-cols-3 gap-4 border-secondary/25 md:border-l md:pl-6">
          <Stat label="Comidas" value={82} unit="" sub="salvadas" active={visible} />
          <Stat label="CO₂" value={61} unit="kg" sub="evitado" active={visible} />
          <Stat label="Agua" value={129} unit="L" sub="ahorrada" active={visible} />
        </div>
      </div>

      <div className="grid gap-8 border-t-2 border-secondary/25 pt-8 md:grid-cols-3">
        <div>
          <Stat label="Esta semana" value={143} unit="kg" active={visible} />
          <div className="mt-4 flex h-20 items-end gap-2">
            {bars.map((b, i) => (
              <div key={b.d} className="flex flex-1 flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-sm bg-secondary transition-[height] duration-700 ease-out"
                  style={{
                    height: visible ? `${b.v}%` : "0%",
                    transitionDelay: `${i * 90}ms`,
                  }}
                />
                <span className="text-[0.6rem] font-bold opacity-60">{b.d}</span>
              </div>
            ))}
          </div>
        </div>
        <Stat label="Este mes" value={567} unit="kg" sub="comida salvada" active={visible} />
        <Stat label="Total desde siempre" value={3289} unit="kg" sub="comida salvada" active={visible} />
      </div>

      <p className="mt-8 text-center text-sm font-semibold">Gracias por formar parte del cambio ♡</p>
    </div>
  );
}
