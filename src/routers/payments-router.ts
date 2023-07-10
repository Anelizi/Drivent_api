import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { paymentsSchema } from '@/schemas/payments-schemas';
import { getPaymenys, postCreatePayments } from '@/controllers/payments-controller';

const paymentsRouter = Router();

paymentsRouter
  .all('/*', authenticateToken)
  .get('/', getPaymenys)
  .post('/process', validateBody(paymentsSchema), postCreatePayments);

export { paymentsRouter };