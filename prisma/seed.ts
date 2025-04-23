// prisma/seed.ts

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	// Delete existing data
	await prisma.link.deleteMany();
	await prisma.$executeRaw`DELETE FROM _AlbumToTag`;
	await prisma.tag.deleteMany();
	await prisma.album.deleteMany();

	// Create tags
	const musicTag = await prisma.tag.create({ data: { name: "music" } });
	const mixingTag = await prisma.tag.create({ data: { name: "mixing" } });
	const masteringTag = await prisma.tag.create({ data: { name: "mastering" } });
	const productionTag = await prisma.tag.create({
		data: { name: "production" },
	});

	// Create albums with tags and links
	const album1 = await prisma.album.create({
		data: {
			name: "Future Nostalgia",
			year: 2023,
			artist: "Dua Lipa",
			coverArt: "/images/placeholder.jpg",
			description:
				"<p>An incredible album that blends retro and modern sounds with amazing production.</p><p>Every track on this album delivers high energy dance vibes while maintaining artistic integrity.</p>",
			tags: {
				connect: [{ id: musicTag.id }, { id: productionTag.id }],
			},
			links: {
				create: [
					{ name: "Spotify", href: "https://spotify.com" },
					{ name: "Apple Music", href: "https://music.apple.com" },
				],
			},
		},
	});

	const album2 = await prisma.album.create({
		data: {
			name: "Chromatica",
			year: 2022,
			artist: "Lady Gaga",
			coverArt: "/images/placeholder.jpg",
			description:
				"<p>A return to Lady Gaga's dance-pop roots with stellar production values.</p><p>The album features intricate mixing techniques that create a cohesive sonic landscape.</p>",
			tags: {
				connect: [
					{ id: musicTag.id },
					{ id: mixingTag.id },
					{ id: productionTag.id },
				],
			},
			links: {
				create: [
					{ name: "Spotify", href: "https://spotify.com" },
					{ name: "YouTube", href: "https://youtube.com" },
				],
			},
		},
	});

	const album3 = await prisma.album.create({
		data: {
			name: "After Hours",
			year: 2021,
			artist: "The Weeknd",
			coverArt: "/images/placeholder.jpg",
			description:
				"<p>A masterfully crafted album showcasing incredible mastering techniques.</p><p>The sonic quality and dynamic range demonstrate exceptional attention to detail.</p>",
			tags: {
				connect: [
					{ id: musicTag.id },
					{ id: masteringTag.id },
					{ id: productionTag.id },
				],
			},
			links: {
				create: [
					{ name: "Official Site", href: "https://theweeknd.com" },
					{ name: "Spotify", href: "https://spotify.com" },
				],
			},
		},
	});

	console.log({ album1, album2, album3 });
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
