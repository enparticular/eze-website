"use client";

import {
	ReactNode,
	useState,
	useEffect,
	createContext,
	useContext,
} from "react";

interface ThemeContextType {
	isDarkMode: boolean;
	toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const isDark =
			localStorage.getItem("theme") === "dark" ||
			(!localStorage.getItem("theme") &&
				window.matchMedia("(prefers-color-scheme: dark)").matches);

		setIsDarkMode(isDark);
		document.documentElement.setAttribute(
			"data-theme",
			isDark ? "dark" : "light"
		);
	}, []);

	const toggleTheme = () => {
		const newTheme = !isDarkMode;
		setIsDarkMode(newTheme);
		localStorage.setItem("theme", newTheme ? "dark" : "light");
		document.documentElement.setAttribute(
			"data-theme",
			newTheme ? "dark" : "light"
		);
	};

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
