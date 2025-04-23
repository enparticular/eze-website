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
			description:
				"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet purus in nisi maximus scelerisque quis non mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec libero diam, pulvinar eget placerat quis, congue sit amet turpis. Nunc tempus diam quis massa gravida aliquet. Nunc dictum enim vel nisi vulputate tempor. Integer placerat rutrum tellus, vel ornare dolor fringilla ac. Etiam mollis pretium augue quis vehicula. Suspendisse vitae felis scelerisque, maximus dui quis, sagittis nisi. Praesent cursus semper imperdiet. Curabitur at magna sed arcu ornare luctus.</p></p>Fusce leo dolor, semper eu fringilla vitae, vestibulum vel magna. Quisque porta quam eros, sed mollis magna condimentum sed. Vestibulum ultricies ultricies auctor. In rutrum facilisis ultrices. Etiam viverra turpis elit, ac mattis lorem hendrerit quis. Etiam vehicula pellentesque justo vel posuere. Nulla tempus ante vitae eros sollicitudin, sed pulvinar erat dapibus. Fusce consectetur turpis et dui elementum ultricies. Praesent sit amet ipsum erat. Duis aliquam rutrum purus sit amet placerat. Vestibulum id velit sapien. Ut condimentum ut lectus ac euismod.</p></p>Nam ut lectus rutrum sem convallis eleifend. Nam nec mauris ante. Ut id consequat tellus. Donec ac risus faucibus, eleifend sapien mattis, maximus augue. Morbi semper convallis ante vitae accumsan. In nec lectus sapien. Nam eu facilisis purus, eu luctus lectus. Etiam dignissim volutpat diam lacinia sagittis. Fusce non egestas ante. Quisque imperdiet urna ac scelerisque venenatis. Phasellus sit amet volutpat nulla. Nulla facilisi. Cras tempus malesuada lectus, id venenatis odio lobortis ut. Nunc egestas dapibus commodo. Sed scelerisque risus a tristique vestibulum..</p>",
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
			description:
				"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet purus in nisi maximus scelerisque quis non mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec libero diam, pulvinar eget placerat quis, congue sit amet turpis. Nunc tempus diam quis massa gravida aliquet. Nunc dictum enim vel nisi vulputate tempor. Integer placerat rutrum tellus, vel ornare dolor fringilla ac. Etiam mollis pretium augue quis vehicula. Suspendisse vitae felis scelerisque, maximus dui quis, sagittis nisi. Praesent cursus semper imperdiet. Curabitur at magna sed arcu ornare luctus.</p></p>Fusce leo dolor, semper eu fringilla vitae, vestibulum vel magna. Quisque porta quam eros, sed mollis magna condimentum sed. Vestibulum ultricies ultricies auctor. In rutrum facilisis ultrices. Etiam viverra turpis elit, ac mattis lorem hendrerit quis. Etiam vehicula pellentesque justo vel posuere. Nulla tempus ante vitae eros sollicitudin, sed pulvinar erat dapibus. Fusce consectetur turpis et dui elementum ultricies. Praesent sit amet ipsum erat. Duis aliquam rutrum purus sit amet placerat. Vestibulum id velit sapien. Ut condimentum ut lectus ac euismod.</p></p>Nam ut lectus rutrum sem convallis eleifend. Nam nec mauris ante. Ut id consequat tellus. Donec ac risus faucibus, eleifend sapien mattis, maximus augue. Morbi semper convallis ante vitae accumsan. In nec lectus sapien. Nam eu facilisis purus, eu luctus lectus. Etiam dignissim volutpat diam lacinia sagittis. Fusce non egestas ante. Quisque imperdiet urna ac scelerisque venenatis. Phasellus sit amet volutpat nulla. Nulla facilisi. Cras tempus malesuada lectus, id venenatis odio lobortis ut. Nunc egestas dapibus commodo. Sed scelerisque risus a tristique vestibulum..</p>",
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
					{ id: mixingTag.id },
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
	const album4 = await prisma.album.create({
		data: {
			name: "Liu y las Dificultades del Aprendizaje",
			year: 2008,
			artist: "3Pecados",
			coverArt: "/images/2008-liu.jpg",
			description: "<p>bla bla .</p>",
			tags: {
				connect: [
					{ id: masteringTag.id },
					{ id: productionTag.id },
					{ id: mixingTag.id },
				],
			},
			links: {
				create: [
					{
						name: "Bandcamp",
						href: "https://3pecados.bandcamp.com/album/liu-y-las-dificultades-graves-en-el-aprendizaje",
					},
				],
			},
		},
	});

	console.log({ album1, album2, album3, album4 });
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
