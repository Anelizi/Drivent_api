import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import * as paymentsService from '@/services/payments-service';

export async function getPaymenys(req: AuthenticatedRequest, res: Response) {
  const ticketId = Number(req.query.ticketId);
  const { userId } = req;

  if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const payment = await paymentsService.findPaymentById(userId, ticketId);

    if(!payment){
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.send(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postCreatePayments(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketId, cardData } = req.body;

  if (!ticketId || !cardData) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  try {
    const payment = await paymentsService.createPayment(ticketId, userId, cardData);

    if(!payment){
      return res.sendStatus(httpStatus.NOT_FOUND);
    }

    return res.status(httpStatus.OK).send(payment);
  } catch (error) {
    if (error.name === 'NotFoundError') return res.send(httpStatus.NOT_FOUND);

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}