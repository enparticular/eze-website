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
	// Start with a consistent light mode default
	const [isDarkMode, setIsDarkMode] = useState(false);

	// Flag to track if component has mounted on client
	const [isClient, setIsClient] = useState(false);

	// Set isClient to true once component mounts on client
	useEffect(() => {
		setIsClient(true);
	}, []);

	// Only apply theme changes after client-side hydration
	useEffect(() => {
		if (!isClient) return;

		if (isDarkMode) {
			document.body.classList.add("dark-mode");
		} else {
			document.body.classList.remove("dark-mode");
		}
	}, [isDarkMode, isClient]);

	const toggleTheme = () => {
		setIsDarkMode((prevMode) => !prevMode);
	};

	const setTheme = (isDark: boolean) => {
		setIsDarkMode(isDark);
	};

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
