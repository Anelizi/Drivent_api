import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotel, getHotelId } from '@/controllers';
const hotelRouter = Router();

hotelRouter
  .all('/*', authenticateToken)
  .get('/:hotelId', getHotelId)
  .get('/', getHotel)

export { hotelRouter };