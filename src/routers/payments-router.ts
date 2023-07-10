import { Router } from 'express';
import { authenticateToken } from '@/middlewares';

const paymentsRouter = Router();

paymentsRouter
  .get('/types', )
  .all('/*', authenticateToken)
  .post('/process', );

export { paymentsRouter };