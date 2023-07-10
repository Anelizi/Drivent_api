import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicket, getTicketType, postCreateTicket } from '@/controllers/tickets-controller';
import { ticketsSchema } from '@/schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getTicketType)
  .get('/', getTicket)
  .post('/', validateBody(ticketsSchema), postCreateTicket);

export { ticketsRouter };