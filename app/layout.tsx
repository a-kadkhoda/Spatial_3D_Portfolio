import type { Metadata, Viewport } from "next";
import { Sora, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import { portfolioData } from "@/lib/data";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const { name, role, bio } = portfolioData;

export const metadata: Metadata = {
  title: `${name} — ${role}`,
  description: bio,
  openGraph: {
    title: `${name} — ${role}`,
    description: bio,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05060C",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${sora.variable} ${plexMono.variable} ${spaceGrotesk.variable} antialiased`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
