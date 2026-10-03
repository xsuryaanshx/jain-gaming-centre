import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BadgeCheck,
  ChevronRight,
  Clock,
  Cpu,
  Fan,
  Gamepad2,
  History,
  Instagram,
  MapPin,
  MessageCircle,
  Microscope,
  Phone,
  Recycle,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Wrench,
  X,
  Zap,
} from "lucide-react";

import heroPs5 from "@/assets/hero-ps5.jpg";
import hallEffect from "@/assets/hall-effect.jpg";
import microSoldering from "@/assets/micro-soldering.jpg";
import liquidMetal from "@/assets/liquid-metal.jpg";

const PHONE_DISPLAY = "+91 93023 18885";
const PHONE_TEL = "tel:+919302318885";
const WA_BASE = "https://wa.me/919302318885";
const MAPS_LINK = "https://share.google/E9DJnqxIOxmBDrTju";
const JUSTDIAL_LINK = "https://jsdl.in/DT-29PI2USI";
const INSTAGRAM_LINK = "https://www.instagram.com/jain_game_center?stkn=MTR0eWhodWMwZDQxcw==";
const MAPS_EMBED =
  "https://www.google.com/maps?q=Jain+Gaming+Centre,+Prashant+Plaza,+5+Sutar+Gali,+Indore,+Madhya+Pradesh+452007&output=embed";

const wa = (text: string) => `${WA_BASE}?text=${encodeURIComponent(text)}`;

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Jain Gaming Centre — Console Store & Repair Lab, Indore" },
      {
        name: "description",
        content:
          "Indore's premier console store and repair lab since 2000. PS5, Xbox & Nintendo Switch sales, Hall-Effect zero-drift mods, microscope micro-soldering, and trade-ins.",
      },
      { property: "og:title", content: "Jain Gaming Centre — Console Store & Repair Lab, Indore" },
      {
        property: "og:description",
        content:
          "Console engineering. Taken further. Hall-Effect upgrades, same-day repairs, and certified hardware — serving Indore since 2000.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

/* ---------------------------------- data ---------------------------------- */

type Product = {
  id: string;
  name: string;
  price: number;
  note: string;
  category: "Consoles" | "Controllers" | "Mods & Parts" | "Certified Pre-Owned";
};

const PRODUCTS: Product[] = [
  {
    id: "ps5",
    name: "Sony PlayStation 5 Slim Disc Edition",
    price: 54990,
    note: "1 Year Sony India Warranty",
    category: "Consoles",
  },
  {
    id: "xsx",
    name: "Microsoft Xbox Series X 1TB",
    price: 49990,
    note: "1 Year Microsoft India Warranty",
    category: "Consoles",
  },
  {
    id: "switch",
    name: "Nintendo Switch OLED Neon",
    price: 28990,
    note: "6 Months Store Warranty",
    category: "Consoles",
  },
  {
    id: "dualsense",
    name: "DualSense Wireless Controller (Hall-Effect Modded)",
    price: 6490,
    note: "Zero Drift Guaranteed",
    category: "Controllers",
  },
  {
    id: "ps4pre",
    name: "Certified Pre-Owned PS4 Slim 1TB Bundle",
    price: 18499,
    note: "Serviced & Cleaned",
    category: "Certified Pre-Owned",
  },
  {
    id: "ksilver",
    name: "K-Silver Hall Effect Joystick Modules (Pair)",
    price: 1199,
    note: "DIY / Bench Install",
    category: "Mods & Parts",
  },
];

const DEVICES = [
  "PS5",
  "PS4",
  "DualSense Controller",
  "Xbox Series X/S",
  "Nintendo Switch",
] as const;
const SYMPTOMS = [
  "Stick Drift",
  "Broken HDMI Port",
  "Overheating Fan",
  "Power Failure",
  "Disc Read Error",
  "Hall-Effect Mod",
] as const;

const REPAIR_MATRIX: Record<string, { price: string; time: string }> = {
  "Stick Drift": { price: "₹850 – ₹1,200", time: "30–45 mins" },
  "Broken HDMI Port": { price: "₹1,800 – ₹2,500", time: "45–60 mins" },
  "Overheating Fan": { price: "₹1,200 – ₹1,800", time: "60–90 mins" },
  "Power Failure": { price: "₹1,500 – ₹3,000", time: "Same day" },
  "Disc Read Error": { price: "₹900 – ₹1,600", time: "45–60 mins" },
  "Hall-Effect Mod": { price: "₹1,499", time: "30 mins" },
};

const TRADE_IN = [
  { model: "PlayStation 4 Slim", value: "₹9,000 – ₹11,000" },
  { model: "PlayStation 4 Pro", value: "₹12,000 – ₹15,000" },
  { model: "Xbox One S / X", value: "₹7,000 – ₹11,000" },
  { model: "Nintendo Switch", value: "₹10,000 – ₹14,000" },
];

const NAV_LINKS = [
  { label: "Consoles", href: "#catalog" },
  { label: "Hall-Effect Lab", href: "#lab" },
  { label: "25-Yr Legacy", href: "#legacy" },
  { label: "Repair Bench", href: "#repair" },
  { label: "Trade-In", href: "#trade-in" },
  { label: "Visit Store", href: "#visit" },
];

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/* --------------------------------- hooks ---------------------------------- */

function useOpenStatus() {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const check = () => {
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const day = now.getDay(); // 0 = Sunday
      const hour = now.getHours();
      setOpen(day === 0 ? true : hour >= 12 && hour < 21);
    };
    check();
    const t = setInterval(check, 60_000);
    return () => clearInterval(t);
  }, []);
  return open;
}

/* --------------------------------- page ----------------------------------- */

function Index() {
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [tab, setTab] = useState<string>("Consoles");
  const [device, setDevice] = useState<string | null>(null);
  const [symptom, setSymptom] = useState<string | null>(null);
  const isOpen = useOpenStatus();

  const subtotal = useMemo(() => cart.reduce((s, p) => s + p.price, 0), [cart]);
  const filtered = PRODUCTS.filter((p) => p.category === tab);
  const repair = symptom ? REPAIR_MATRIX[symptom] : null;

  const addToCart = (p: Product) => {
    setCart((c) => [...c, p]);
    setCartOpen(true);
  };

  const cartMessage = `Hi Jain Gaming Centre! I'd like to order for in-store pickup:\n${cart
    .map((p) => `• ${p.name} — ${inr(p.price)}`)
    .join("\n")}\nSubtotal: ${inr(subtotal)}`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ------------------------------- Nav ------------------------------- */}
      <header className="glass-nav fixed inset-x-0 top-0 z-50">
        <nav className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2 focus-ring rounded-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground text-[11px] font-bold text-background">
              JG
            </span>
            <span className="hidden text-xs font-medium tracking-tight sm:inline">
              Jain Gaming Centre
            </span>
          </a>
          <div className="hidden items-center gap-6 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs text-muted-foreground transition-colors hover:text-foreground focus-ring rounded-sm"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              href={wa("Hi Jain Gaming Centre! I'd like to place an order.")}
              target="_blank"
              rel="noreferrer"
              className="btn-press focus-ring hidden rounded-full bg-foreground px-3.5 py-1.5 text-xs font-medium text-background sm:inline-flex"
            >
              Order via WhatsApp
            </a>
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open shopping bag"
              className="btn-press focus-ring relative rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ShoppingBag className="h-4 w-4" />
              {cart.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[9px] font-semibold text-background">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* ------------------------------- Hero ------------------------------ */}
      <section id="top" className="mx-auto max-w-5xl px-4 pt-32 sm:px-6 sm:pt-40">
        <div className="fade-up text-center">
          <h1 className="tracking-headline text-5xl font-semibold leading-[1.05] sm:text-7xl">
            Console engineering.
            <br />
            Taken further.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            PlayStation 5, Xbox, and Nintendo Switch hardware. Upgraded with Hall-Effect zero-drift
            analog technology. Serving Indore since 2000.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            <a
              href="#catalog"
              className="btn-press focus-ring rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
            >
              Explore Consoles
            </a>
            <a
              href="#repair"
              className="focus-ring group inline-flex items-center gap-1 rounded-sm text-sm font-medium text-link"
            >
              Diagnose a Repair
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <div className="fade-up mt-14 overflow-hidden rounded-3xl border border-border bg-card">
          <img
            src={heroPs5}
            alt="PlayStation 5 console in a dark studio"
            width={1600}
            height={1200}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground sm:text-sm">
          <a
            href="#legacy"
            className="focus-ring inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-foreground"
          >
            <Clock className="h-3.5 w-3.5" /> 25+ Years Legacy (Est. 2000)
          </a>
          <span className="inline-flex items-center gap-1.5">
            <Wrench className="h-3.5 w-3.5" /> 15,000+ Consoles Serviced
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5 fill-current" /> 4.8 Customer Rating · 232+ Reviews
          </span>
        </div>
      </section>

      {/* --------------------------- Teardown grid -------------------------- */}
      <section id="lab" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32">
        <h2 className="tracking-headline text-center text-3xl font-semibold sm:text-5xl">
          Inside the machine.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-sm text-muted-foreground sm:text-base">
          Every console that leaves our bench is rebuilt to a standard, not a price.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            {
              img: hallEffect,
              icon: Gamepad2,
              title: "Hall-Effect Magnetic Sticks",
              body: "Permanent contactless electromagnetic sensors. No potentiometers to wear out — 0% stick drift, guaranteed for life.",
            },
            {
              img: microSoldering,
              icon: Microscope,
              title: "Microscope Micro-Soldering",
              body: "Board-level trace repairs and HDMI 2.1 port replacement, verified at 4K@120Hz before your console leaves the bench.",
            },
            {
              img: liquidMetal,
              icon: Cpu,
              title: "Liquid Metal APU Thermal Service",
              body: "Processor die resurfaced with authentic Thermal Grizzly liquid metal. Fan noise and overheating, eliminated.",
            },
          ].map((f) => (
            <article
              key={f.title}
              className="card-lift overflow-hidden rounded-3xl border border-border bg-card"
            >
              <img
                src={f.img}
                alt={f.title}
                loading="lazy"
                width={1200}
                height={900}
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-6">
                <f.icon className="h-5 w-5 text-muted-foreground" />
                <h3 className="tracking-headline mt-3 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------- 25 Years of Legacy ----------------------- */}
      <section
        id="legacy"
        className="scroll-mt-20 border-t border-border bg-gradient-to-b from-background via-card/50 to-background px-4 py-24 sm:px-6 sm:py-32"
      >
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1 text-xs font-medium text-muted-foreground">
              <Award className="h-3.5 w-3.5 text-foreground" />
              <span>EST. 2000 · NOVELTY MARKET, INDORE</span>
            </div>
            <h2 className="tracking-headline mt-6 text-3xl font-semibold sm:text-5xl">
              25+ years of console engineering.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Before HDMI, before digital downloads, and before wireless controllers. Jain Gaming
              Centre has anchored Indore's gaming community through four console revolutions.
            </p>
          </div>

          {/* Era Grid */}
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                period: "2000 – 2006",
                tag: "Gen 5 & 6",
                title: "The Disc & Laser Era",
                tech: "PS1 · PS2 · GameBoy Advance",
                description:
                  "Optical laser pickups, memory card servicing, and the original gaming counter at Prashant Plaza.",
              },
              {
                period: "2006 – 2013",
                tag: "Gen 7",
                title: "High-Definition & HDMI",
                tech: "PS3 · Xbox 360 · PSP",
                description:
                  "Pioneering BGA heat-sink rework, HDMI board-level soldering, and early optical drive laser replacements.",
              },
              {
                period: "2013 – 2020",
                tag: "Gen 8",
                title: "Precision Maintenance",
                tech: "PS4 · PS4 Pro · Xbox One",
                description:
                  "APU thermal paste overhauls, cooling duct optimizations, and precision analog potentiometer rebuilds.",
              },
              {
                period: "2020 – Today",
                tag: "Gen 9",
                title: "Contactless Magnetic Era",
                tech: "PS5 · Series X · Switch OLED",
                description:
                  "Zero-drift Hall-Effect magnetic modules, Thermal Grizzly liquid metal resurfacing, and 4K@120Hz trace diagnostics.",
              },
            ].map((era, idx) => (
              <div
                key={era.period}
                className="card-lift relative flex flex-col justify-between rounded-3xl border border-border bg-card p-6"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-muted-foreground">{era.period}</span>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium text-foreground">
                      {era.tag}
                    </span>
                  </div>
                  <h3 className="tracking-headline mt-4 text-base font-semibold text-foreground">
                    {era.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">{era.tech}</p>
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {era.description}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1.5 border-t border-border/40 pt-4 text-[11px] text-muted-foreground/80">
                  <span className="flex h-1.5 w-1.5 rounded-full bg-foreground/60" />
                  <span>Era {idx + 1} of 4</span>
                </div>
              </div>
            ))}
          </div>

          {/* Heritage Stats & Founder Promise */}
          <div className="mt-8 rounded-3xl border border-border bg-card p-6 sm:p-10">
            <div className="grid gap-6 sm:grid-cols-3 sm:divide-x sm:divide-border">
              <div className="sm:pr-6">
                <p className="tracking-headline text-3xl font-semibold text-foreground sm:text-4xl">
                  26 <span className="text-xl font-normal text-muted-foreground">Years</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Continuous operation at Prashant Plaza, Sutar Gali
                </p>
              </div>
              <div className="sm:px-6">
                <p className="tracking-headline text-3xl font-semibold text-foreground sm:text-4xl">
                  15,000+
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Consoles, controllers & logic boards restored
                </p>
              </div>
              <div className="sm:pl-6">
                <p className="tracking-headline text-3xl font-semibold text-foreground sm:text-4xl">
                  3 Generations
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Gamers who bought PS2 here now bring their kids for PS5
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-border pt-6 text-center sm:text-left">
              <p className="text-xs italic leading-relaxed text-muted-foreground sm:text-sm">
                “In 2000, repairs meant manual laser diode calibration. Today, it means
                micro-soldering under stereo optics with liquid metal and electromagnetic sensors.
                The tools evolved, but our standard never changed: if it leaves our bench, it runs
                better than the day it came out of the box.”
              </p>
              <p className="mt-3 text-xs font-semibold text-foreground">
                — Jain Gaming Centre · Bench Standard since 2000
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------- Repair calculator ---------------------- */}
      <section id="repair" className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-3xl scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32">
          <div className="text-center">
            <h2 className="tracking-headline text-3xl font-semibold sm:text-5xl">
              Instant repair estimate.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
              Two taps. Transparent pricing, same-day turnaround, 90-day bench warranty.
            </p>
          </div>

          <div className="mt-12 rounded-3xl border border-border bg-card p-6 sm:p-8">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              1 · Your device
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {DEVICES.map((d) => (
                <button
                  key={d}
                  onClick={() => setDevice(d)}
                  className={`btn-press focus-ring rounded-full border px-4 py-2 text-sm ${
                    device === d
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            <p className="mt-8 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              2 · The symptom
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {SYMPTOMS.map((s) => (
                <button
                  key={s}
                  onClick={() => setSymptom(s)}
                  className={`btn-press focus-ring rounded-full border px-4 py-2 text-sm ${
                    symptom === s
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {device && repair && (
              <div className="fade-up mt-8 rounded-2xl border border-border bg-secondary p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {device} · {symptom}
                    </p>
                    <p className="tracking-headline mt-1 text-3xl font-semibold">{repair.price}</p>
                  </div>
                  <div className="space-y-1.5 text-right text-xs text-muted-foreground">
                    <p className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" /> {repair.time} · same-day
                    </p>
                    <p className="flex items-center justify-end gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5" /> 90-day bench warranty
                    </p>
                  </div>
                </div>
                <a
                  href={wa(
                    `Hi! I need a repair: ${device} — ${symptom}. Estimate shown: ${repair.price}. Can I book a slot?`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-press focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
                >
                  <MessageCircle className="h-4 w-4" /> Book on WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ------------------------------ Catalog ----------------------------- */}
      <section id="catalog" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32">
        <h2 className="tracking-headline text-center text-3xl font-semibold sm:text-5xl">
          Hardware & accessories.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-center text-sm text-muted-foreground sm:text-base">
          Genuine stock, billed with GST invoice. In-store pickup at Nagar Nigam, Indore.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {["Consoles", "Controllers", "Mods & Parts", "Certified Pre-Owned"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`btn-press focus-ring rounded-full border px-4 py-2 text-sm ${
                tab === t
                  ? "border-foreground bg-foreground text-background"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="card-lift flex flex-col rounded-3xl border border-border bg-card p-6"
            >
              <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                {p.category}
              </p>
              <h3 className="tracking-headline mt-2 text-lg font-semibold leading-snug">
                {p.name}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">{p.note}</p>
              <div className="mt-auto flex items-center justify-between pt-6">
                <span className="tracking-headline text-xl font-semibold">{inr(p.price)}</span>
                <button
                  onClick={() => addToCart(p)}
                  className="btn-press focus-ring rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background"
                >
                  Add to Bag
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ----------------------------- Trade-in ----------------------------- */}
      <section id="trade-in" className="border-y border-border bg-card/40">
        <div className="mx-auto max-w-3xl scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32">
          <div className="text-center">
            <Recycle className="mx-auto h-6 w-6 text-muted-foreground" />
            <h2 className="tracking-headline mt-4 text-3xl font-semibold sm:text-5xl">
              Trade in your current console. Upgrade to PS5.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground sm:text-base">
              Instant evaluation at the counter, or send photos on WhatsApp for a quote before you
              visit.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl border border-border bg-card">
            {TRADE_IN.map((t, i) => (
              <div
                key={t.model}
                className={`flex items-center justify-between px-6 py-5 ${i > 0 ? "border-t border-border" : ""}`}
              >
                <span className="text-sm font-medium">{t.model}</span>
                <span className="text-sm text-muted-foreground">{t.value}</span>
              </div>
            ))}
            <div className="border-t border-border px-6 py-5">
              <a
                href={wa("Hi! I'd like a trade-in evaluation for my console.")}
                target="_blank"
                rel="noreferrer"
                className="btn-press focus-ring inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
              >
                Get WhatsApp Evaluation <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ Visit ------------------------------- */}
      <section id="visit" className="mx-auto max-w-5xl scroll-mt-20 px-4 py-24 sm:px-6 sm:py-32">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium ${
                isOpen ? "border-border text-success" : "border-border text-muted-foreground"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${isOpen ? "bg-success" : "bg-muted-foreground"}`}
              />
              {isOpen ? "Open now" : "Closed — opens 12:00 PM"}
            </span>
            <h2 className="tracking-headline mt-6 text-3xl font-semibold sm:text-5xl">
              Visit the store.
            </h2>
            <address className="mt-6 text-sm not-italic leading-relaxed text-muted-foreground sm:text-base">
              Jain Gaming Centre
              <br />
              Prashant Plaza, 5 Sutar Gali,
              <br />
              Opposite Original Novelty Market,
              <br />
              Nagar Nigam, Indore – 452007 (M.P.)
            </address>
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> Mon – Sat: 12:00 PM – 9:00 PM
              </p>
              <p className="flex items-center gap-2">
                <Zap className="h-4 w-4" /> Sunday: Open 24 Hours
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={PHONE_TEL}
                className="btn-press focus-ring inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
              >
                <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
              </a>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noreferrer"
                className="btn-press focus-ring inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
              >
                <MapPin className="h-4 w-4" /> Google Maps
              </a>
              <a
                href={JUSTDIAL_LINK}
                target="_blank"
                rel="noreferrer"
                className="btn-press focus-ring inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
              >
                <BadgeCheck className="h-4 w-4" /> JustDial
              </a>
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noreferrer"
                className="btn-press focus-ring inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent"
              >
                <Instagram className="h-4 w-4" /> Instagram (@jain_game_center)
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border bg-card">
            <iframe
              title="Jain Gaming Centre on Google Maps"
              src={MAPS_EMBED}
              className="h-[380px] w-full grayscale invert-[0.92] contrast-[0.9]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------ Footer ------------------------------ */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-foreground text-[11px] font-bold text-background">
                JG
              </span>
              <span className="text-xs font-medium">Jain Gaming Centre</span>
            </div>
            <nav className="flex flex-wrap gap-x-6 gap-y-2">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <p className="mt-8 max-w-2xl text-[11px] leading-relaxed text-muted-foreground">
            PlayStation, DualSense, Xbox, and Nintendo Switch are trademarks of their respective
            owners. Jain Gaming Centre is an independent retailer and repair lab and is not
            affiliated with Sony, Microsoft, or Nintendo. All repairs carry a 90-day bench warranty
            on parts and labour.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-[11px] text-muted-foreground">
            <span>© 2000–2026 Jain Gaming Centre, Indore. All rights reserved.</span>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={INSTAGRAM_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <Instagram className="h-3.5 w-3.5" /> @jain_game_center
              </a>
              <a
                href={PHONE_TEL}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                Store helpline: {PHONE_DISPLAY} <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ---------------------------- Cart sheet ----------------------------- */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-[60]"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping bag"
        >
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <h2 className="text-sm font-semibold">Your Bag</h2>
              <button
                onClick={() => setCartOpen(false)}
                aria-label="Close bag"
                className="btn-press focus-ring rounded-full p-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0 ? (
                <p className="mt-10 text-center text-sm text-muted-foreground">
                  Your bag is empty.
                </p>
              ) : (
                <ul className="space-y-4">
                  {cart.map((p, i) => (
                    <li
                      key={`${p.id}-${i}`}
                      className="flex items-start justify-between gap-3 text-sm"
                    >
                      <div>
                        <p className="font-medium leading-snug">{p.name}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">{p.note}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="whitespace-nowrap">{inr(p.price)}</span>
                        <button
                          onClick={() => setCart((c) => c.filter((_, j) => j !== i))}
                          aria-label={`Remove ${p.name}`}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="border-t border-border px-6 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="tracking-headline text-lg font-semibold">{inr(subtotal)}</span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                In-store pickup at Nagar Nigam, Indore.
              </p>
              <a
                href={cart.length ? wa(cartMessage) : undefined}
                target="_blank"
                rel="noreferrer"
                aria-disabled={cart.length === 0}
                className={`btn-press focus-ring mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium ${
                  cart.length
                    ? "bg-foreground text-background"
                    : "pointer-events-none bg-secondary text-muted-foreground"
                }`}
              >
                <MessageCircle className="h-4 w-4" /> Checkout via WhatsApp
              </a>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
