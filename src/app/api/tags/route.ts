import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET() {
	try {
		const tags = await prisma.tag.findMany({
			orderBy: {
				name: "asc",
			},
		});

		return NextResponse.json(tags);
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
