import { Repository, UpdateResult } from "typeorm";
import { AppDataSource } from "../database/AppDataSource";
import { apiWriteLog } from "../logger/writeLog";
import { Rating } from "../model/Rating";
import { esIsEmpty } from "../utils/esHelper";

class RatingService {
  private ratingRepository: Repository<Rating> | null = null;

  private initRepository(): void {
    if (this.ratingRepository === null) {
      this.ratingRepository = AppDataSource.getRepository(Rating);
    }
  }

  async save(rating: Partial<Rating>) {
    this.initRepository();
    if (rating) {
      try {
        const resp = await this.ratingRepository?.save(rating);

        return resp;
      } catch (error) {
        apiWriteLog.error("rating Save Failed ");
      }
    }
    return null;
  }

  async getById(id: number): Promise<Rating | null | undefined> {
    this.initRepository();
    try {
      const rating = await this.ratingRepository?.findOne({ where: {id } });
      return rating;
    } catch (err) {
      apiWriteLog.error("Error getratingByID ", err);
      return null;
    }
  }

  async getAll(): Promise<Rating[] | null | undefined> {
    this.initRepository();
    try {
      const rating = await this.ratingRepository?.find();
      return rating;
    } catch (err) {
      apiWriteLog.error(`Error All rating `, err);
      return null;
    }
  }

  async update(rating: Partial<Rating>): Promise<UpdateResult | null | undefined> {
    this.initRepository();
    if (!esIsEmpty(rating)) {
      try {
        const updaterating = await this.ratingRepository?.update(
          { id: rating.id },
          rating
        );

        return updaterating;
      } catch (error) {
        apiWriteLog.error(`Update rating Error, `, error);
        return null;
      }
    }

    return null;
  }
  async delete(id: number) {
    this.initRepository();
    try {
      const ratings = await this.ratingRepository?.delete({ id: id });
      return ratings;
    } catch (err) {
      apiWriteLog.error("Error All rating ", err);
      return null;
    }
  }
}

export const ratingService = new RatingService();
