import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/providers/sessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Delphos Automação",
  description: "Treinamento da Delphos Automação - API ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <NextAuthProvider>
        <body className={inter.className}>
          {children}
        </body>
      </NextAuthProvider>
    </html>
  );
}
