import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { JsonLd } from "@/components/json-ld";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.legalName} — ${site.tagline} | Faridabad`,
    template: `%s | ${site.legalName}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.legalName,
    title: `${site.legalName} — ${site.tagline}`,
    description: site.description,
    locale: "en_IN",
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
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd />
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </Providers>
      </body>
    </html>
  );
}
