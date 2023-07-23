import { prisma } from '@/config';
import { CreateBookingParams, PutBookingParams } from '@/protocols';
import { Booking } from '@prisma/client';
import { create } from 'domain';

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

async function changeBooking({ id, roomId, userId }: PutBookingParams) {
  return prisma.booking.upsert({
    where: {
      id,
    },
    create: {
      roomId,
      userId,
    },
    update: {
      roomId,
    },
  });
}

const bookingRepository = {
  findByUserId,
  createBooking,
  findByRoomId,
  changeBooking,
};

export default bookingRepository;
