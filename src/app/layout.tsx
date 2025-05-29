import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import { themeScript } from "@/lib/theme-script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.scss";

import { Courier_Prime, UnifrakturMaguntia, Micro_5 } from "next/font/google";

const micro5 = Micro_5({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
	variable: "--font-micro5",
});

const courierPrime = Courier_Prime({
	weight: ["400", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-courier",
});

const unifraktur = UnifrakturMaguntia({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
	variable: "--font-unifraktur",
});

export const metadata: Metadata = {
	title: "Ezequiel Rivero AKA enparticular",
	description:
		"Productor musical, compositor . Aquí una lista de los discos que hice en los últimos 20 años.",
	viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body
				className={`${courierPrime.variable} ${unifraktur.variable} ${micro5.variable}`}
			>
				<ThemeProvider>
					<Header />
					<main>{children}</main>
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
