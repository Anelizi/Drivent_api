import { AuthenticatedRequest } from "@/middlewares";
import { Response } from 'express';
import httpStatus from "http-status";

export async function getHotel(req: AuthenticatedRequest, res: Response) {
    try {
    //   const ticketTypes = await ticketService.getTicketType();
    //   return res.status(httpStatus.OK).send(ticketTypes);
    } catch (e) {
      return res.sendStatus(httpStatus.NO_CONTENT);
    }
}

export async function getHotelId(req: AuthenticatedRequest, res: Response) {
    try {
    //   const ticketTypes = await ticketService.getTicketType();
    //   return res.status(httpStatus.OK).send(ticketTypes);
    } catch (e) {
      return res.sendStatus(httpStatus.NO_CONTENT);
    }
}