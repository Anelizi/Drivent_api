import { cannotEnrollBeforeStartDateError, notFoundError } from '@/errors';
import { cannotBookingError } from '@/errors/cannot-booking-error';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import roomRepository from '@/repositories/room-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import httpStatus from 'http-status';

async function findBooking(userId: number) {
  const booking = await bookingRepository.findByUserId(userId);

  if (!booking) throw notFoundError();

  return booking;
}

async function listEnrollmenTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!enrollment) throw cannotBookingError();

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotBookingError();
  }
}

async function listRoomValid(roomId: number) {
  const room = await roomRepository.findById(roomId);
  const booking = await bookingRepository.findByRoomId(roomId);

  if (!room) throw notFoundError();
  if (room.capacity <= booking.length) throw cannotBookingError();
}

async function postBooking(userId: number, roomId: number) {
  if (!roomId) throw cannotEnrollBeforeStartDateError();

  await listEnrollmenTicket(userId);
  await listRoomValid(roomId);

  return bookingRepository.createBooking({ roomId, userId });
}

const bookingService = {
  findBooking,
  postBooking,
};

export default bookingService;
