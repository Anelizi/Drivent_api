import { notFoundError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketsRepository from "@/repositories/tickets-repository";
import * as hotelRepository from "@/repositories/hotel-repository/index";

export async function hotelsList(userId: number) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

    if(!enrollment) throw notFoundError();

    const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

    if(!ticket || ticket.status === 'RESERVED' || !ticket.TicketType.includesHotel){
        throw notFoundError();
    }
}

export async function getHotel(userId: number) {
    await hotelsList(userId);

    const hotel = await hotelRepository.findHotel();
    return hotel;
}