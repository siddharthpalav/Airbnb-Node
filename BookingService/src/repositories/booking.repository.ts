import { Booking, IdempotencyKey, Prisma } from '../src/generated/client';

import prismaClient from '../prisma/client';

export async function createBooking(
	bookingInput: Prisma.BookingCreateInput
): Promise<Booking> {
	const booking = await prismaClient.booking.create({
		data: bookingInput
	});

	return booking;
}

export async function createIdempotencyKey(
	key: string,
	bookingId: number
): Promise<IdempotencyKey> {
	const idempotencyKey = await prismaClient.idempotencyKey.create({
		data: {
			key,
			booking: {
				connect: {
					id: bookingId
				}
			}
		}
	});

	return idempotencyKey;
}

export async function getIdemptencyKey(
	key: string
): Promise<IdempotencyKey | null> {
	const idempotencyKey = await prismaClient.idempotencyKey.findUnique({
		where: {
			key: key
		}
	});

	return idempotencyKey;
}

export async function getBookingById(
	bookingId: number
): Promise<Booking | null> {
	const booking = await prismaClient.booking.findUnique({
		where: {
			id: bookingId
		}
	});

	return booking;
}

export async function changeBookingStatus(
	bookingId: number,
	status: Prisma.EnumBookingStatusFieldUpdateOperationsInput
): Promise<Booking> {
	const booking = await prismaClient.booking.update({
		where: {
			id: bookingId
		},
		data: {
			status: status
		}
	});

	return booking;
}

export async function confirmBooking(bookingId: number): Promise<Booking> {
	const booking = await prismaClient.booking.update({
		where: {
			id: bookingId
		},
		data: {
			status: 'CONFIRMED'
		}
	});

	return booking;
}

export async function cancelBooking(bookingId: number): Promise<Booking> {
	const booking = await prismaClient.booking.update({
		where: {
			id: bookingId
		},
		data: {
			status: 'CANCELLED'
		}
	});

	return booking;
}

export async function finalizeIdempotencyKey(
	key: string
): Promise<IdempotencyKey> {
	const idempotencyKey = await prismaClient.idempotencyKey.update({
		where: {
			key: key
		},
		data: {
			finalized: true
		}
	});

	return idempotencyKey;
}
