import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import { themeScript } from "@/lib/theme-script";
import Header from "@/components/Header";

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
	style: ["normal", "italic"],
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
	title: "Ezequiel Rivero - Productor Musical",
	description:
		"Una lista de discos en los que colaboré en los últimos 20 años.",
	viewport: "width=device-width, initial-scale=1",
	keywords: [
		"music",
		"albums",
		"production",
		"mixing",
		"mastering",
		"indie",
		"montevideo",
		"uruguay",
		"buenos aires",
		"argentina",
		"singer songwriter",
		"rock",
		"pop",
		"electronic",
		"folk",
		"alternative",
		"musician",
		"producer",
		"ezequiel rivero",
	],
	authors: [{ name: "Ezequiel Rivero" }],
	creator: "Ezequiel Rivero",
	publisher: "Ezequiel Rivero",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://enparticular.net",
		title: "Ezequiel Rivero - Productor Musical",
		description:
			"Una lista de discos en los que colaboré en los últimos 20 años.",
		siteName: "Ezequiel Rivero - Productor Musical",
	},
	twitter: {
		title: "Ezequiel Rivero - Productor Musical",
		description:
			"Una lista de discos en los que colaboré en los últimos 20 años.",
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
				<script dangerouslySetInnerHTML={{ __html: themeScript }} />
			</head>
			<body
				className={`${courierPrime.variable} ${unifraktur.variable} ${micro5.variable}`}
			>
				<ThemeProvider>
					<Header />
					<main>{children}</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
