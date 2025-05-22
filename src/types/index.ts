export interface Tag {
	id: number;
	name: string;
}

export interface LinkType {
	id: number;
	name: string;
	href: string;
	albumId: number;
}

export interface AlbumType {
	id: number;
	name: string;
	year: number;
	artist: string;
	coverArt: string;
	description: string;
	links: LinkType[];
	tags: Tag[];
	createdAt: string;
	updatedAt: string;
}

// For tag filtering functionality
export type TagFilterType = "all" | Tag["name"];
