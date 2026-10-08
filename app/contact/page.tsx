import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Faq, PageHeader, Reveal, Slide } from "../components";
import { emailLink, faqs, tiktokLink, studio, whatsappLink } from "../site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Message The Polish Haus on WhatsApp or TikTok, find the studio and see opening hours.",
};

export default function ContactPage() {
  const cards = [
    { label: "WhatsApp", value: studio.whatsappDisplay, note: "The quickest way to reach us", href: whatsappLink(), cta: "Message us" },
    { label: "TikTok", value: `@${studio.tiktok}`, note: "Latest sets and availability", href: tiktokLink, cta: "Follow" },
    { label: "Email", value: studio.email, note: "For enquiries, collaborations and gift requests", href: emailLink, cta: "Send an email", wide: true },
  ];

  return (
    <main>
      <PageHeader
        label="Contact"
        lines={["Let’s talk", <span key="m" className="metal">nails.</span>]}
        intro="Questions about a service, a design you have in mind or your next appointment? We would love to hear from you."
      />

      <section className="mx-auto grid max-w-[1448px] gap-4 px-8 md:grid-cols-2 md:gap-5 md:px-14">
        {cards.map((c, i) => (
          <Reveal key={c.label} delay={i * 0.1} className={c.wide ? "md:col-span-2" : ""}>
            <a
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col justify-between gap-12 rounded-2xl bg-gradient-to-br from-wine via-[#6a1d3b] to-pinkdeep p-8 text-white md:p-10"
            >
              <div>
                <p className="label text-white/70">{c.label}</p>
                {/* The email is long: smaller on phones, and if it must wrap it breaks before the @. */}
                <p className={`display mt-4 [overflow-wrap:anywhere] md:text-5xl ${c.wide ? "text-[1.45rem] sm:text-3xl" : "text-3xl"}`}>
                  {c.wide ? (
                    <>
                      {c.value.split("@")[0]}
                      <wbr />@{c.value.split("@")[1]}
                    </>
                  ) : (
                    c.value
                  )}
                </p>
                <p className="mt-3 text-sm text-white/75">{c.note}</p>
              </div>
              <span className="label flex items-center gap-3">
                {c.cta}
                <Arrow className="transition-transform duration-500 group-hover:translate-x-1" />
              </span>
            </a>
          </Reveal>
        ))}
        <Reveal>
          <div className="h-full rounded-2xl bg-blush p-8 md:p-10">
            <p className="label text-pinkdeep">Visit the studio</p>
            <p className="display mt-4 text-3xl md:text-4xl">{studio.address}</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-2xl bg-blush p-8 md:p-10">
            <p className="label text-pinkdeep">Opening hours</p>
            <dl className="mt-4 divide-y divide-ink/10">
              {studio.hours.map(([d, t]) => (
                <div key={d} className="flex justify-between gap-6 py-4">
                  <dt className="text-sm">{d}</dt>
                  <dd className="text-sm text-muted">{t}</dd>
                </div>
              ))}
            </dl>
            <Link href="/book" className="btn btn-pink label mt-6">
              Book an Appointment <Arrow />
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-[1448px] gap-12 px-8 py-28 md:grid-cols-12 md:px-14 md:py-40">
        <Reveal className="md:col-span-5">
          <p className="label text-pinkdeep">Frequently asked questions</p>
          <Slide className="mt-5 text-4xl uppercase md:text-5xl" lines={["Answers you", "need fast"]} />
        </Reveal>
        <Reveal className="md:col-span-7" delay={0.1}>
          <Faq items={faqs} />
        </Reveal>
      </section>
    </main>
  );
}
