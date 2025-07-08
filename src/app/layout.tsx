import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/layout/MainHeader";
import MainFooter from "@/components/layout/MainFooter";
import { ThemeModeScript } from "flowbite-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fruto del Espíritu",
  description: "Una comunidad cristiana para compartir y crecer en la fe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
		<html className="dark" lang="es" suppressHydrationWarning>
			<head>
				<ThemeModeScript />
				<link rel="apple-touch-icon" sizes="180x180" href="/ios/180.png" />
				<link rel="icon" type="image/png" sizes="32x32" href="/ios/32.png" />
				<link rel="icon" type="image/png" sizes="16x16" href="/ios/16.png" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="icon" type="image/png" href="/images/logo.png" />
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<MainHeader />
				{children}
				<MainFooter />
				<script src="/js/flowbite.js"></script>
			</body>
		</html>
	);
}
