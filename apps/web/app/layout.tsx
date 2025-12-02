import type { Metadata } from "next";
import { Geist, Geist_Mono, Tomorrow } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tomorrow = Tomorrow({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-tomorrow",
});

export const metadata: Metadata = {
  title: {
    default: "Hipslides - Beautiful Presentations in Seconds",
    template: "%s | Hipslides",
  },
  description:
    "Turn your outline or existing presentation into beautiful slides in seconds. Import a PDF or PowerPoint, or start from scratch—Hipslides handles the design.",
  keywords: [
    "presentation generator",
    "AI slides",
    "PDF to slides",
    "PowerPoint import",
    "slide design",
    "presentation maker",
    "Hipslides",
  ],
  authors: [{ name: "Hipslides" }],
  creator: "Hipslides",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Hipslides",
    title: "Hipslides - Beautiful Presentations in Seconds",
    description:
      "Turn your outline or existing presentation into beautiful slides in seconds.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hipslides - Beautiful Presentations in Seconds",
    description:
      "Turn your outline or existing presentation into beautiful slides in seconds.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${tomorrow.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
