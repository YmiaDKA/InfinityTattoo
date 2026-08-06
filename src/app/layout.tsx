import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Infinity Tattoo Studio | Tattoo Lørenskog, Strømmen & Lillestrøm",
  description:
    "Custom realistic tattoo work in Lørenskog, minutes from Strømmen and Lillestrøm, with clients welcome from Oslo.",
  keywords: [
    "Infinity Tattoo",
    "tatovering Lørenskog",
    "tattoo Lørenskog",
    "tatoveringsstudio Lørenskog",
    "tattoo Strømmen",
    "tattoo Lillestrøm",
    "tattoo Oslo",
    "realistic tattoo Norway",
    "black and grey tattoo",
    "portrait tattoo",
    "sleeve tattoo",
    "freehand Maori tattoo",
    "Maori tattoo Norway",
    "Polynesian tattoo",
    "cover up tattoo",
    "tattoo consultation",
    "tooth gems",
  ],
  alternates: {
    canonical: "https://infinitytattoo.no/",
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  metadataBase: new URL("https://infinitytattoo.no"),
  openGraph: {
    title: "Infinity Tattoo Studio | Lørenskog",
    description:
      "Custom realistic tattoo work and one-on-one consultations in Lørenskog, minutes from Strømmen and Lillestrøm, with clients from Oslo welcome.",
    url: "https://infinitytattoo.no/",
    siteName: "Infinity Tattoo Studio",
    images: [
      {
        url: "/media/hero-poster.jpeg",
        width: 2782,
        height: 1172,
        alt: "Infinity Tattoo Studio",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} dark h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
