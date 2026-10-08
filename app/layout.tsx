import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { Footer, Nav } from "./components";
import "./globals.css";

const orange = localFont({
  src: "../public/fonts/OrangeAvenue.otf",
  variable: "--font-orange",
  display: "swap",
});

const outline = localFont({
  src: "../public/fonts/OrangeAvenueOutline.otf",
  variable: "--font-outline",
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: { default: "The Polish Haus | Perfect Finish", template: "%s | The Polish Haus" },
  description:
    "A luxury nail beauty studio. Where beauty meets precision. Manicures, extensions, nail art and signature finishes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${orange.variable} ${outline.variable} ${montserrat.variable} antialiased`}
    >
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
