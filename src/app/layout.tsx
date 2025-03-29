import { Header } from "@/components/ui/shared/Header";
import type { Metadata } from "next";
import { Bodoni_Moda, Teachers } from "next/font/google";
import "./globals.css";

// Primary font - Teachers (using Inter as fallback if Teachers isn't available)
const teachers = Teachers({
  variable: "--font-teachers",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Secondary font for titles
const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  //   display: "swap",
});

export const metadata: Metadata = {
  title: "Interview Simulator",
  description: "Simulate an interview with a virtual AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${teachers.className} ${bodoniModa.variable} antialiased`}
      >
        <Header />
        <main className="pt-24 px-5">{children}</main>
      </body>
    </html>
  );
}
