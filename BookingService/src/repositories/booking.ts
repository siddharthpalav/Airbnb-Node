import { Booking, Prisma } from '../src/generated/prisma/client';

import prismaClient from '../prisma/client';

export async function createBooking(
	bookingInput: Prisma.BookingCreateInput
): Promise<Booking> {
	const booking = await prismaClient.booking.create({
		data: bookingInput
	});

	return booking;
}
