// src/pages/index.tsx

import { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Layout from "@/components/Layout";
import AlbumCard from "@/components/AlbumCard";
import AlbumModal from "@/components/AlbumModal";
import TagFilter from "@/components/TagFilter";
import styles from "@/styles/components/Home.module.scss";
import prisma from "@/lib/prisma";
import { AlbumType, TagFilterType } from "@/types";

interface HomeProps {
	initialAlbums: AlbumType[];
	allTags: TagFilterType[];
}

export default function Home({ initialAlbums, allTags }: HomeProps) {
	const [albums, setAlbums] = useState<AlbumType[]>(initialAlbums);
	const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(null);
	const [activeTag, setActiveTag] = useState<TagFilterType>("all");
	const [isLoading, setIsLoading] = useState(false);

	// Handle tag filter change
	const handleTagChange = async (tag: TagFilterType) => {
		setActiveTag(tag);
		setIsLoading(true);

		try {
			// Fetch filtered albums from API
			const response = await fetch(
				`/api/albums${tag !== "all" ? `?tag=${tag}` : ""}`
			);
			const data = await response.json();
			setAlbums(data);
		} catch (error) {
			console.error("Error fetching filtered albums:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Head>
				<title>Ezequiel Rivero </title>
				<meta
					name="description"
					content="Lista de discos y trabajos de Ezequiel Rivero"
				/>
			</Head>

			<Layout>
				<TagFilter
					activeTag={activeTag}
					tags={allTags}
					onTagSelect={handleTagChange}
				/>

				{isLoading ? (
					<div className={styles.loadingState}>
						<p>Cargando...</p>
					</div>
				) : (
					<div className={styles.albumGrid}>
						{albums.map((album) => (
							<AlbumCard
								key={album.id}
								album={album}
								onClick={setSelectedAlbum}
							/>
						))}

						{albums.length === 0 && (
							<div className={styles.noResults}>
								<p>No hay discos con estas tags :(</p>
							</div>
						)}
					</div>
				)}
			</Layout>

			{selectedAlbum && (
				<AlbumModal
					album={selectedAlbum}
					onClose={() => setSelectedAlbum(null)}
				/>
			)}
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	// Fetch initial albums from database
	const albums = await prisma.album.findMany({
		include: {
			links: true,
			tags: true,
		},
		orderBy: {
			year: "desc",
		},
	});

	// Transform the data to match our frontend model
	const formattedAlbums = albums.map((album) => ({
		...album,
		createdAt: album.createdAt.toISOString(),
		updatedAt: album.updatedAt.toISOString(),
	}));

	// Get all available tags
	const tags = await prisma.tag.findMany();
	const tagNames = tags.map((tag) => tag.name);

	return {
		props: {
			initialAlbums: JSON.parse(JSON.stringify(formattedAlbums)),
			allTags: ["all", ...tagNames],
		},
	};
};
