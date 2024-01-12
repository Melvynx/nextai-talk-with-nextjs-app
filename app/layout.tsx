import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Talk With Next.js docs",
  description: "Get up-to-date information about Next.js.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(GeistMono.variable, GeistSans.variable, "h-full")}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
