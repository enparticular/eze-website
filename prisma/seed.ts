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
			name: "Pocos nombres para demasiadas personas",
			year: 2006,
			artist: "Amelia",
			coverArt: "/images/2006-amelia.jpg",
			description: "<p>bla bla bla.</p>",
			tags: {
				connect: [
					{ id: musicTag.id },
					{ id: mixingTag.id },
					{ id: productionTag.id },
					{ id: masteringTag.id },
				],
			},
			links: {
				create: [
					{
						name: "Spotify",
						href: "https://open.spotify.com/album/2Sb5xv2IuP0juFNlJkPC7O?si=A0zwgB94QpW8LgzYfrh9XQ",
					},
					{
						name: "Bandcamp",
						href: "https://amelia-uy.bandcamp.com/album/pocos-nombres-para-demasiadas-personas",
					},
				],
			},
		},
	});

	const album2 = await prisma.album.create({
		data: {
			name: "Segundo Nombre",
			year: 2009,
			artist: "Amelia",
			coverArt: "/images/2009-segundo-nombre.jpg",
			description: "<p>bla bla .</p>",
			tags: {
				connect: [
					{ id: musicTag.id },
					{ id: mixingTag.id },
					{ id: productionTag.id },
					{ id: masteringTag.id },
				],
			},
			links: {
				create: [
					{
						name: "Spotify",
						href: "https://open.spotify.com/album/5yijX4gsrL2i9xRspO8t2G?si=hPo92lArSyi6sOLSfIuoRQ",
					},
					{
						name: "Bandcamp",
						href: "https://amelia-uy.bandcamp.com/album/segundo-nombre",
					},
				],
			},
		},
	});

	const album3 = await prisma.album.create({
		data: {
			name: "Otro Final",
			year: 2010,
			artist: "Amelia",
			coverArt: "/images/2010-otro-final.jpg",
			description: "<p>bla bla .</p>",
			tags: {
				connect: [
					{ id: musicTag.id },
					{ id: masteringTag.id },
					{ id: productionTag.id },
					{ id: masteringTag.id },
				],
			},
			links: {
				create: [
					{
						name: "Spotify",
						href: "https://open.spotify.com/album/3y6OqJhonYOmA7woFA7HKu?si=jLvTP8GtSx-p2drETAil4Q",
					},
					{
						name: "Bandcamp",
						href: "https://amelia-uy.bandcamp.com/album/otro-final",
					},
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
