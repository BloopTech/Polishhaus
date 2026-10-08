import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, BookingBand, PageHeader, Photo, Reveal, Slide, StyleGrid } from "../components";
import { P, services } from "../site";

export const metadata: Metadata = {
  title: "Services",
  description: "Manicures, extensions, nail art, signature finishes and pedicures at The Polish Haus.",
};

export default function ServicesPage() {
  return (
    <main>
      <PageHeader
        label="The Haus Menu"
        lines={["Signature", <span key="m" className="metal">services.</span>]}
        intro="From natural nail care to sculpted extensions and hand-painted art, every service is finished with the same precision."
      />

      {/* Jump links to each category */}
      <nav className="sticky top-[5.5rem] z-30 mx-auto max-w-[1448px] px-8 md:top-28 md:px-14">
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none]">
          {services.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="label shrink-0 rounded-full border border-ink/15 bg-bg/90 px-4 py-2.5 backdrop-blur transition-colors duration-500 hover:border-pinkdeep hover:text-pinkdeep"
            >
              {s.name}
            </a>
          ))}
        </div>
      </nav>

      <div className="mx-auto max-w-[1448px] px-8 md:px-14">
        {services.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className="grid scroll-mt-40 items-center gap-10 border-b border-ink/10 py-20 last:border-0 md:grid-cols-12 md:gap-16 md:py-28"
          >
            <Photo
              src={`${P}${s.image}.jpg`}
              alt={`${s.name} at The Polish Haus`}
              tone={s.tone}
              position={s.pos}
              className={`aspect-[4/5] rounded-2xl md:col-span-5 ${i % 2 ? "md:order-2" : ""}`}
            />
            <Reveal className={`md:col-span-7 ${i % 2 ? "md:order-1" : ""}`}>
              <p className="display metal text-5xl">{String(i + 1).padStart(2, "0")}</p>
              <Slide className="mt-4 text-4xl uppercase md:text-6xl" lines={[s.name]} />
              <p className="mt-4 max-w-md text-sm leading-7 text-muted">{s.intro}</p>
              <ul className="mt-10 border-t border-ink/10">
                {s.treatments.map((t) => (
                  <li key={t.name} className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-5">
                    <div>
                      <p className="label">{t.name}</p>
                      <p className="mt-2 text-sm leading-6 text-muted">{t.copy}</p>
                    </div>
                    {t.price && <p className="shrink-0 text-lg font-light">{t.price}</p>}
                  </li>
                ))}
              </ul>
              <Link
                href={`/book?service=${encodeURIComponent(s.name)}`}
                className="btn btn-pink label mt-10"
              >
                Book {s.name} <Arrow />
              </Link>
            </Reveal>
          </section>
        ))}
      </div>

      <section className="mx-auto max-w-[1448px] px-8 py-28 md:px-14 md:py-36">
        <Reveal className="mb-14 md:mb-20">
          <p className="label text-pinkdeep">The finishes everyone asks for</p>
          <Slide className="mt-5 text-4xl uppercase md:text-6xl" lines={["Choose your style"]} />
        </Reveal>
        <StyleGrid />
      </section>

      <BookingBand />
    </main>
  );
}
