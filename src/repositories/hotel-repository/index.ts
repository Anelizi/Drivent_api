import { prisma } from '@/config';

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