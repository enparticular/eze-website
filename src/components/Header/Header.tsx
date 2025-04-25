"use client";

import { useTheme } from "@/components/ThemeProvider/ThemeProvider";
import styles from "./Header.module.scss";

export default function HeaderComponent() {
	const { isDarkMode, toggleTheme } = useTheme();

	return (
		<header className={styles.header}>
			<div className={styles.headerContent}>
				<div className={styles.logo}>
					<div className={styles.logoIcon}></div>
					<h1 className={styles.logoText}>Ezequieloide Riveroide</h1>
				</div>

				<button
					className={styles.themeToggle}
					onClick={toggleTheme}
					aria-label={isDarkMode ? "Light mode" : "Dark mode"}
				>
					{isDarkMode ? (
						<>
							<svg
								className={styles.themeIcon}
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<span className={styles.themeText}>Dark mode</span>
						</>
					) : (
						<>
							<svg
								className={styles.themeIcon}
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
							<span className={styles.themeText}>Light mode</span>
						</>
					)}
				</button>
			</div>
		</header>
	);
}
