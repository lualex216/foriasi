import type { Metadata } from "next";
import { Inter, Barlow_Condensed, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  style: ["italic", "normal"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://foriasi.ro"),
  title: {
    default: "For Iași — O singură voce pentru un fotbal curat",
    template: "%s | For Iași",
  },
  description:
    "Inițiativă civică pentru un fotbal curat la Iași — o singură voce a suporterilor, fostelor legende și părinților care cred în transparență și integritate.",
  keywords: [
    "For Iași",
    "fotbal Iași",
    "suporteri Iași",
    "asociație suporteri",
    "membru fondator",
    "fotbal curat",
    "comunitate suporteri",
  ],
  authors: [{ name: "For Iași" }],
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://foriasi.ro",
    siteName: "For Iași",
    title: "For Iași — O singură voce pentru un fotbal curat",
    description:
      "Inițiativă civică pentru un fotbal curat la Iași. Înscrie-te ca membru fondator al comunității.",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "O singură voce pentru un fotbal curat.",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "For Iași — O singură voce pentru un fotbal curat",
    description:
      "Inițiativă civică pentru un fotbal curat la Iași. Înscrie-te ca membru fondator.",
    images: [
      {
        url: "/opengraph-image.jpg",
        alt: "O singură voce pentru un fotbal curat.",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${inter.variable} ${barlowCondensed.variable} ${instrumentSerif.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
