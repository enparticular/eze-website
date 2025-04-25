import type { Metadata } from "next";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";
import "@/styles/globals.scss";

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
			<body>
				<ThemeProvider>
					<Header />
					<main>{children}</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
