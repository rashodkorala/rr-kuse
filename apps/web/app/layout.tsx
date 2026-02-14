import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getSiteSettings } from "@/lib/sanity";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const defaultMetadata = {
  title: "RR Kuse Venues",
  description: "Marketing site for Rob Roy and Konfusion venues",
};

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: settings?.defaultSeoTitle ?? defaultMetadata.title,
    description:
      settings?.defaultSeoDescription ?? defaultMetadata.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const announcement =
    settings?.announcementEnabled && settings.announcementText?.trim()
      ? settings.announcementText
      : null;

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {announcement ? (
          <div className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex justify-center">
            <p className="max-w-2xl rounded-full border border-white/15 bg-black/65 px-4 py-2 text-center text-sm text-white/90 backdrop-blur-xl shadow-lg shadow-black/50">
              {announcement}
            </p>
          </div>
        ) : null}
      </body>
    </html>
  );
}
