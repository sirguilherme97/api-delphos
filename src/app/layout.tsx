import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "@/providers/sessionProvider";
import SessionWrapper from '../providers/SessionWrapper'

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
     
        <body className={inter.className}>
          {children}
        </body>
    
    </html>
  );
}
