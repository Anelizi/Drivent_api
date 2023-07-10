import { prisma } from '@/config';
import { PaymentParams } from '@/protocols';

export async function createPayments(ticketId: number, params: PaymentParams) {
  return prisma.payment.create({
    data: {
      ticketId,
      ...params,
    },
  });
}

export async function findPaymentById(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}
