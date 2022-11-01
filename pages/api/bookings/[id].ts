import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const bookingid = req.query.id;
	if (req.method === "DELETE") {
		const deleteBooking = await prisma.book.delete({
			where: { id: bookingid as string },
		});
		res.status(200).json(bookingid);
	} else if (req.method === "PUT") {
		const { name, email, ticket, destination, message } = req.body;
		try {
			const register = await prisma.book.update({
				where: {
					id: bookingid as string,
				},
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
	} else {
		console.log("Problem Occured");
	}
}
