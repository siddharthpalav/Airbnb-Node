import { createHotelDTO } from "../dto/hotel.dto";
import {
  // createHotel,
  // getHotelById,
  // getAllHotels,
  // deleteHotelById,
  // updateHotel,
  // softDeleteHotel,
  HotelRepository,
} from "../repositories/hotel.repository";

const hotelRepository = new HotelRepository();

export async function createHotelService(hotelData: createHotelDTO) {
  const hotel = await hotelRepository.create(hotelData);
  return hotel;
}

export async function getHotelByIdService(id: number) {
  const hotel = await hotelRepository.findById(id);
  return hotel;
}

export async function getAllHotelService() {
  const hotels = await hotelRepository.findAll();
  return hotels;
}

export async function deleteHotelService(id: number) {
  // const hotel = await deleteHotelById(id);
  // return hotel;
  const response = await hotelRepository.softDelete(id);
  return response;
}

export async function updateHotelService(
  id: number,
  hotelData: createHotelDTO,
) {
  const hotel = await hotelRepository.update(id, hotelData);
  return hotel;
}
