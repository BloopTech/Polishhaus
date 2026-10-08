"use client";

import { use, useState, type FormEvent, type ReactNode } from "react";
import { Arrow } from "../components";
import { services, slotsFor, studio, styles, whatsappLink } from "../site";

const field =
  "w-full border-b border-ink/20 bg-transparent py-3 text-base outline-none transition-colors duration-500 placeholder:text-muted/60 focus:border-pinkdeep";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="label text-pinkdeep">{label}</span>
      {children}
    </label>
  );
}

const today = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

type Query = { [key: string]: string | string[] | undefined };

/* No booking backend yet: the request is composed into a WhatsApp message to the studio. */
export function BookingForm({ query }: { query: Promise<Query> }) {
  // Pre-fill from links such as /book?style=Chrome or /book?service=Pedicure.
  const q = use(query);
  const style = typeof q.style === "string" && styles.some(([n]) => n === q.style) ? q.style : "";
  const asked = typeof q.service === "string" ? q.service : style === "Pedicure" ? "Pedicure" : "";
  const service = services.some((s) => s.name === asked) ? asked : "";

  const [form, setForm] = useState({
    service,
    style,
    date: "",
    slot: "",
    name: "",
    phone: "",
    notes: "",
  });
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const day = new Date(`${form.date}T12:00`).getDay();
    if (studio.closedDays.includes(day)) {
      setError(studio.closedMessage);
      return;
    }
    setError("");
    const date = new Date(`${form.date}T12:00`).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    const message = [
      "Hello The Polish Haus, I would like to book an appointment.",
      "",
      `Service: ${form.service}`,
      form.style ? `Style: ${form.style}` : null,
      `Preferred date: ${date}`,
      form.slot ? `Preferred time: ${form.slot}` : null,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.notes ? `Notes: ${form.notes}` : null,
    ]
      .filter((l) => l !== null)
      .join("\n");
    window.open(whatsappLink(message), "_blank", "noopener");
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl bg-blush p-8 md:p-12">
        <p className="label text-pinkdeep">Almost there</p>
        <p className="display mt-4 text-3xl md:text-5xl">Send your message in WhatsApp.</p>
        <p className="mt-4 max-w-md text-sm leading-7 text-muted">
          We have prepared your booking request in WhatsApp. Press send and we will confirm your time.
        </p>
        <button onClick={() => setSent(false)} className="btn btn-outline label mt-8">
          Edit request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-9">
      <div className="grid gap-9 md:grid-cols-2">
        <Field label="Service">
          <select required value={form.service} onChange={(e) => set("service")(e.target.value)} className={field}>
            <option value="" disabled>
              Choose a service
            </option>
            {services.map((s) => (
              <option key={s.id}>{s.name}</option>
            ))}
          </select>
        </Field>
        <Field label="Style (optional)">
          <select value={form.style} onChange={(e) => set("style")(e.target.value)} className={field}>
            <option value="">No preference</option>
            {styles.map(([n]) => (
              <option key={n}>{n}</option>
            ))}
          </select>
        </Field>
        <Field label="Preferred date">
          <input
            required
            type="date"
            min={today()}
            value={form.date}
            onChange={(e) => {
              const date = e.target.value;
              // Drop a chosen time the new day does not offer (e.g. a morning slot on a Sunday).
              setForm((f) => ({ ...f, date, slot: slotsFor(date).includes(f.slot) ? f.slot : "" }));
            }}
            className={field}
          />
        </Field>
        <fieldset>
          <legend className="label text-pinkdeep">Preferred time</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {slotsFor(form.date).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={form.slot === t}
                onClick={() => set("slot")(form.slot === t ? "" : t)}
                className="label rounded-full border border-ink/15 px-4 py-2.5 transition-colors duration-500 hover:border-pinkdeep aria-pressed:border-pinkdeep aria-pressed:bg-pinkdeep aria-pressed:text-white"
              >
                {t}
              </button>
            ))}
          </div>
        </fieldset>
        <Field label="Your name">
          <input required autoComplete="name" value={form.name} onChange={(e) => set("name")(e.target.value)} className={field} />
        </Field>
        <Field label="Phone">
          <input
            required
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => set("phone")(e.target.value)}
            className={field}
          />
        </Field>
      </div>
      <Field label="Notes (optional)">
        <textarea
          rows={3}
          value={form.notes}
          onChange={(e) => set("notes")(e.target.value)}
          placeholder="Shape, length, colours or a design you have in mind. You can send inspiration photos in WhatsApp."
          className={`${field} resize-none`}
        />
      </Field>
      {error && (
        <p role="alert" className="text-sm text-pinkdeep">
          {error}
        </p>
      )}
      <div>
        <button type="submit" className="btn btn-pink label">
          Send Booking Request <Arrow />
        </button>
        <p className="mt-4 text-xs leading-6 text-muted">
          Opens WhatsApp with your request ready to send. We will reply to confirm your appointment.
        </p>
      </div>
    </form>
  );
}
