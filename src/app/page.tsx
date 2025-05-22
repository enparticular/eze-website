import { Suspense } from "react";
import prisma from "@/lib/prisma";
import HomeContent from "@/components/HomeContent/HomeContent";
import { generateAlbumSlug } from "@/utils/slugs";
import { TagFilterType, AlbumType } from "@/types";

export const metadata = {
	title: "Ezequiel Rivero",
	description: "Lista de discos y trabajos de Ezequiel Rivero",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = any;

export default async function Page(props: Props) {
	const searchParams = props?.searchParams || {};

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

	const formattedAlbums = albums.map((album) => ({
		...album,
		createdAt: album.createdAt.toISOString(),
		updatedAt: album.updatedAt.toISOString(),
	})) as unknown as AlbumType[];

	// Updated to handle searchParams as a record of string or string[]
	const albumParam =
		typeof searchParams.album === "string" ? searchParams.album : undefined;

	// Find selected album if album param exists
	const selectedAlbum = albumParam
		? formattedAlbums.find((album) => {
				const slug = generateAlbumSlug(album.year, album.name);
				return slug === albumParam;
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
