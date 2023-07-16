import { prisma } from '@/config';
import { hotelsList } from '@/services/hotel-service';

export async function findHotel() {
    return prisma.hotel.findMany();
}

export async function findHotelById(hotelId: number) {
    return prisma.hotel.findFirst({
        where: {
            id: hotelId,
        },
        include:{
            Rooms: true,
        }
    })
}