// src/pages/api/tags.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { method } = req;

		if (method === "GET") {
			// Get all available tags
			const tags = await prisma.tag.findMany({
				orderBy: {
					name: "asc",
				},
			});

			// Format the response
			const formattedTags = tags.map((tag) => tag.name);

			return res.status(200).json(["all", ...formattedTags]);
		} else {
			// Method not allowed
			return res.status(405).json({ message: "Method not allowed" });
		}
	} catch (error) {
		console.error("Error in tags API:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
}
