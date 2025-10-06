import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "User Directory",
  description: "A user directory application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased p-10 bg-gray-100">
        {children}
      </body>
    </html>
  );
}