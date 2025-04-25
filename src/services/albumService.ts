import { AlbumType } from "@/types";

export async function getAlbums(tag?: string): Promise<AlbumType[]> {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

	const url = tag
		? `${baseUrl}/api/albums?tag=${encodeURIComponent(tag)}`
		: `${baseUrl}/api/albums`;

	const response = await fetch(url, {
		next: {
			revalidate: 3600,
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch albums");
	}

	return response.json();
}
