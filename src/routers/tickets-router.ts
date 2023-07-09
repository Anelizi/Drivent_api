import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicket, getTicketType, postCreateTicket } from '@/controllers/tickets-controller';
import { ticketsSchema } from '@/schemas/tickets-schemas';

const ticketsRouter = Router();

ticketsRouter
  .get('/types', getTicketType)
  .all('/*', authenticateToken)
  .get('/', getTicket)
  .post('/', validateBody(ticketsSchema), postCreateTicket);

export { ticketsRouter };