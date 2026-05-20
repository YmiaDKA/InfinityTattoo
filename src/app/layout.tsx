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
  title: "Infinity Tattoo Studio | Lørenskog",
  description:
    "Custom realistic tattoo work in Lørenskog by Infinity Tattoo Studio.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
  },
  metadataBase: new URL("https://infinity-tattoo.no"),
  openGraph: {
    title: "Infinity Tattoo Studio",
    description:
      "Custom realistic tattoo work, clean execution, and one-on-one consultations in Lørenskog.",
    url: "https://infinity-tattoo.no",
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
