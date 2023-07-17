import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import httpStatus from 'http-status';
import * as hotelServer from '@/services/hotel-service/index';

export async function getHotel(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  console.log(userId);
  try {
    const hotel = await hotelServer.getHotel(Number(userId));

    return res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    if (error.name === 'NotFoundError') {
        return res.sendStatus(httpStatus.NOT_FOUND);
      }
      return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
}

export async function getHotelId(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { hotelId } = req.params;
  console.log(hotelId);
  try {
    const hotel = await hotelServer.getHotelId(Number(userId), Number(hotelId));

      return res.status(httpStatus.OK).send(hotel);
  } catch (error) {
    if (error.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if (error.name === 'HotelError') {
        return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
      }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
