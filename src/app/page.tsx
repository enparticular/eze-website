import { Suspense } from "react";
import prisma from "@/lib/prisma";
import HomeContent from "@/components/HomeContent/HomeContent";

export const metadata = {
	title: "Ezequiel Rivero",
	description: "Lista de discos y trabajos de Ezequiel Rivero",
};

export default async function HomePage() {
	console.warn("--- HomePage Render Start ---");
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
	}));

	const formattedTags = ["all", ...tags.map((tag) => tag.name)];

	console.log("Tags from DB:", tags);
	console.log("Formatted Tags:", formattedTags);

	return (
		<main>
			<Suspense fallback={<div>Loading...</div>}>
				<HomeContent
					initialAlbums={JSON.parse(JSON.stringify(formattedAlbums))}
					allTags={formattedTags}
				/>
			</Suspense>
		</main>
	);
}
