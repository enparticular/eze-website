// src/app/sitemap.ts
import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";
import { generateAlbumSlug } from "@/utils/slugs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	// Get all albums
	const albums = await prisma.album.findMany();

	const albumsEntries = albums.map((album) => {
		const slug = generateAlbumSlug(album.year, album.name);
		return {
			url: `https://enparticular.net/album/${slug}`,
			lastModified: album.updatedAt,
			changeFrequency: "monthly" as const,
			priority: 0.8,
		};
	});

	return [
		{
			url: "https://enparticular.net",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 1,
		},
		...albumsEntries,
	];
}
