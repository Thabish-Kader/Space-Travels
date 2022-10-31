import prisma from "../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const register = await prisma.book.findMany();
		res.status(200).json(register);
	} catch (error) {
		res.status(400).json({
			message: `Error Message${error} `,
		});
	}
}
