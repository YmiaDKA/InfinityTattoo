import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { GoogleAdsConversionTracker } from "@/components/google-ads-conversion-tracker";
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
  title: "Infinity Tattoo Studio | Tatovering Lørenskog, Strømmen og Lillestrøm",
  description:
    "Custom realistisk tatovering i Lørenskog, minutter fra Strømmen og Lillestrøm, for kunder fra Oslo og Romerike.",
  keywords: [
    "Infinity Tattoo",
    "tatovering Lørenskog",
    "tattoo Lørenskog",
    "tatoveringsstudio Lørenskog",
    "tattoo Strømmen",
    "tattoo Lillestrøm",
    "tattoo Oslo",
    "tatovering Oslo",
    "tatovering Strømmen",
    "tatovering Lillestrøm",
    "realistisk tatovering",
    "black and grey tatovering",
    "blackout tatovering",
    "blackwork tatovering",
    "portrett tatovering",
    "sleeve tatovering",
    "fine line tatovering",
    "Maori tatovering",
    "Maori tatovering Norge",
    "realistic tattoo Norway",
    "black and grey tattoo",
    "blackout tattoo",
    "blackwork tattoo",
    "portrait tattoo",
    "sleeve tattoo",
    "fine line tattoo",
    "freehand Maori tattoo",
    "Maori tattoo Norway",
    "Polynesian tattoo",
    "piercing Lørenskog",
    "piercing",
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
    title: "Infinity Tattoo Studio | Tatovering Lørenskog",
    description:
      "Custom realistisk tatovering og konsultasjoner i Lørenskog, minutter fra Strømmen og Lillestrøm, for kunder fra Oslo og Romerike.",
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
      lang="no"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} dark h-full scroll-smooth antialiased`}
    >
      <Script
        id="google-ads-src"
        src="https://www.googletagmanager.com/gtag/js?id=AW-18110021666"
        strategy="beforeInteractive"
      />
      <Script id="google-ads-tag" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          window.gtag = function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18110021666');
        `}
      </Script>
      <body className="flex min-h-full flex-col">
        <GoogleAdsConversionTracker />
        {children}
      </body>
    </html>
  );
}
