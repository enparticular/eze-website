import { TagFilterType } from "@/types";

export async function getTags(): Promise<TagFilterType[]> {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

	const url = `${baseUrl}"/api/tags"`;

	const response = await fetch(url, {
		next: {
			revalidate: 3600,
		},
	});

	if (!response.ok) {
		throw new Error("Failed to fetch tags");
	}

	const tags = await response.json();
	return ["all", ...tags.map((tag: { name: string }) => tag.name)];
}
