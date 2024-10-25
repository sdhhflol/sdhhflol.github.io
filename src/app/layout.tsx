import { Metadata } from 'next';
import localfont from "next/font/local";

import "./globals.css";

const SNPro = localfont({
  src: "./fonts/SNPro-Regular.woff",
  variable: "--font-sn-pro",
  weight: "100 900",
});
export const metadata: Metadata = {
  description: "sdhhf 😋 | i've been studying computer science for about 6 years, primarily software, roblox projects (and a lil bit of game hacking).",
  metadataBase: new URL('https://sdhhf1245.github.io'),
  creator: 'sdhhf',
  authors: [{ name: 'sdhhf' }],
  applicationName: 'sdhhfWeb',
  keywords: ['Next.js', 'React', 'JavaScript', 'GameHacking', 'sdhhf', 'Roblox', 'Typeracer', 'Monkeytype'],
  themeColor: '#2c2d30',
  openGraph: {
    images: ['https://dcdn.dstn.to/avatars/1059614915456938084.png?size=1024'],
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
        className={`${SNPro.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
