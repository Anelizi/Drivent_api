import { ApplicationError } from '@/protocols';

export function hotelError(): ApplicationError {
  return {
    name: 'HotelError',
    message: 'Cannot list hotels',
  };
}
