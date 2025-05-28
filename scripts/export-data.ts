import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

// Initialize Prisma client with SQLite connection
const prisma = new PrismaClient();

async function main() {
	// Export albums with their relationships
	const albums = await prisma.album.findMany({
		include: {
			links: true,
			tags: true,
		},
	});

	// Export tags separately (to avoid duplication)
	const tags = await prisma.tag.findMany();

	// Write data to files
	fs.writeFileSync("exported-albums.json", JSON.stringify(albums, null, 2));
	fs.writeFileSync("exported-tags.json", JSON.stringify(tags, null, 2));

	console.log(`Exported ${albums.length} albums and ${tags.length} tags`);
}

main()
	.catch((e) => console.error(e))
	.finally(async () => await prisma.$disconnect());
