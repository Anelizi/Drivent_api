import { prisma } from '@/config';

async function findByHotelId(hotelId: number) {
  return prisma.room.findMany({
    where: {
      hotelId,
    },
  });
}

async function findById(roomId: number) {
  return prisma.room.findFirst({
    where: {
      id: roomId,
    },
  });
}

const roomRepository = {
  findByHotelId,
  findById,
};

export default roomRepository;