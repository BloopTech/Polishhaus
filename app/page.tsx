import Link from "next/link";
import { Arrow, BookingBand, DetailSteps, Faq, HeroHeadline, HeroSlider, Photo, Reveal, Slide, StyleGrid } from "./components";
import { detailSteps, faqs, orbit, P, points } from "./site";

const marquee = ["Gel-X", "Builder Gel", "BIAB", "Chrome", "Cat Eye", "Custom Nail Art", "Aura", "French", "Velvet", "3D Art"];

function Spark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-pink" fill="currentColor" aria-hidden>
      <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0Z" />
    </svg>
  );
}

export default function Home() {
  return (
    <main id="top">
      {/* HERO */}
      <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-wine text-white md:items-center">
        <div className="absolute inset-0">
          <HeroSlider />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-wine/95 via-wine/75 via-45% to-transparent md:bg-gradient-to-r md:from-wine md:via-wine/80 md:via-35% md:to-transparent md:to-65%" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-wine/40 to-transparent" />
        {/* Same gutters as the nav bar so the headline lines up with the logo. */}
        <div className="relative w-full px-3 pb-28 pt-40 md:px-6 md:pb-0 md:pt-32">
          <div className="mx-auto max-w-[1400px] px-5 md:px-8">
            <HeroHeadline />
            <Reveal delay={0.5}>
              <p className="mt-4 text-xl font-light md:text-2xl">Where beauty meets precision.</p>
              <p className="mt-2 max-w-md text-sm leading-7 text-white/70">
                A luxury nail experience created for women who appreciate beautiful details.
              </p>
            </Reveal>
            <Reveal delay={0.7} className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className="btn btn-pink label">
                Book an Appointment <Arrow />
              </Link>
              <Link href="/services" className="btn btn-ghost label">
                Explore Services
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-ink/10 bg-white py-6">
        <div className="marquee flex w-max items-center gap-12 pr-12">
          {[...marquee, ...marquee].map((t, i) => (
            <span key={i} className="flex items-center gap-12 text-lg font-light md:text-xl">
              <Spark />
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* INTRO */}
      <section id="haus" className="mx-auto max-w-[1448px] px-8 pt-28 md:px-14 md:pt-44">
        {/* Two columns to match the steps below: heading over the list, copy over the visual. */}
        <Reveal className="grid gap-8 md:grid-cols-2 md:items-end md:gap-16">
          <div>
            <p className="label text-pinkdeep">The Haus</p>
            <Slide className="mt-6 text-[2.6rem] md:text-7xl" lines={["Beauty is in", "the details."]} />
          </div>
          <p className="max-w-md text-sm leading-7 text-muted md:mb-3">
            The Polish Haus is a modern nail beauty studio dedicated to beautiful craftsmanship,
            expressive nail art and an exceptional finishing touch. Every appointment is designed
            to feel personal, polished and effortlessly luxurious.
          </p>
        </Reveal>
      </section>

      <DetailSteps steps={detailSteps} orbit={orbit} />

      {/* THE HAUS MENU */}
      <section id="edit" className="mx-auto max-w-[1448px] px-8 py-28 md:px-14 md:py-44">
        <Reveal className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <div>
            <p className="label text-pinkdeep">Signature services. Perfectly finished.</p>
            <Slide className="mt-5 text-4xl uppercase md:text-6xl" lines={["The Haus Menu"]} />
          </div>
          <Link href="/services" className="btn btn-outline label self-start md:mb-2 md:self-auto">
            View Full Menu <Arrow />
          </Link>
        </Reveal>
        <StyleGrid />
      </section>

      {/* CINEMATIC */}
      <section className="px-3 md:px-6">
        <div className="relative mx-auto flex min-h-[82svh] max-w-[1400px] items-center overflow-hidden rounded-[2rem] bg-wine text-white">
          <Photo
            src={`${P}cateye-magenta.jpg`}
            alt="Close-up magenta cat-eye manicure"
            tone="#3a0f20"
            position="62% 50%"
            parallax={80}
            className="absolute inset-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-wine/90 via-wine/50 to-transparent" />
          <div className="relative px-6 py-24 md:px-16">
            <Reveal>
              <Slide
                className="text-[2.8rem] uppercase sm:text-6xl lg:text-[5.5rem]"
                lines={["Not just nails.", <span key="m" className="metal">A perfect finish.</span>]}
              />
              <p className="mt-8 max-w-md text-sm leading-7 text-white/80">
                From the first detail to the final shine, every Polish Haus appointment is designed
                around precision, beauty and confidence.
              </p>
              <Link href="/the-haus" className="btn btn-light label mt-10">
                Discover the Haus <Arrow />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="mt-24 px-3 md:mt-36 md:px-6">
        <div className="mx-auto grid max-w-[1400px] overflow-hidden rounded-[2rem] bg-blush md:grid-cols-2">
          <Photo
            src={`${P}p-lounge.jpg`}
            alt="Client relaxing in a satin robe with long French nails"
            tone="#d9c0b6"
            position="55% 30%"
            parallax={40}
            className="aspect-[4/5] md:aspect-auto md:min-h-[44rem]"
          />
          <div className="flex flex-col justify-center px-6 py-16 md:px-16">
            <Reveal>
              <p className="label text-pinkdeep">The Haus Experience</p>
              <Slide className="mt-5 text-4xl uppercase md:text-5xl" lines={["The Polish Haus"]} />
              <p className="mt-5 max-w-md text-sm leading-7 text-muted">
                A space designed for beautiful work, quiet moments and perfect finishes.
              </p>
            </Reveal>
            <div className="mt-12 grid gap-4">
              {points.map(([t, c], i) => (
                <Reveal key={t} delay={i * 0.1}>
                  <div className="rounded-2xl bg-white/70 p-6">
                    <p className="label text-pinkdeep">{t}</p>
                    <p className="mt-2 text-sm leading-7 text-muted">{c}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto grid max-w-[1448px] gap-12 px-8 py-28 md:grid-cols-12 md:px-14 md:py-44">
        <Reveal className="md:col-span-5">
          <p className="label text-pinkdeep">Frequently asked questions</p>
          <Slide className="mt-5 text-4xl uppercase md:text-5xl" lines={["Answers you", "need fast"]} />
        </Reveal>
        <Reveal className="md:col-span-7" delay={0.1}>
          <Faq items={faqs} />
        </Reveal>
      </section>

      <BookingBand />
    </main>
  );
}
