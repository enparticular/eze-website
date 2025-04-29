import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import { themeScript } from "@/lib/theme-script";
import Header from "@/components/Header";
import "@/styles/globals.scss";

import { Nunito_Sans, UnifrakturMaguntia } from "next/font/google";

const nunitoSans = Nunito_Sans({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-nunito",
});

const unifraktur = UnifrakturMaguntia({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
	variable: "--font-unifraktur",
});

export const metadata: Metadata = {
	title: "Ezequiel Rivero",
	description: "Lista de discos producidos en los últimos 20 años!",
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
			<body className={`${nunitoSans.variable} ${unifraktur.variable}`}>
				<ThemeProvider>
					<Header />
					<main>{children}</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
