"use client";

import { useState, useEffect } from "react";
import { AlbumType, TagFilterType } from "@/types";
import TagFilter from "@/components/TagFilter";
import { AlbumGrid } from "@/components/AlbumGrid";
import Footer from "@/components/Footer";

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
	// Keep the original albums for filtering
	const [originalAlbums] = useState<AlbumType[]>(initialAlbums);

	// The filtered albums to display
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

	const handleTagChange = (tag: TagFilterType) => {
		console.log("Tag selected:", tag); // Debug selected tag
		setActiveTag(tag);

		// Filter albums client-side instead of fetching from server
		if (tag === "all") {
			setAlbums(originalAlbums);
		} else {
			const filtered = originalAlbums.filter((album) =>
				album.tags.some((albumTag) => albumTag.name === tag)
			);
			console.log(`Found ${filtered.length} albums with tag '${tag}'`);
			setAlbums(filtered);
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
			<Footer />
		</>
	);
}
