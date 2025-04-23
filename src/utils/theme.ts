export const toggleTheme = () => {
	const isDarkMode = localStorage.getItem("darkMode") === "true";
	document.documentElement.classList.toggle("dark-mode", !isDarkMode);
	localStorage.setItem("darkMode", String(!isDarkMode));
	return !isDarkMode;
};

export const initTheme = () => {
	// Check if user has previously set theme
	const savedTheme = localStorage.getItem("darkMode");

	// If theme was previously set, use that
	// Otherwise use system preference
	const isDarkMode = savedTheme !== null ? savedTheme === "true" : false;

	document.documentElement.classList.toggle("dark-mode", isDarkMode);
	localStorage.setItem("darkMode", String(isDarkMode));
	return isDarkMode;
};
