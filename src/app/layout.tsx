import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sudoku.Bovi",
  description: "Sudoku Website for Portfolio - Next.js + Tailwind",
  icons: {
    icon: "/sudoku.svg",
    apple: "/sudoku.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="flex justify-center items-center min-h-screen"
      >
        {children}
      </body>
    </html>
  );
}
