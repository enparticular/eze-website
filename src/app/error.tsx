"use client";

import { useEffect } from "react";
import styles from "@/styles/components/Error.module.scss";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className={styles.error}>
			<h2>Something went wrong loading the albums</h2>
			<button onClick={() => reset()}>Try again</button>
		</div>
	);
}
