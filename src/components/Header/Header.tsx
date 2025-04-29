"use client";

import { useTheme } from "@/components/ThemeProvider/ThemeProvider";
import styles from "./Header.module.scss";

export default function HeaderComponent() {
	const { isDarkMode, toggleTheme } = useTheme();

	return (
		<header className={styles.header}>
			<div className={styles.headerContent}>
				<div className={styles.logo}>
					<h1 className={styles.logoText}>Ezequiel Rivero</h1>
				</div>

				<div className={styles.themeToggleWrapper}>
					<button
						className={`${styles.themeToggleButton} ${
							!isDarkMode ? styles.active : styles.dimmed
						}`}
						onClick={toggleTheme}
						aria-label="Light mode"
					>
						Light Mode
					</button>
					<span className={styles.separator}>|</span>
					<button
						className={`${styles.themeToggleButton} ${
							isDarkMode ? styles.active : styles.dimmed
						}`}
						onClick={toggleTheme}
						aria-label="Dark mode"
					>
						Dark Mode
					</button>
				</div>
			</div>
		</header>
	);
}
