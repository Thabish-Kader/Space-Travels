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
