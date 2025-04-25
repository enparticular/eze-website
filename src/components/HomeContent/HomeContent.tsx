"use client";

import { useState } from "react";
import { AlbumType, TagFilterType } from "@/types";
import TagFilter from "@/components/TagFilter";
import { AlbumGrid } from "@/components/AlbumGrid";
import styles from "./HomeContent.module.scss";

interface HomeContentProps {
	initialAlbums: AlbumType[];
	allTags: TagFilterType[];
}

export default function HomeContent({
	initialAlbums,
	allTags,
}: HomeContentProps) {
	console.log("AllTags received:", allTags);
	const [albums, setAlbums] = useState<AlbumType[]>(initialAlbums);
	const [activeTag, setActiveTag] = useState<TagFilterType>("all");
	const [isLoading, setIsLoading] = useState(false);

	const handleTagChange = async (tag: TagFilterType) => {
		setActiveTag(tag);
		setIsLoading(true);

		try {
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
			<TagFilter
				activeTag={activeTag}
				tags={allTags}
				onTagSelect={handleTagChange}
			/>
			{isLoading ? (
				<div className={styles.loading}>Loading...</div>
			) : (
				<AlbumGrid initialAlbums={albums} />
			)}
		</>
	);
}
