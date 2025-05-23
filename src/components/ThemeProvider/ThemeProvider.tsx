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
	setTheme: (isDark: boolean) => void;
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
	const [isDarkMode, setIsDarkMode] = useState(() => {
		// Initialize state with a function to avoid running on server
		if (typeof window !== "undefined") {
			return (
				localStorage.getItem("theme") === "dark" ||
				!localStorage.getItem("theme")
			);
		}
		return false;
	});

	// Apply theme class on initial render
	useEffect(() => {
		if (isDarkMode) {
			document.body.classList.add("dark-mode");
		} else {
			document.body.classList.remove("dark-mode");
		}
	}, [isDarkMode]);

	const toggleTheme = () => {
		const newTheme = !isDarkMode;
		setIsDarkMode(newTheme);
		localStorage.setItem("theme", newTheme ? "dark" : "light");

		if (newTheme) {
			document.body.classList.add("dark-mode");
		} else {
			document.body.classList.remove("dark-mode");
		}
	};
	const setTheme = (isDark: boolean) => {
		setIsDarkMode(isDark);
		localStorage.setItem("theme", isDark ? "dark" : "light");

		if (isDark) {
			document.body.classList.add("dark-mode");
		} else {
			document.body.classList.remove("dark-mode");
		}
	};

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
