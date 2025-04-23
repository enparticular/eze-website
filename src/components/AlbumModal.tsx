// src/components/AlbumModal.tsx

import { FC } from "react";
import { AlbumType } from "@/types";
import styles from "@/styles/components/AlbumModal.module.scss";
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
				<div className={styles.header}>
					<div>
						<h2 className={styles.title}>{album.name}</h2>
						<p className={styles.subtitle}>
							{album.artist} • {album.year}
						</p>
					</div>
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
				</div>

				<div className={styles.content}>
					<div className={styles.imageContainer}>
						<Image
							src={album.coverArt}
							alt={`${album.name} cover`}
							fill
							sizes="(max-width: 768px) 100vw, 300px"
							className={styles.image}
						/>
					</div>

					<div className={styles.details}>
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
									<span
										key={tag.id}
										className={`${styles.tag} ${styles[`tag${tag.name}`]}`}
									>
										{tag.name}
									</span>
								))}
							</div>
						</section>

						<section className={styles.section}>
							<h3 className={styles.sectionTitle}>Description</h3>
							<div
								className={styles.description}
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
