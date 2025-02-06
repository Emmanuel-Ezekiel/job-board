import { Inter } from "next/font/google";
import { ThemeProvider } from "./providers";
import { BookmarkProvider } from "./context/bookmark-context";
import "./globals.css";
import { Toaster } from "sonner";
import type React from "react";
import { Nav } from "./components/nav";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <BookmarkProvider>
            <Nav />
            {children}
            <Toaster />
          </BookmarkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
