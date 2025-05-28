import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

// Initialize Prisma client with PostgreSQL connection
const prisma = new PrismaClient();

async function main() {
	// Read exported data
	const albums = JSON.parse(fs.readFileSync("exported-albums.json", "utf-8"));
	const tags = JSON.parse(fs.readFileSync("exported-tags.json", "utf-8"));

	console.log(`Importing ${tags.length} tags...`);

	// First import all tags
	for (const tag of tags) {
		await prisma.tag.upsert({
			where: { name: tag.name },
			update: {},
			create: { name: tag.name },
		});
	}

	console.log(`Importing ${albums.length} albums...`);

	// Then import albums
	for (const album of albums) {
		const { id, links, tags, createdAt, updatedAt, ...albumData } = album;

		try {
			// Create the album
			const createdAlbum = await prisma.album.create({
				data: {
					...albumData,
					createdAt: new Date(createdAt),
					updatedAt: new Date(updatedAt),
					// Set up tag connections
					tags: {
						connect: tags.map((tag) => ({ name: tag.name })),
					},
				},
			});

			console.log(`Imported album: ${createdAlbum.name}`);

			// Create links for this album
			if (links && links.length > 0) {
				for (const link of links) {
					const { id, albumId, ...linkData } = link;
					await prisma.link.create({
						data: {
							...linkData,
							album: { connect: { id: createdAlbum.id } },
						},
					});
				}
				console.log(
					`Added ${links.length} links to album ${createdAlbum.name}`
				);
			}
		} catch (error) {
			console.error(`Failed to import album ${albumData.name}:`, error);
		}
	}
}

main()
	.catch((e) => console.error(e))
	.finally(async () => await prisma.$disconnect());
