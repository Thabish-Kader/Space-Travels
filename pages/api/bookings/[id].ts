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
	} else {
		console.log("Could not be deleted");
	}
}
