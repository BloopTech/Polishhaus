import type { Metadata } from "next";
import { BookingBand, DetailSteps, PageHeader, Photo, Reveal, Slide } from "../components";
import { detailSteps, orbit, P } from "../site";

export const metadata: Metadata = {
  title: "The Haus",
  description: "The Polish Haus is a modern nail beauty studio dedicated to craftsmanship, expressive nail art and a perfect finish.",
};

const portraits = [
  ["p-chin", "Client resting her chin on her hand, long pink nails", "50% 35%"],
  ["p-hair", "Client with her hand in her hair, long French nails", "50% 30%"],
  ["p-shoulder", "Client looking over her shoulder, long pink nails", "45% 30%"],
] as const;

// Grounded in the FAQ: consultation, inspiration photos, extension advice, aftercare.
const visit = [
  ["Consultation", "Share your inspiration photos and we will plan the shape, length and finish together, including the right extension system for you."],
  ["Preparation", "Careful shaping and cuticle care create the clean foundation every perfect finish needs."],
  ["Design & finish", "Your colour, art or signature finish is applied with precision, detail by detail."],
  ["Aftercare", "You leave with simple aftercare guidance so your nails stay flawless for longer."],
];

export default function TheHausPage() {
  return (
    <main>
      <PageHeader
        label="The Haus"
        lines={["Where beauty", <span key="m" className="metal">meets precision.</span>]}
        intro="The Polish Haus is a modern nail beauty studio dedicated to beautiful craftsmanship, expressive nail art and an exceptional finishing touch."
        image={{ src: `${P}p-robe.jpg`, alt: "Client in a feather-trim satin robe with long pink French nails", pos: "60% 30%", tone: "#d9c0b6" }}
      />

      {/* Story */}
      <section className="mx-auto max-w-[1448px] px-8 py-16 md:px-14 md:py-24">
        <Reveal className="grid gap-8 md:grid-cols-12 md:gap-16">
          <p className="display text-3xl leading-tight md:col-span-7 md:text-5xl">
            Every appointment is designed to feel personal, polished and{" "}
            <span className="metal">effortlessly luxurious.</span>
          </p>
          <div className="space-y-5 text-sm leading-7 text-muted md:col-span-5 md:pt-3">
            <p>
              We believe your nails are an extension of your personal style. Whether you love a quiet,
              glossy nude or a statement set of hand-painted art, the work begins with attention to detail.
            </p>
            <p>
              From the first consultation to the final shine, the Haus is a space for beautiful work,
              quiet moments and perfect finishes.
            </p>
          </div>
        </Reveal>
        <div className="mt-16 grid grid-cols-3 gap-3 md:mt-24 md:gap-5">
          {portraits.map(([file, alt, pos], i) => (
            <Photo
              key={file}
              src={`${P}${file}.jpg`}
              alt={alt}
              tone="#d9c0b6"
              position={pos}
              delay={i * 0.12}
              className={`aspect-[3/4] rounded-2xl ${i === 1 ? "md:translate-y-12" : ""}`}
            />
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="mx-auto max-w-[1448px] px-8 pt-28 md:px-14 md:pt-44">
        <Reveal>
          <p className="label text-pinkdeep">Our approach</p>
          <Slide className="mt-5 text-4xl uppercase md:text-6xl" lines={["Three things,", "every time."]} />
        </Reveal>
      </section>
      <DetailSteps steps={detailSteps} orbit={orbit} />

      {/* Visit */}
      <section className="mx-auto max-w-[1448px] px-8 pb-28 md:px-14 md:pb-44">
        <Reveal className="mb-14 md:mb-20">
          <p className="label text-pinkdeep">Your visit</p>
          <Slide className="mt-5 text-4xl uppercase md:text-6xl" lines={["What to expect"]} />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-4 md:gap-5">
          {visit.map(([t, c], i) => (
            <Reveal key={t} delay={i * 0.1}>
              <div className="h-full rounded-2xl bg-blush p-7">
                <p className="display metal text-4xl">{String(i + 1).padStart(2, "0")}</p>
                <p className="label mt-6">{t}</p>
                <p className="mt-3 text-sm leading-7 text-muted">{c}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <BookingBand />
    </main>
  );
}
