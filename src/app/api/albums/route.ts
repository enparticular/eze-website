import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const tag = searchParams.get("tag");

		const albums = await prisma.album.findMany({
			where:
				tag && tag !== "all"
					? {
							tags: {
								some: {
									name: tag,
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

		return NextResponse.json(albums);
	} catch (error) {
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return NextResponse.json(
				{ error: `Database error: ${error.message}` },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
