import prisma from "../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { name, email, ticket, destination, message } = req.body;

	try {
		const register = await prisma.book.create({
			data: {
				name,
				email,
				ticket,
				destination,
				message,
			},
		});
		res.status(200).json(register);
	} catch (error) {
		res.status(400).json({
			message: `Error Message${error} `,
		});
	}
}
