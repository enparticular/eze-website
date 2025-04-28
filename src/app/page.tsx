import { Suspense } from "react";
import prisma from "@/lib/prisma";
import HomeContent from "@/components/HomeContent/HomeContent";
import { generateAlbumSlug } from "@/utils/slugs";
import { AlbumType, TagFilterType } from "@/types";

export const metadata = {
	title: "Ezequiel Rivero",
	description: "Lista de discos y trabajos de Ezequiel Rivero",
};

interface PageProps {
	searchParams: { album?: string };
}

export default async function HomePage({ searchParams }: PageProps) {
	const [albums, tags] = await Promise.all([
		prisma.album.findMany({
			include: {
				links: true,
				tags: true,
			},
			orderBy: {
				year: "desc",
			},
		}),
		prisma.tag.findMany(),
	]);

	const formattedAlbums: AlbumType[] = albums.map((album) => ({
		...album,
		createdAt: album.createdAt.toISOString(),
		updatedAt: album.updatedAt.toISOString(),
	}));

	// Find selected album if album param exists
	const selectedAlbum = searchParams.album
		? formattedAlbums.find((album) => {
				const slug = generateAlbumSlug(album.year, album.name);
				return slug === searchParams.album;
		  })
		: null;

	const formattedTags: TagFilterType[] = [
		"all",
		...tags.map((tag) => tag.name),
	];

	// Serialize the data once for all components
	const serializedData = {
		albums: formattedAlbums,
		selectedAlbum: selectedAlbum,
		tags: formattedTags,
	};

	return (
		<main>
			<Suspense fallback={<div>Loading...</div>}>
				<HomeContent
					initialAlbums={serializedData.albums}
					allTags={serializedData.tags}
					initialSelectedAlbum={serializedData.selectedAlbum}
				/>
			</Suspense>
		</main>
	);
}
