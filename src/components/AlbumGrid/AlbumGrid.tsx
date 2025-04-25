"use client";

import { useState } from "react";
import { AlbumType } from "@/types";
import { AlbumCard } from "@/components/AlbumCard";
import AlbumModal from "@/components/AlbumModal";
import styles from "./AlbumGrid.module.scss";

interface AlbumGridProps {
	initialAlbums: AlbumType[];
}

export const AlbumGrid = ({ initialAlbums }: AlbumGridProps) => {
	const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(null);
	const [albums] = useState<AlbumType[]>(initialAlbums);

	return (
		<div className={styles.albumGrid}>
			{albums.map((album) => (
				<AlbumCard
					key={album.id}
					album={album}
					onClick={() => setSelectedAlbum(album)}
				/>
			))}

			{selectedAlbum && (
				<AlbumModal
					album={selectedAlbum}
					onClose={() => setSelectedAlbum(null)}
				/>
			)}
		</div>
	);
};
