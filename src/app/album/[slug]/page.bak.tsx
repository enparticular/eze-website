import { generateAlbumSlug } from "@/utils/slugs";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Album, Link as LinkType, Tag } from "@prisma/client";
import styles from "./page.module.scss";

// Define types that match your Prisma models
type AlbumWithRelations = Album & {
	links: LinkType[];
	tags: Tag[];
};

// TypeScript-safe metadata generation - use Next.js compatible types

export async function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Promise<Metadata> {
	const album = await getAlbumBySlug(params.slug);

	if (!album) {
		return {
			title: "Album Not Found",
			description: "The requested album could not be found.",
		};
	}

	return {
		title: `${album.name} (${album.year}) by ${album.artist}`,
		description: `${album.description
			.substring(0, 160)
			.replace(/<[^>]*>/g, "")}...`,
		openGraph: {
			images: [album.coverArt],
		},
	};
}

// Fetch album data
async function getAlbumBySlug(
	slug: string
): Promise<AlbumWithRelations | null> {
	const albums = await prisma.album.findMany({
		include: {
			links: true,
			tags: true,
		},
	});

	// Format dates for serialization
	const formattedAlbums = albums.map((album) => ({
		...album,
		createdAt: album.createdAt.toISOString(),
		updatedAt: album.updatedAt.toISOString(),
	})) as unknown as AlbumWithRelations[];

	return (
		formattedAlbums.find((album) => {
			const albumSlug = generateAlbumSlug(album.year, album.name);
			return albumSlug === slug;
		}) || null
	);
}

// Add type safety to the page component
export default async function AlbumPage({
	params,
}: {
	params: { slug: string };
}) {
	const album = await getAlbumBySlug(params.slug);

	if (!album) {
		return (
			<main>
				<h1>Album Not Found</h1>
				<Link href="/">← Back to all albums</Link>
			</main>
		);
	}

	function AlbumStructuredData({ album }: { album: AlbumWithRelations }) {
		const structuredData = {
			"@context": "https://schema.org",
			"@type": "MusicAlbum",
			name: album.name,
			byArtist: {
				"@type": "MusicGroup",
				name: album.artist,
			},
			datePublished: album.year,
			image: album.coverArt,
			description: album.description.replace(/<[^>]*>/g, ""),
		};

		return (
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
			/>
		);
	}

	return (
		<main className={styles.container}>
			<AlbumStructuredData album={album} />

			<Link href="/" className={styles.backLink}>
				← Ver todos los discos
			</Link>

			<div className={styles.albumPage}>
				<div className={styles.albumImage}>
					<Image
						src={album.coverArt}
						alt={`${album.name} cover art`}
						fill
						priority
						sizes="(max-width: 768px) 100vw, 400px"
					/>
				</div>

				<div className={styles.albumContent}>
					<p className={styles.albumArtist}>{album.artist}</p>
					<h1 className={styles.albumTitle}>
						{album.name}{" "}
						<span className={styles.albumYear}>({album.year})</span>
					</h1>

					<div
						className={styles.albumDescription}
						dangerouslySetInnerHTML={{ __html: album.description }}
					/>

					{album.links.length > 0 && (
						<section>
							<h2 className={styles.sectionTitle}>Links</h2>
							<div className={styles.albumLinks}>
								{album.links.map((link) => (
									<a
										key={link.id}
										href={link.href}
										target="_blank"
										rel="noopener noreferrer"
										className={styles.albumLink}
									>
										{link.name}
									</a>
								))}
							</div>
						</section>
					)}

					{album.tags.length > 0 && (
						<section>
							<h2 className={styles.sectionTitle}>Tags</h2>
							<div className={styles.albumTags}>
								{album.tags.map((tag) => (
									<span
										key={tag.id}
										className={`${styles.albumTag} ${
											styles[`tag-${tag.name}`] || ""
										}`}
									>
										{tag.name}
									</span>
								))}
							</div>
						</section>
					)}
				</div>
			</div>
		</main>
	);
}

// You might also want to generate static paths for all albums
export async function generateStaticParams() {
	const albums = await prisma.album.findMany();

	return albums.map((album) => ({
		slug: generateAlbumSlug(album.year, album.name),
	}));
}
