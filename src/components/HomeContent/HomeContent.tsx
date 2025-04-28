"use client";

import { useState, useEffect } from "react";
import { AlbumType, TagFilterType } from "@/types";
import TagFilter from "@/components/TagFilter";
import { AlbumGrid } from "@/components/AlbumGrid";

interface HomeContentProps {
	initialAlbums: AlbumType[];
	allTags: TagFilterType[];
	initialSelectedAlbum?: AlbumType | null;
}

export default function HomeContent({
	initialAlbums,
	allTags,
	initialSelectedAlbum,
}: HomeContentProps) {
	const [albums, setAlbums] = useState<AlbumType[]>(initialAlbums);
	const [activeTag, setActiveTag] = useState<TagFilterType>("all");
	const [selectedAlbum, setSelectedAlbum] = useState<AlbumType | null>(
		initialSelectedAlbum || null
	);

	// Update selected album when filtered albums change
	useEffect(() => {
		if (selectedAlbum) {
			const albumStillExists = albums.find((a) => a.id === selectedAlbum.id);
			if (!albumStillExists) {
				setSelectedAlbum(null);
			}
		}
	}, [albums, selectedAlbum]);

	const handleTagChange = async (tag: TagFilterType) => {
		console.log("Tag selected:", tag); // Debug selected tag
		setActiveTag(tag);

		try {
			const url = `/api/albums${tag !== "all" ? `?tag=${tag}` : ""}`;
			console.log("Fetching URL:", url); // Debug URL

			const response = await fetch(url);
			if (!response.ok) {
				throw new Error("Failed to fetch albums");
			}
			const data = await response.json();
			console.log("Received data:", data); // Debug response data
			setAlbums(data);
		} catch (error) {
			console.error("Error fetching filtered albums:", error);
			// Optionally reset to initial albums on error
			setAlbums(initialAlbums);
		}
	};

	return (
		<>
			<TagFilter
				activeTag={activeTag}
				tags={allTags}
				onTagSelect={handleTagChange}
			/>

			<AlbumGrid initialAlbums={albums} initialSelectedAlbum={selectedAlbum} />
		</>
	);
}
