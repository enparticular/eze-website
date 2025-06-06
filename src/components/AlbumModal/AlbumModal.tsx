"use client";

import { FC } from "react";
import { AlbumType } from "@/types";
import styles from "./AlbumModal.module.scss";
import Image from "next/image";

interface AlbumModalProps {
	album: AlbumType;
	onClose: () => void;
}

const AlbumModal: FC<AlbumModalProps> = ({ album, onClose }) => {
	if (!album) return null;

	// Close modal when clicking the backdrop, but not when clicking the content
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<div className={styles.backdrop} onClick={handleBackdropClick}>
			<div className={styles.modal}>
				<button
					className={styles.closeButton}
					onClick={onClose}
					aria-label="Close"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M6 18L18 6M6 6L18 18"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
				</button>

				<div className={styles.content}>
					<div className={styles.imageContainer}>
						<Image
							src={album.coverArt}
							alt={`Tapa del disco ${album.name} de ${album.artist} (${album.year})`}
							width={300}
							height={300}
							sizes="(max-width: 768px) 100vw, 300px"
							quality={85}
							className={styles.image}
						/>
						<section className={styles.section}>
							<h3 className={styles.sectionTitle}>Links</h3>
							<div className={styles.links}>
								{album.links.map((link) => (
									<a
										key={link.id}
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
										className={styles.link}
									>
										{link.name}
									</a>
								))}
							</div>
						</section>

						<section className={styles.section}>
							<h3 className={styles.sectionTitle}>Tags</h3>
							<div className={styles.tags}>
								{album.tags.map((tag) => (
									<div
										key={tag.id}
										className={`${styles.tag} ${styles[`tag-${tag.name}`]}`}
									>
										{tag.name}
									</div>
								))}
							</div>
						</section>
					</div>

					<div className={styles.details}>
						<section className={styles.section}>
							<p className={styles.subtitle}>{album.artist}</p>
							<h2 className={styles.title}>
								{album.name} ({album.year})
							</h2>
							<div
								className={`${styles.description}`}
								dangerouslySetInnerHTML={{ __html: album.description }}
							/>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AlbumModal;
