import { Booking, IdempotencyKey, Prisma } from '../src/generated/client';
import { validate as isValidUUID } from 'uuid';
import prismaClient from '../prisma/client';
import { BadRequestError, NotFoundError } from '../utils/errors/app.error';

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
			idemKey: key,
			booking: {
				connect: {
					id: bookingId
				}
			}
		}
	});

	return idempotencyKey;
}

export async function getIdemptencyKeyWithLock(
	tx: Prisma.TransactionClient,
	key: string
): Promise<IdempotencyKey | null> {
	if (!isValidUUID(key)) {
		throw new BadRequestError('Invalid idempotency key format');
	}

	const idempotencyKey = await tx.$queryRaw<IdempotencyKey[]>`
    SELECT * FROM IdempotencyKey WHERE idemKey = ${key} FOR UPDATE;
  `;

	if (!idempotencyKey || idempotencyKey.length === 0) {
		throw new NotFoundError('Idempotency key not found');
	}

	return idempotencyKey[0] as IdempotencyKey;
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

export async function confirmBooking(
	tx: Prisma.TransactionClient,
	bookingId: number
): Promise<Booking> {
	const booking = await tx.booking.update({
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
	tx: Prisma.TransactionClient,
	key: string
): Promise<IdempotencyKey> {
	const idempotencyKey = await tx.idempotencyKey.update({
		where: {
			idemKey: key
		},
		data: {
			finalized: true
		}
	});

	return idempotencyKey;
}
