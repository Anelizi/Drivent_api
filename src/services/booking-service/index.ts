import { notFoundError } from '@/errors';
import bookingRepository from '@/repositories/booking-repository';

async function findBooking(userId: number) {
  const booking = await bookingRepository.findByUserId(userId);

  if (!booking) throw notFoundError();

  return booking;
}

const bookingService = {
  findBooking,
};

export default bookingService;
