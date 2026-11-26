import type { Metadata } from "next";
import "./globals.css";

const title = "Lu Zhang — Senior Product Designer, London";
const description =
  "Senior Product Designer in London who ships code. AI-powered search and design systems at Signal AI; previously Springer Nature.";

export const metadata: Metadata = {
  // Link previews need absolute image addresses. The favicon and preview image
  // themselves are the icon.svg and opengraph-image.png files beside this one.
  metadataBase: new URL("https://zhanglux.github.io"),
  title,
  description,
  openGraph: {
    type: "website",
    siteName: "Lu Zhang",
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
