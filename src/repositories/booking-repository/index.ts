import { prisma } from '@/config';
import { CreateBookingParams } from '@/protocols';
import { Booking } from '@prisma/client';

async function findByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId,
    },
    include: {
      Room: true,
    },
  });
}

async function createBooking({ roomId, userId }: CreateBookingParams): Promise<Booking> {
  return prisma.booking.create({
    data: {
      roomId,
      userId,
    },
  });
}

async function findByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId,
    },
    include: {
      Room: true,
    },
  });
}

const bookingRepository = {
  findByUserId,
  createBooking,
  findByRoomId,
};

export default bookingRepository;
