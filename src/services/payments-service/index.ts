import { CardData, PaymentParams } from '@/protocols';
import * as ticketRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError, unauthorizedError } from '@/errors';
import * as paymentRepository from '@/repositories/payments-repository';

export async function createPayment(ticketId: number, userId: number, cardData: CardData) {
  const ticket = await ticketRepository.findTicketById(ticketId);

  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findWithAddressByUserId(ticket.enrollmentId);

  if (!enrollment) throw notFoundError();

  if (enrollment.userId !== userId) throw unauthorizedError();

  const payment: PaymentParams = {
    ticketId,
    value: ticket.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  const result = await paymentRepository.createPayments(ticketId, payment);

  return result;
}

export async function findPaymentById(userId: number, ticketId: number) {
  const ticket = await ticketRepository.findTicketById(ticketId);

  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.findWithAddressByUserId(ticket.enrollmentId);

  if (!enrollment) throw notFoundError();

  if (enrollment.userId !== userId) throw unauthorizedError();

  const payment = await paymentRepository.findPaymentById(ticketId);
  if (!payment) throw notFoundError();

  return payment;
}
