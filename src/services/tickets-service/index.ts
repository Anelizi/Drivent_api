import * as ticketRepository from '@/repositories/tickets-repository/index';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError } from '@/errors';
import { TicketStatus } from '@prisma/client';

export async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  const status = TicketStatus.RESERVED;

  if (!enrollment) throw notFoundError();

  const ticket = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: status,
  };

  const result = await ticketRepository.createTicket(ticket);

  if(!result) throw notFoundError();

  const ticketId = await ticketRepository.findTicketById(enrollment.id);

  return ticketId;
}

// export async function name(params:type) {

// }

// export async function name(params:type) {

// }
