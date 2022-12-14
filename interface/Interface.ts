export interface IFormInput {
	name: string;
	email: string;
	ticket: TicketEnum;
	destination: destinationEnum;
	message?: string;
}

enum TicketEnum {
	premium = "premium",
	standard = "standard",
	budget = "budget",
}

enum destinationEnum {
	mars = "mars",
	saturn = "saturn",
	neptune = "neptune",
}

export interface IBookings extends IFormInput {
	createdAt: string;
	id: string;
}

export interface IRegister {
	register: {
		name: string;
		email: string;
		ticket: TicketEnum;
		destination: destinationEnum;
		message?: string;
		id: string;
	}[];
}

export type RegisterProps = {
	bookingData: {
		name: string;
		email: string;
		destination: string;
		message: string;
		ticket: string;
		id: string;
	};
};
