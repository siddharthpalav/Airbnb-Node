import { CreateBookingDTO } from '../dto/booking.dto';
import {
	confirmBooking,
	createBooking,
	createIdempotencyKey,
	finalizeIdempotencyKey,
	getIdemptencyKeyWithLock
} from '../repositories/booking.repository';
import { BadRequestError, NotFoundError } from '../utils/errors/app.error';
import { generateIdempotencyKey } from '../utils/generateIdempotencyKey';
import prismaClient from '../prisma/client';

export async function createBookingService(createBookingDTO: CreateBookingDTO) {
	const booking = await createBooking({
		userId: createBookingDTO.userId,
		hotelId: createBookingDTO.hotelId,
		totalGuests: createBookingDTO.totalGuests,
		bookingAmount: createBookingDTO.bookingAmount
	});

	const idempotencyKey = await generateIdempotencyKey();

	await createIdempotencyKey(idempotencyKey, booking.id);

	return {
		bookingId: booking.id,
		idempotencyKey: idempotencyKey
	};
}

export async function confirmBookingService(idempotencyKey: string) {
	try {
		return await prismaClient.$transaction(async (tx) => {
			const idempotencyKeyData = await getIdemptencyKeyWithLock(
				tx,
				idempotencyKey
			);

			if (!idempotencyKeyData) {
				throw new NotFoundError('Idempotency key not found');
			}

			if (idempotencyKeyData.finalized) {
				throw new BadRequestError('Idempotency key already finalized');
			}

			if (!idempotencyKeyData.bookingId) {
				throw new BadRequestError('Booking not created yet');
			}

			const booking = await confirmBooking(
				tx,
				idempotencyKeyData.bookingId
			);

			await finalizeIdempotencyKey(tx, idempotencyKey);

			return booking;
		});
	} catch (error) {
		throw new BadRequestError(
			'Failed to confirm booking: ' + (error as Error).message
		);
	}
}
