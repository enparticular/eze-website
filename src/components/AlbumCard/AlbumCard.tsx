"use client";

import { FC } from "react";
import { AlbumType } from "@/types";
import styles from "./AlbumCard.module.scss";
import Image from "next/image";

interface AlbumCardProps {
	album: AlbumType;
	onClick: (album: AlbumType) => void;
	className?: string;
}

export const AlbumCard: FC<AlbumCardProps> = ({
	album,
	onClick,
	className,
}) => {
	return (
		<div
			className={`${styles.card} ${className ? className : ""}`}
			onClick={() => onClick(album)}
		>
			<div className={styles.imageContainer}>
				<Image
					src={album.coverArt}
					alt={`${album.name} cover`}
					fill="true"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className={styles.image}
				/>
			</div>
			<div className={styles.content}>
				<h3 className={styles.title}>
					{album.name} <span className={styles.year}>({album.year})</span>
				</h3>
				<div className={styles.meta}>
					<p className={styles.artist}>{album.artist}</p>
				</div>
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
			</div>
		</div>
	);
};

export default AlbumCard;
