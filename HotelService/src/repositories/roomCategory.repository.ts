import logger from "../config/logger.config";
import RoomCategory from "../db/models/roomCategory";
import { NotFoundError } from "../utils/errors/app.error";
import BaseRepository from "./base.repository";

export class RoomCategoryRepository extends BaseRepository<RoomCategory> {
  constructor() {
    super(RoomCategory);
  }

  async findAllByHotelId(hotelId: number) {
    const roomCategories = await this.model.findAll({
      where: {
        hotelId: hotelId,
        deletedAt: null,
      },
    });

    if (!roomCategories || roomCategories.length === 0) {
      throw new NotFoundError(
        `No room categories found for hotel with id ${hotelId}`,
      );
    }

    return roomCategories;
  }

  async softDelete(id: number) {
    const roomCategory = await this.model.findByPk(id);

    if (!roomCategory) {
      logger.error(`Room Category not found: ${id}`);
      throw new NotFoundError(`Room Category with id ${id} not found`);
    }

    roomCategory.deletedAt = new Date();
    await roomCategory.save(); // Save the changes to the database
    logger.info(`Hotel soft deleted: ${roomCategory.id}`);
    return true;
  }
}
