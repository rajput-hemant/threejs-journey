import { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import Navbar from "@components/navbar";
import { siteConfig } from "@config/site";

import "@styles/globals.css";
import Footer from "@components/footer";

type LayoutProps = {
	children?: React.ReactNode;
};

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
	keywords: [
		"threejs",
		"three.js",
		"three",
		"webgl",
		"javascript",
		"typescript",
	],
};

const Layout = ({ children }: LayoutProps) => {
	return (
		<html lang="en">
			<body className={`bg-slate-100 ${inter.className}`}>
				<Navbar />

				<main className="container">{children}</main>

				<Analytics />

				<Footer />
			</body>
		</html>
	);
};

export default Layout;
