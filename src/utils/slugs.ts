export function generateAlbumSlug(year: number, name: string): string {
	return `${year}-${name}`
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");
}

export function parseAlbumSlug(
	slug: string
): { year: number; name: string } | null {
	const match = slug.match(/^(\d{4})-(.+)$/);
	if (!match) return null;

	return {
		year: parseInt(match[1], 10),
		name: match[2].replace(/-/g, " "),
	};
}
