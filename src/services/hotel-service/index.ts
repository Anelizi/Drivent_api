import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import * as hotelRepository from '@/repositories/hotel-repository/index';

export async function hotelsList(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket) throw notFoundError();

  if (ticket.status === 'RESERVED') throw notFoundError();

  if (!ticket.TicketType.includesHotel) throw notFoundError();

  if (ticket.TicketType.isRemote) throw notFoundError();
}

export async function getHotel(userId: number) {
  await hotelsList(userId);

  const hotel = await hotelRepository.findHotel();

  if (!hotel) throw notFoundError();

  return hotel;
}

export async function getHotelId(userId: number, hotelId: number) {
  await hotelsList(userId);

  const hotel = await hotelRepository.findHotelById(hotelId);

  if (!hotel) throw notFoundError();

  return hotel;
}
