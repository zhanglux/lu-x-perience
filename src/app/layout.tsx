import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lu Zhang - Product Designer Portfolio",
  description: "Product designer passionate about creating meaningful digital experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
