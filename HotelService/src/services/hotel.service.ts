import { createHotelDTO } from "../dto/hotel.dto";
import {
  createHotel,
  getHotelById,
  getAllHotels,
  // deleteHotelById,
  updateHotel,
  softDeleteHotel,
} from "../repositories/hotel.repository";

export async function createHotelService(hotelData: createHotelDTO) {
  const hotel = await createHotel(hotelData);
  return hotel;
}

export async function getHotelByIdService(id: number) {
  const hotel = await getHotelById(id);
  return hotel;
}

export async function getAllHotelService() {
  const hotels = await getAllHotels();
  return hotels;
}

export async function deleteHotelService(id: number) {
  // const hotel = await deleteHotelById(id);
  // return hotel;
  const response = await softDeleteHotel(id);
  return response;
}

export async function updateHotelService(
  id: number,
  hotelData: createHotelDTO,
) {
  const hotel = await updateHotel(id, hotelData);
  return hotel;
}
