import { Header } from "@/src/components/ui/shared/Header";
import { Toaster } from "@/src/components/ui/sonner";
import type { Metadata } from "next";
import { Bodoni_Moda, Teachers } from "next/font/google";
import { SessionProviders } from "../context/SessionProvider";
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${teachers.className} ${bodoniModa.variable} antialiased max-w-[1690px] items-center content-center mx-auto`}
      >
        <SessionProviders>
          <Header />
          <main className="pt-24 px-5 sm:px-0 ">{children}</main>
        </SessionProviders>
        <Toaster />
      </body>
    </html>
  );
}
