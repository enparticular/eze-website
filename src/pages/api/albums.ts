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
			const albums = await prisma.album.findMany({
				where:
					tag && tag !== "all"
						? {
								tags: {
									some: {
										name: tag as string,
									},
								},
						  }
						: undefined,
				include: {
					links: true,
					tags: true,
				},
				orderBy: {
					year: "desc",
				},
			});

			// Format the response data - keep full tag objects
			const formattedAlbums = albums.map((album) => ({
				...album,
				createdAt: album.createdAt.toISOString(),
				updatedAt: album.updatedAt.toISOString(),
				// Don't transform tags, keep them as objects with id and name
			}));

			return res.status(200).json(formattedAlbums);
		} else {
			return res.status(405).json({ message: "Method not allowed" });
		}
	} catch (error) {
		console.error("Error in albums API:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}
