// Shared studio details and content. Update contact details here and every page follows.

export const P = "/images/photos/";

export const studio = {
  tiktok: "thepolish_haus",
  // International format, digits only (e.g. "447700900123"). Booking requests open WhatsApp to this number.
  whatsapp: "233593660805",
  whatsappDisplay: "059 366 0805",
  email: "eshunshine29@gmail.com",
  address: "Okpoi Gonno Taxi Rank, Spintex, Accra",
  hours: [
    ["Tuesday – Saturday", "10:00 – 18:00"],
    ["Sunday", "14:00 – 18:00"],
    ["Monday", "Closed"],
  ],
  // Days the booking form refuses (0 = Sunday). Keep in sync with hours above.
  closedDays: [1],
  closedMessage: "We are closed on Mondays. Please choose another date.",
  // Preferred-time options shown on the booking form.
  slots: ["Morning (10–12)", "Midday (12–15)", "Afternoon (15–18)"],
  // Days with shorter hours get their own options (0 = Sunday, opens 14:00).
  daySlots: { 0: ["Early afternoon (14–16)", "Late afternoon (16–18)"] } as Record<number, string[]>,
};

export const slotsFor = (date: string) =>
  (date && studio.daySlots[new Date(`${date}T12:00`).getDay()]) || studio.slots;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${studio.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
export const tiktokLink = `https://www.tiktok.com/@${studio.tiktok}`;
// Booking requests are also emailed to the studio through FormSubmit (free, no account).
// The first request sends an activation email to this address; nothing arrives until she clicks "Activate".
export const bookingEmailEndpoint = `https://formsubmit.co/ajax/${studio.email}`;
export const telLink = `tel:+${studio.whatsapp}`;
export const emailLink = `mailto:${studio.email}`;

// No "Home" entry: the logo links home.
export const routes = [
  ["Services", "/services"],
  ["The Haus", "/the-haus"],
  ["Contact", "/contact"],
] as const;

// [name, tone, image, object-position]
export const styles = [
  ["Cat Eye", "#8c4a5c", "cateye-magenta", "62% 45%"],
  ["Chrome", "#c9a79c", "chrome", "50% 55%"],
  ["French", "#ead8cf", "classic-french", "45% 55%"],
  ["Aura", "#dcb7ad", "aura", "50% 55%"],
  ["Pedicure", "#e6cbc3", "pedicure", "55% 65%"],
  ["Gold-Line French", "#e4c7bd", "gold-french", "55% 55%"],
  ["Geometric", "#d3a79d", "geo-tips", "45% 60%"],
  ["3D Art", "#c49a8b", "floral-3d", "60% 55%"],
] as const;

export type Treatment = { name: string; copy: string; price?: string };
export type Service = {
  id: string;
  name: string;
  intro: string;
  image: string;
  pos: string;
  tone: string;
  treatments: Treatment[];
};

// Add a `price` to any treatment (e.g. price: "£45") and it appears on the Services page.
export const services: Service[] = [
  {
    id: "manicure",
    name: "Manicure",
    intro: "Natural nail care, classic manicures and gel finishes.",
    image: "classic-french",
    pos: "50% 55%",
    tone: "#e8d3cd",
    treatments: [
      { name: "Classic Manicure", copy: "Shape, cuticle care and a polished finish for natural nails." },
      { name: "Gel Manicure", copy: "Long-wearing gel colour with a high-shine finish." },
      { name: "French Manicure", copy: "A timeless French tip, classic white or with a modern twist." },
    ],
  },
  {
    id: "extensions",
    name: "Extensions",
    intro: "Acrylic, Gel-X, Builder Gel, BIAB and other extension options.",
    image: "geo-coffin",
    pos: "55% 55%",
    tone: "#d9b9ae",
    treatments: [
      { name: "Acrylic", copy: "Strong, sculpted length in any shape." },
      { name: "Gel-X", copy: "Lightweight soft-gel extensions with a natural feel." },
      { name: "Builder Gel / BIAB", copy: "Strength and structure for natural nails or short length." },
    ],
  },
  {
    id: "nail-art",
    name: "Nail Art",
    intro: "Custom designs, French, chrome, cat eye, aura, marble, 3D and hand-painted art.",
    image: "floral-3d",
    pos: "65% 55%",
    tone: "#d7b1a7",
    treatments: [
      { name: "Custom Design", copy: "Bring your inspiration and we will bring it to life." },
      { name: "3D & Embellishment", copy: "Sculpted flowers, gems, studs and gold detail." },
      { name: "Hand-Painted Art", copy: "Line work, marble and geometric designs painted by hand." },
    ],
  },
  {
    id: "finishes",
    name: "Signature Finishes",
    intro: "Chrome, glazed, velvet, cat eye, ombré, jelly, metallic and more.",
    image: "cateye-magenta",
    pos: "62% 45%",
    tone: "#8c4a5c",
    treatments: [
      { name: "Chrome & Glazed", copy: "Mirror-bright or soft pearlescent shine." },
      { name: "Cat Eye & Velvet", copy: "Magnetic depth that moves with the light." },
      { name: "Ombré, Aura & Jelly", copy: "Soft blends and translucent colour." },
    ],
  },
  {
    id: "pedicure",
    name: "Pedicure",
    intro: "Classic, gel, French and luxury pedicure experiences.",
    image: "pedicure",
    pos: "55% 65%",
    tone: "#e6cbc3",
    treatments: [
      { name: "Classic Pedicure", copy: "Soak, shape, cuticle care and polish." },
      { name: "Gel Pedicure", copy: "Chip-resistant gel colour for feet." },
      { name: "Luxury Pedicure", copy: "Our most indulgent pedicure, finished to perfection." },
    ],
  },
];

export const points = [
  ["Precision", "Beautiful work begins with attention to detail."],
  ["Expression", "Your nails are an extension of your personal style."],
  ["Experience", "A polished experience from appointment to final finish."],
] as const;

export const faqs: [string, string][] = [
  ["How do I book an appointment?", "Use the Book an Appointment button or message us on WhatsApp with your preferred service and date, and we will confirm your time."],
  ["Can I bring inspiration photos?", "Yes. Reference images help us plan your design, shape and finish before you arrive."],
  ["Which extension system is right for me?", "Acrylic, Gel-X, Builder Gel and BIAB each suit different nails and lifestyles. We will recommend the best option at your consultation."],
  ["How should I care for my nails afterwards?", "We share simple aftercare guidance with every appointment so your finish stays flawless for longer."],
];

// One photo per step in the "Precision / Expression / Experience" scroll story.
export const detailSteps = [
  { title: points[0][0], copy: points[0][1], src: `${P}gold-french.jpg`, alt: "Gold-line French manicure", pos: "55% 55%" },
  { title: points[1][0], copy: points[1][1], src: `${P}geo-coffin.jpg`, alt: "Coffin extensions with geometric gold art", pos: "60% 50%" },
  { title: points[2][0], copy: points[2][1], src: `${P}pedicure.jpg`, alt: "French pedicure on a soft towel", pos: "55% 65%" },
];

// Nail styles that orbit the step photo.
export const orbit = ["cateye-magenta", "chrome", "aura", "classic-french", "geo-tips", "floral-3d"].map((n) => `${P}${n}.jpg`);
