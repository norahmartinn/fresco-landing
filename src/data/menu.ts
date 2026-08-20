// Carta fija de FRESCÓ (9 platos) + los 12 ingredientes monitorizados.
// La carta no cambia: señalamos los platos con ingredientes más urgentes.


export type Dish = {
  id: string;
  name: string;
  base: number; // prioridad base calculada por el motor
  why: string;
  key: string[]; // ingredientes clave
};

export const dishes: Dish[] = [
  {
    id: "P9",
    name: "Pasta al pesto con pollo",
    base: 94,
    why: "señalamos por la albahaca, que se estropea en 18 h",
    key: ["Albahaca", "Pollo", "Parmesano"],
  },
  {
    id: "P2",
    name: "Burrata con tomate y pesto",
    base: 88,
    why: "señalamos por la burrata, que vence en 24 h",
    key: ["Burrata", "Tomate", "Albahaca"],
  },
  {
    id: "P6",
    name: "Pollo crujiente con patata y yogur",
    base: 79,
    why: "señalamos por el pollo, que hay que gastar hoy",
    key: ["Pollo", "Patata", "Yogur"],
  },
  {
    id: "P5",
    name: "Gnocchi de calabacín y parmesano",
    base: 71,
    why: "señalamos porque el calabacín está en ventana media",
    key: ["Calabacín", "Parmesano", "Albahaca"],
  },
  {
    id: "P1",
    name: "Gazpacho de tomate asado",
    base: 64,
    why: "señalamos por el tomate, 240 g por ración y hoy al límite",
    key: ["Tomate", "Pimiento"],
  },
  {
    id: "P4",
    name: "Croquetas de pollo y hierbas",
    base: 57,
    why: "señalamos para aprovechar el pollo del día antes de que caduque",
    key: ["Pollo", "Huevo", "Calabacín"],
  },
  {
    id: "P8",
    name: "Berenjena asada con garbanzos y yogur",
    base: 48,
    why: "berenjena estable, 72 h, hoy no señalamos",
    key: ["Berenjena", "Garbanzos", "Yogur"],
  },
  {
    id: "P3",
    name: "Focaccia de verduras",
    base: 41,
    why: "verduras de larga vida, hoy no señalamos",
    key: ["Calabacín", "Pimiento", "Tomate"],
  },
  {
    id: "P7",
    name: "Arroz meloso de verduras",
    base: 33,
    why: "stock holgado, hoy no señalamos, se puede esperar",
    key: ["Garbanzos", "Calabacín", "Parmesano"],
  },
];

export type Ingredient = {
  id: string;
  name: string;
  stock: string;
  life: number; // horas de vida útil
  priority: "CRÍTICA" | "ALTA" | "MEDIA" | "BAJA";
  pct: number; // urgencia 0-100
};

export const ingredients: Ingredient[] = [
  { id: "I05", name: "Albahaca fresca", stock: "0,60 kg", life: 18, priority: "CRÍTICA", pct: 96 },
  { id: "I08", name: "Pollo", stock: "3,00 kg", life: 24, priority: "ALTA", pct: 88 },
  { id: "I09", name: "Burrata", stock: "1,20 kg", life: 24, priority: "ALTA", pct: 85 },
  { id: "I01", name: "Tomate", stock: "5,00 kg", life: 48, priority: "ALTA", pct: 72 },
  { id: "I06", name: "Garbanzos cocidos", stock: "2,00 kg", life: 48, priority: "MEDIA", pct: 64 },
  { id: "I02", name: "Calabacín", stock: "3,50 kg", life: 72, priority: "MEDIA", pct: 52 },
  { id: "I03", name: "Pimiento rojo", stock: "2,50 kg", life: 72, priority: "MEDIA", pct: 49 },
  { id: "I04", name: "Berenjena", stock: "2,50 kg", life: 72, priority: "MEDIA", pct: 46 },
  { id: "I12", name: "Yogur griego", stock: "1,50 kg", life: 72, priority: "MEDIA", pct: 44 },
  { id: "I07", name: "Patata", stock: "5,00 kg", life: 120, priority: "BAJA", pct: 31 },
  { id: "I10", name: "Huevo", stock: "2,00 kg", life: 168, priority: "BAJA", pct: 18 },
  { id: "I11", name: "Parmesano", stock: "1,50 kg", life: 336, priority: "BAJA", pct: 9 },
];
