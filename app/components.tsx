"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { emailLink, tiktokLink, P, routes, studio, styles, telLink } from "./site";

/* Images live in /public/images. Missing files fall back to a tonal block. */
export function Photo({
  src,
  alt,
  tone = "#d9cdbd",
  className = "",
  delay = 0,
  parallax = 0,
  position = "center",
}: {
  src: string;
  alt: string;
  tone?: string;
  className?: string;
  delay?: number;
  parallax?: number;
  position?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [shown, setShown] = useState(false);
  const [ok, setOk] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!parallax) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const update = () => {
      const el = ref.current;
      const img = imgRef.current;
      if (!el || !img) return;
      const r = el.getBoundingClientRect();
      const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
      img.style.transform = `translate3d(0, ${p * -parallax}px, 0) scale(1.12)`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [parallax]);

  // Reveal with a tone-coloured cover that retracts, never a clip-path on the image: a clipped
  // image counts as invisible, so the observer never fires and lazy loading never starts.
  return (
    <div
      ref={ref}
      style={{ background: tone }}
      className={`zoom overflow-hidden ${/\babsolute\b/.test(className) ? "" : "relative"} ${className}`}
    >
      {ok && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setOk(false)}
          style={{ objectPosition: position }}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />
      )}
      <div
        aria-hidden
        style={{ background: tone, ["--d" as string]: `${delay}s` }}
        className={`img-cover pointer-events-none absolute inset-0 ${shown ? "in" : ""}`}
      />
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ ["--d" as string]: `${delay}s` }}
      className={`reveal ${shown ? "in" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

/* Heading whose lines slide up from a mask when scrolled into view. */
export function Slide({
  lines,
  className = "",
}: {
  lines: ReactNode[];
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), io.disconnect()),
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <h2 ref={ref} className={`display ${className}`}>
      {lines.map((l, n) => (
        <span key={n} className={`sline ${shown ? "in" : ""}`}>
          <span style={{ ["--d" as string]: `${n * 0.18}s` }}>{l}</span>
        </span>
      ))}
    </h2>
  );
}




export function Logo({
  className = "",
  src = "/images/logo-wordmark.png",
}: {
  className?: string;
  src?: string;
}) {
  const [ok, setOk] = useState(true);
  return (
    <Link href="/" aria-label="The Polish Haus" className={`block ${className}`}>
      {ok ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt="The Polish Haus"
          onError={() => setOk(false)}
          className="h-full w-auto"
        />
      ) : (
        <span className="display block whitespace-nowrap uppercase tracking-[0.18em]">
          The Polish Haus
        </span>
      )}
    </Link>
  );
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <div
        className={`mx-auto flex max-w-[1400px] items-center justify-between rounded-full border px-5 backdrop-blur-xl transition-all duration-700 md:px-8 ${
          scrolled
            ? "h-14 border-pink/25 bg-white shadow-[0_14px_40px_-14px_rgba(58,15,32,0.35)]"
            : "h-[4.5rem] border-white bg-white/95 shadow-[0_16px_44px_-12px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.6)]"
        }`}
      >
        <Logo className={`transition-all duration-700 ${scrolled ? "h-6" : "h-8"}`} />

        <div className="flex items-center justify-end gap-9">
          <nav className="label hidden items-center gap-9 !text-[0.78rem] xl:flex">
            {routes.map(([t, h]) => (
              <Link
                key={h}
                href={h}
                aria-current={pathname === h ? "page" : undefined}
                className="ul aria-[current=page]:text-pinkdeep"
              >
                {t}
              </Link>
            ))}
          </nav>
          {/* .btn sets display, so it needs an important utility to stay hidden on small screens */}
          <Link href="/book" className="btn btn-pink label !py-3 max-md:!hidden">
            Book an Appointment
          </Link>
          <button
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="relative h-8 w-8 xl:hidden"
          >
            <span
              className={`absolute left-1 right-1 h-px bg-ink transition-all duration-500 ${open ? "top-4 rotate-45" : "top-3"}`}
            />
            <span
              className={`absolute left-1 right-1 h-px bg-ink transition-all duration-500 ${open ? "top-4 -rotate-45" : "top-5"}`}
            />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 -z-10 flex flex-col justify-between bg-blush px-6 pb-10 pt-32 transition-all duration-700 xl:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-4">
          {routes.map(([t, h]) => (
            <Link
              key={h}
              href={h}
              onClick={() => setOpen(false)}
              className={`display text-4xl uppercase ${pathname === h ? "text-pinkdeep" : ""}`}
            >
              {t}
            </Link>
          ))}
        </nav>
        <Link href="/book" onClick={() => setOpen(false)} className="btn btn-pink label">
          Book an Appointment
        </Link>
      </div>
    </header>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-4 w-4 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M4 12h16m-6-6 6 6-6 6" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="overflow-hidden px-8 pt-16 md:px-14 md:pt-20">
      <div className="mx-auto max-w-[1336px]">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo src="/images/logo.png" className="h-32 md:h-40" />
          </div>
          <nav className="label flex flex-col gap-3 md:col-span-3">
            <p className="mb-1 text-pinkdeep">Explore</p>
            {[...routes, ["Book Appointment", "/book"] as const].map(([t, h]) => (
              <Link key={h} href={h} className="ul w-fit">
                {t}
              </Link>
            ))}
          </nav>
          <div className="grid content-start grid-cols-2 gap-x-6 gap-y-5 text-sm leading-6 text-muted md:col-span-5 md:gap-x-8">
            <div>
              <p className="label mb-1 text-pinkdeep">TikTok</p>
              <a href={tiktokLink} className="ul">
                @{studio.tiktok}
              </a>
            </div>
            <div>
              <p className="label mb-1 text-pinkdeep">Call / WhatsApp</p>
              <a href={telLink} className="ul">
                {studio.whatsappDisplay}
              </a>
            </div>
            <div className="col-span-2">
              <p className="label mb-1 text-pinkdeep">Email</p>
              <a href={emailLink} className="ul break-all">
                {studio.email}
              </a>
            </div>
            <div>
              <p className="label mb-1 text-pinkdeep">Location</p>
              <p>{studio.address}</p>
            </div>
            <div>
              <p className="label mb-1 text-pinkdeep">Opening Hours</p>
              {studio.hours.map(([d, t]) => (
                <p key={d}>
                  {d}: {t}
                </p>
              ))}
            </div>
          </div>
        </div>
        <p className="label mt-12 border-t border-ink/10 py-6 text-center text-[0.6rem] text-muted">
          © 2026 The Polish Haus
        </p>
      </div>
    </footer>
  );
}

/* Top of every inner page: label, headline, intro and an optional photo. */
export function PageHeader({
  label,
  lines,
  intro,
  image,
}: {
  label: string;
  lines: ReactNode[];
  intro: string;
  image?: { src: string; alt: string; pos: string; tone: string };
}) {
  return (
    <section className="mx-auto max-w-[1448px] px-8 pb-16 pt-36 md:px-14 md:pb-24 md:pt-48">
      <div className={`grid gap-10 ${image ? "md:grid-cols-12 md:items-end" : ""}`}>
        <Reveal className={image ? "md:col-span-7" : "max-w-3xl"}>
          <p className="label text-pinkdeep">{label}</p>
          <Slide className="mt-6 text-[2.8rem] uppercase md:text-7xl lg:text-[5.5rem]" lines={lines} />
          <p className="mt-6 max-w-lg text-sm leading-7 text-muted md:text-base md:leading-8">{intro}</p>
        </Reveal>
        {image && (
          <Photo
            src={image.src}
            alt={image.alt}
            tone={image.tone}
            position={image.pos}
            className="aspect-[4/5] rounded-2xl md:col-span-5"
          />
        )}
      </div>
    </section>
  );
}

export function BookingBand() {
  return (
    <section className="px-3 md:px-6">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 overflow-hidden rounded-[2rem] bg-gradient-to-br from-wine via-[#6a1d3b] to-pinkdeep px-6 py-16 text-white md:grid-cols-12 md:px-16 md:py-20">
        <Reveal className="md:col-span-7">
          <p className="label text-white/70">Book your appointment at The Polish Haus.</p>
          <Slide
            className="mt-6 text-[2.6rem] uppercase sm:text-6xl lg:text-[4.8rem]"
            lines={["Your next perfect", "finish", <span key="m" className="metal">awaits.</span>]}
          />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/book" className="btn btn-light label">
              Book an Appointment <Arrow />
            </Link>
            <Link href="/services" className="btn label border-white/40 text-white hover:bg-white/10">
              View Services
            </Link>
          </div>
        </Reveal>
        <Photo
          src={`${P}p-burgundy.jpg`}
          alt="Client with burgundy and gold almond nails"
          tone="#8c4a5c"
          position="45% 35%"
          className="aspect-[4/5] rounded-2xl md:col-span-5"
        />
      </div>
    </section>
  );
}

/* Nail style cards: gradient label always visible, pink highlight on hover / tap / focus. */
export function StyleGrid() {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-x-5 md:gap-y-10">
      {styles.map(([name, tone, file, pos], i) => (
        <Link
          key={name}
          href={`/book?style=${encodeURIComponent(name)}`}
          className="group relative block rounded-2xl outline-none ring-pinkdeep ring-offset-4 ring-offset-bg transition-shadow duration-500 focus:ring-2 active:ring-2"
        >
          <Photo
            src={`${P}${file}.jpg`}
            position={pos}
            alt={`${name} nails`}
            tone={tone}
            delay={(i % 4) * 0.1}
            className="aspect-[3/4] rounded-2xl"
          />
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-wine/85 via-wine/25 via-40% to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-pinkdeep/90 via-pinkdeep/35 via-50% to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100 group-active:opacity-100" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 md:p-5">
            <p className="display text-xl uppercase text-white md:text-2xl">{name}</p>
            <p className="label mt-2 flex items-center gap-2 whitespace-nowrap text-white/85 transition-all duration-500 group-hover:text-white group-focus:text-white">
              Book<span className="max-sm:hidden"> this style</span>{" "}
              <Arrow className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-1 group-focus:translate-x-1" />
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

const slides = [
  // Order set by the client: campaign shot first, then nails and portraits alternate.
  { src: "/images/photos/pink.jpg", alt: "Model framed by hands showcasing long jewelled pink nails", pos: "68% 40%", caption: "Expressive nail art" },
  { src: "/images/photos/geo-tips.jpg", alt: "Long square nails with geometric brown and gold tips", pos: "55% 60%", caption: "Custom nail art" },
  { src: "/images/photos/p-face.jpg", alt: "Model with long French nails over her face", pos: "60% 30%", caption: "Expressive detail" },
  { src: "/images/photos/geo-coffin.jpg", alt: "Long coffin extensions with geometric gold art", pos: "60% 50%", caption: "Extensions" },
  { src: "/images/photos/p-satin.jpg", alt: "Model in a satin robe resting her cheek on her hand", pos: "65% 30%", caption: "Quiet luxury" },
  { src: "/images/photos/floral-3d.jpg", alt: "Almond nails with 3D pink flowers and gold detail", pos: "65% 50%", caption: "3D nail art" },
  { src: "/images/photos/p-shoulder.jpg", alt: "Model looking over her shoulder with long pink nails", pos: "55% 30%", caption: "Effortless polish" },
  { src: "/images/photos/gold-french.jpg", alt: "Gold-line French manicure", pos: "60% 50%", caption: "The perfect finish" },
];

const INTERVAL = 7000;

const headlines = [
  ["Perfect", "Finish"],
  ["Flawless", "Detail"],
  ["Signature", "Sets"],
  ["Luxury", "Nail Art"],
  ["Bold", "Glamour"],
];

/* Rotates on the slider's interval. The old pair fades up and out, then the h1 remounts
   (keyed) so the .line rise-in and unmask animations replay for the new pair. */
export function HeroHeadline() {
  const [i, setI] = useState(0);
  const [out, setOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOut(true), INTERVAL - 700);
    const u = setTimeout(() => {
      setI((n) => (n + 1) % headlines.length);
      setOut(false);
    }, INTERVAL);
    return () => {
      clearTimeout(t);
      clearTimeout(u);
    };
  }, [i]);

  const [a, b] = headlines[i];
  const first = i === 0 && !out;

  return (
    <h1
      key={i}
      aria-label={`${a} ${b}`}
      className={`display whitespace-nowrap text-[3.2rem] uppercase transition-all duration-700 sm:text-7xl lg:text-[6.4rem] ${
        out ? "-translate-y-3 opacity-0" : ""
      }`}
    >
      <span className="line" aria-hidden>
        <span style={{ ["--d" as string]: first ? "0.2s" : "0s" }}>{a}</span>
      </span>
      <span className="line" aria-hidden>
        <span className="metal" style={{ ["--d" as string]: first ? "0.45s" : "0.18s" }}>
          {b}
        </span>
      </span>
    </h1>
  );
}

export function HeroSlider() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), INTERVAL);
    return () => clearTimeout(t);
  }, [i]);

  const pad = (n: number) => String(n + 1).padStart(2, "0");

  return (
    <>
      {slides.map((s, n) => (
        <div key={s.src} className={`slide absolute inset-0 ${n === i ? "on" : ""}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={s.src}
            alt={s.alt}
            loading={n === 0 ? "eager" : "lazy"}
            style={{ objectPosition: s.pos }}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-black/40 to-transparent md:block" />
      <div className="absolute right-6 top-24 z-10 flex items-center gap-4 text-white md:inset-x-8 md:bottom-7 md:top-auto md:justify-end [&_i]:bg-white">
        <div className="label relative hidden h-4 w-44 text-right md:block">
          {slides.map((s, n) => (
            <span key={s.caption} className={`caption absolute inset-0 ${n === i ? "on" : ""}`}>
              {s.caption}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="label tabular-nums">{pad(i)}</span>
          <div className="flex gap-1.5">
            {slides.map((s, n) => (
              <button
                key={s.src}
                aria-label={`Slide ${n + 1}`}
                onClick={() => setI(n)}
                className="py-3"
              >
                <span className={`bar block h-px w-5 bg-ink/25 md:w-8 md:bg-white/35 ${n === i ? "on" : ""}`}>
                  <i />
                </span>
              </button>
            ))}
          </div>
          <span className="label tabular-nums md:text-white/60">{pad(slides.length - 1)}</span>
        </div>
      </div>
    </>
  );
}

export function Faq({ items }: { items: [string, string][] }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="border-t border-ink/10">
      {items.map(([q, a], n) => (
        <div key={q} className="border-b border-ink/10">
          <button
            onClick={() => setOpen(open === n ? -1 : n)}
            aria-expanded={open === n}
            className="flex w-full items-center justify-between gap-6 py-6 text-left"
          >
            <span className="text-[0.95rem] font-medium">{q}</span>
            <span className="relative h-3 w-3 shrink-0 text-pink">
              <span className="absolute left-0 right-0 top-1/2 h-px bg-current" />
              <span
                className={`absolute bottom-0 left-1/2 top-0 w-px bg-current transition-transform duration-500 ${open === n ? "scale-y-0" : ""}`}
              />
            </span>
          </button>
          <div
            className={`grid transition-all duration-700 ${open === n ? "grid-rows-[1fr] pb-6 opacity-100" : "grid-rows-[0fr] opacity-0"}`}
          >
            <p className="overflow-hidden text-sm leading-7 text-muted">{a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}


type Step = { title: string; copy: string; src: string; alt: string; pos: string };

/* Pinned scroll story: each step swaps the centre photo while a ring of nail styles orbits it. */
export function DetailSteps({ steps, orbit }: { steps: Step[]; orbit: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
      // Drive the orbit and progress bars through a CSS variable so scrolling doesn't re-render.
      el.style.setProperty("--p", p.toFixed(4));
      setActive(Math.min(steps.length - 1, Math.floor(p * steps.length)));
    };
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, [steps.length]);

  const go = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + (span * (i + 0.5)) / steps.length, behavior: "smooth" });
  };

  return (
    <div
      ref={ref}
      className="steps relative -mt-[10svh]"
      style={{ height: `${steps.length * 100}svh`, ["--n" as string]: steps.length }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-[1448px] items-center gap-6 px-8 pt-16 md:grid-cols-2 md:gap-16 md:px-14 md:pt-0">
          {/* Visual: orbiting nail styles around the active photo */}
          <div className="relative mx-auto aspect-square w-[min(74vw,38svh)] md:order-2 md:w-[min(40vw,72svh)]">
            <div className="absolute inset-[8.5%] rounded-full border border-dashed border-pink/35" />
            <div className="orbit absolute inset-0">
              {orbit.map((src, i) => {
                const a = (360 / orbit.length) * i;
                return (
                  <div key={src} className="absolute inset-0" style={{ transform: `rotate(${a}deg)` }}>
                    <div
                      className="orbit-thumb absolute left-1/2 top-0 aspect-square w-[17%] overflow-hidden rounded-full shadow-[0_10px_30px_-10px_rgba(58,15,32,0.5)] ring-4 ring-bg"
                      style={{ ["--a" as string]: `${a}deg` }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="absolute inset-[17%] overflow-hidden rounded-full bg-blush ring-8 ring-blush">
              {steps.map((s, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={s.src}
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  style={{ objectPosition: s.pos, zIndex: i }}
                  className={`step-img absolute inset-0 h-full w-full object-cover ${i <= active ? "on" : ""}`}
                />
              ))}
            </div>
          </div>

          {/* Steps */}
          <ol className="md:order-1">
            {steps.map((s, i) => (
              <li key={s.title}>
                <button
                  onClick={() => go(i)}
                  aria-current={i === active ? "step" : undefined}
                  className={`relative grid w-full grid-cols-[4.5rem_1fr] items-baseline gap-x-4 border-t border-ink/10 py-4 text-left transition-opacity duration-700 md:grid-cols-[7rem_1fr] md:py-7 ${
                    i === active ? "opacity-100" : "opacity-35 hover:opacity-70"
                  }`}
                >
                  <span
                    className="step-bar absolute left-0 top-[-1px] h-px w-full origin-left bg-pinkdeep"
                    style={{ ["--i" as string]: i }}
                  />
                  <span className="display metal text-4xl md:text-6xl">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="label block">{s.title}</span>
                    <span
                      className={`grid transition-all duration-700 ${i === active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <span className="overflow-hidden">
                        <span className="block max-w-sm pt-2 text-sm leading-6 text-muted md:pt-3 md:leading-7">
                          {s.copy}
                        </span>
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
