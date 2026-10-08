import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader, Photo, Reveal } from "../components";
import { P, studio } from "../site";
import { BookingForm } from "./booking-form";

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Request your appointment at The Polish Haus.",
};

const how = [
  ["Choose", "Pick your service, style and a preferred date and time."],
  ["Send", "Your request opens in WhatsApp, ready to send with any inspiration photos."],
  ["Confirm", "We reply to confirm your appointment time."],
];

export default function BookPage({ searchParams }: PageProps<"/book">) {
  return (
    <main>
      <PageHeader
        label="Book an appointment"
        lines={["Your next", <span key="m" className="metal">perfect finish.</span>]}
        intro="Tell us what you would love and when suits you. We will confirm your time personally."
      />

      <section className="mx-auto grid max-w-[1448px] gap-14 px-8 pb-28 md:grid-cols-12 md:gap-16 md:px-14 md:pb-40">
        <Reveal className="md:col-span-7">
          {/* searchParams is request-time data; Suspense keeps the rest of the page prerendered. */}
          <Suspense>
            <BookingForm query={searchParams} />
          </Suspense>
        </Reveal>

        <aside className="grid content-start gap-5 md:col-span-5">
          <Photo
            src={`${P}gold-french.jpg`}
            alt="Gold-line French manicure"
            tone="#ead8cf"
            position="55% 55%"
            className="aspect-[4/3] rounded-2xl"
          />
          <div className="rounded-2xl bg-blush p-7">
            <p className="label text-pinkdeep">How booking works</p>
            <ol className="mt-5 grid gap-5">
              {how.map(([t, c], i) => (
                <li key={t} className="grid grid-cols-[2.5rem_1fr] gap-3">
                  <span className="display metal text-3xl">{i + 1}</span>
                  <span>
                    <span className="label block">{t}</span>
                    <span className="mt-1 block text-sm leading-6 text-muted">{c}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl border border-ink/10 p-7">
            <p className="label text-pinkdeep">Opening hours</p>
            <dl className="mt-3 divide-y divide-ink/10">
              {studio.hours.map(([d, t]) => (
                <div key={d} className="flex justify-between gap-6 py-3 text-sm">
                  <dt>{d}</dt>
                  <dd className="text-muted">{t}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </section>
    </main>
  );
}
