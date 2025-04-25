import styles from "@/styles/components/Loading.module.scss";

export default function Loading() {
	return (
		<div className={styles.loading}>
			<div className={styles.spinner}></div>
			<p>Loading albums...</p>
		</div>
	);
}
