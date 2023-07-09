import Joi from "joi";
import { TicketBody } from "@/protocols";

export const ticketsSchema = Joi.object<TicketBody>({
    ticketTypeId: Joi.number().required(),
})