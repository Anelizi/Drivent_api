import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
// import ticketsService from '@/services';

export async function getTicketType(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    // const enrollmentWithAddress = await enrollmentsService.getOneWithAddressByUserId(userId);

    return res.status(httpStatus.OK).send();
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function getTicket(req: AuthenticatedRequest, res: Response) {
    // const { cep } = req.query as Record<string, string>;
    
    try {
        // const address = await enrollmentsService.getAddressFromCEP(cep);
        res.status(httpStatus.OK).send();
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return res.send(httpStatus.NO_CONTENT);
        }
    }
}

export async function postCreateTicket(req: AuthenticatedRequest, res: Response) {
  try {
    // await enrollmentsService.createOrUpdateEnrollmentWithAddress({
    //   ...req.body,
    //   userId: req.userId,
    // });

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}