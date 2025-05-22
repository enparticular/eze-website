"use client";

import { useState } from "react";
import { AlbumType } from "@/types";
import { AlbumCard } from "@/components/AlbumCard";
import AlbumModal from "@/components/AlbumModal";
import styles from "./AlbumGrid.module.scss";
import { useRouter } from "next/navigation";
import { generateAlbumSlug } from "@/utils/slugs";

interface AlbumGridProps {
	initialAlbums: AlbumType[];
	initialSelectedAlbum?: AlbumType | null;
}

export const AlbumGrid = ({
	initialAlbums,
	initialSelectedAlbum,
}: AlbumGridProps) => {
	const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(
		initialSelectedAlbum || null
	);
	const router = useRouter();

	const handleClose = () => {
		setSelectedAlbum(null);
		router.replace("/", { scroll: false });
	};

	const handleAlbumClick = (album: AlbumType) => {
		setSelectedAlbum(album);
		const slug = generateAlbumSlug(album.year, album.name);
		router.replace(`/?album=${slug}`, { scroll: false });
	};
	// const [albums] = useState<AlbumType[]>(initialAlbums);

	return (
		<div className={styles.albumGrid}>
			{initialAlbums.map((album, index) => (
				<div
					key={album.id}
					className={styles.gridItemSlide}
					style={{ animationDelay: `${index * 0.05}s` }}
				>
					<AlbumCard
						key={album.id}
						album={album}
						onClick={handleAlbumClick}
						className={styles[`item${(index % 4) + 1}`]}
					/>
				</div>
			))}

			{selectedAlbum && (
				<AlbumModal album={selectedAlbum} onClose={handleClose} />
			)}
		</div>
	);
};
