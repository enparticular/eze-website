// src/pages/api/albums.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { method } = req;

		if (method === "GET") {
			const { tag } = req.query;

			// Base query
			let albums;

			if (tag && tag !== "all") {
				// Filter by tag
				albums = await prisma.album.findMany({
					where: {
						tags: {
							some: {
								name: tag as string,
							},
						},
					},
					include: {
						links: true,
						tags: true,
					},
					orderBy: {
						year: "desc",
					},
				});
			} else {
				// Get all albums
				albums = await prisma.album.findMany({
					include: {
						links: true,
						tags: true,
					},
					orderBy: {
						year: "desc",
					},
				});
			}

			// Format the response data
			const formattedAlbums = albums.map((album) => ({
				...album,
				tags: album.tags.map((tag) => tag.name),
			}));

			return res.status(200).json(formattedAlbums);
		} else {
			// Method not allowed
			return res.status(405).json({ message: "Method not allowed" });
		}
	} catch (error) {
		console.error("Error in albums API:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}
