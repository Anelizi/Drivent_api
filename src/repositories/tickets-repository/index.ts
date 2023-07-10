import { prisma } from '@/config';
import { TicketParams } from '@/protocols';

export async function createTicket(ticket: TicketParams) {
  return prisma.ticket.create({
    data: ticket,
  });
}

export async function findTicketById(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

// export async function name(params:type) {

// }
