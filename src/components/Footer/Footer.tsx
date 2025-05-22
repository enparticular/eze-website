"use client";

import styles from "./Footer.module.scss";

export default function FooterComponent() {
	return (
		<footer className={styles.footer}>
			<div className={styles.wrapper}>
				<a href="http://www.instagram.com/enparticular" target="_blank">
					Instagram
				</a>
				<a href="http://www.twitter.com/enparticular" target="_blank">
					Twitter
				</a>
				<a href="mailto:enparticular@gmail.com" target="_blank">
					E-Mail
				</a>
			</div>
		</footer>
	);
}
