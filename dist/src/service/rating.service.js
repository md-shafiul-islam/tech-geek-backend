"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const writeLog_1 = require("../logger/writeLog");
const Rating_1 = require("../model/Rating");
const RatingItem_1 = require("../model/RatingItem");
const esHelper_1 = require("../utils/esHelper");
class RatingService {
    ratingRepository = null;
    ratingItemRepository = null;
    initRepository() {
        if (this.ratingRepository === null) {
            this.ratingRepository = AppDataSource_1.AppDataSource.getRepository(Rating_1.Rating);
        }
        if (this.ratingItemRepository === null) {
            this.ratingItemRepository = AppDataSource_1.AppDataSource.getRepository(RatingItem_1.RatingItem);
        }
    }
    async save(rating) {
        this.initRepository();
        if (rating) {
            try {
                const resp = await this.ratingRepository?.save(rating);
                return resp;
            }
            catch (error) {
                writeLog_1.apiWriteLog.error("rating Save Failed ");
            }
        }
        return null;
    }
    async getById(id) {
        this.initRepository();
        try {
            const rating = await this.ratingRepository?.findOne({ where: { id } });
            return rating;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error getratingByID ", err);
            return null;
        }
    }
    async getAll() {
        this.initRepository();
        try {
            const rating = await this.ratingRepository?.find();
            return rating;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error(`Error All rating `, err);
            return null;
        }
    }
    async update(rating) {
        this.initRepository();
        if (!(0, esHelper_1.esIsEmpty)(rating)) {
            try {
                const updaterating = await this.ratingRepository?.update({ id: rating.id }, rating);
                return updaterating;
            }
            catch (error) {
                writeLog_1.apiWriteLog.error(`Update rating Error, `, error);
                return null;
            }
        }
        return null;
    }
    async delete(id) {
        this.initRepository();
        try {
            const ratings = await this.ratingRepository?.delete({ id: id });
            return ratings;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error All rating ", err);
            return null;
        }
    }
    async addRatingByProduct(rating) {
        let saveRating = null;
        if (rating) {
            const queryRunner = AppDataSource_1.AppDataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                const nRating = new Rating_1.Rating();
                Object.assign(nRating, rating);
                saveRating = queryRunner.manager.create(Rating_1.Rating, nRating);
                saveRating = await queryRunner.manager.save(saveRating);
                let ratingItems = [];
                rating.ratingItems?.map((ratingItem) => {
                    if (saveRating !== null && saveRating !== undefined) {
                        ratingItem.rating = saveRating;
                    }
                    ratingItems.push(queryRunner.manager.create(RatingItem_1.RatingItem, ratingItem));
                });
                ratingItems = await queryRunner.manager.save(ratingItems);
                saveRating.ratingItems = ratingItems;
                await queryRunner.commitTransaction();
            }
            catch (error) {
                writeLog_1.apiWriteLog.error("Add Product Review Error ", error);
                await queryRunner.rollbackTransaction();
            }
            finally {
                if (queryRunner.isReleased) {
                    await queryRunner.release();
                }
            }
        }
        return saveRating;
    }
    async getByProductId(id) {
        this.initRepository();
        let rating = null;
        try {
            rating = await this.ratingRepository?.findOne({
                where: { product: { id } },
                relations: [],
            });
            if (rating !== null && rating !== undefined) {
                let ratingItems = await this.ratingItemRepository?.find({
                    where: { rating: { id: rating?.id } },
                });
                if (ratingItems !== null && ratingItems !== undefined) {
                    rating.ratingItems = ratingItems;
                }
            }
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error getRating By product ID ", err);
        }
        return rating;
    }
}
exports.ratingService = new RatingService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZS9yYXRpbmcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2REFBMEQ7QUFDMUQsaURBQWlEO0FBQ2pELDRDQUF5QztBQUN6QyxvREFBaUQ7QUFDakQsZ0RBQThDO0FBRTlDLE1BQU0sYUFBYTtJQUNULGdCQUFnQixHQUE4QixJQUFJLENBQUM7SUFDbkQsb0JBQW9CLEdBQWtDLElBQUksQ0FBQztJQUUzRCxjQUFjO1FBQ3BCLElBQUksSUFBSSxDQUFDLGdCQUFnQixLQUFLLElBQUksRUFBRTtZQUNsQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsNkJBQWEsQ0FBQyxhQUFhLENBQUMsZUFBTSxDQUFDLENBQUM7U0FDN0Q7UUFFRCxJQUFJLElBQUksQ0FBQyxvQkFBb0IsS0FBSyxJQUFJLEVBQUU7WUFDdEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLDZCQUFhLENBQUMsYUFBYSxDQUFDLHVCQUFVLENBQUMsQ0FBQztTQUNyRTtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQXVCO1FBQ2hDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLE1BQU0sRUFBRTtZQUNWLElBQUk7Z0JBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUV2RCxPQUFPLElBQUksQ0FBQzthQUNiO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2Qsc0JBQVcsQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUMxQztTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFVO1FBQ3RCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJO1lBQ0YsTUFBTSxN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RSxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUU7aUJBQ3RDLENBQUMsQ0FBQztnQkFDSCxJQUFHLFdBQVcsS0FBSyxJQUFJLElBQUksV0FBVyxLQUFLLFNBQVMsRUFBQztvQkFDbkQsTUFBTSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7aUJBQ2xDO2FBRUY7U0FFRjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osc0JBQVcsQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FFMUQ7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0NBQ0Y7QUFFWSxRQUFBLGFBQWEsR0FBRyxJQUFJLGFBQWEsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVwb3NpdG9yeSwgVXBkYXRlUmVzdWx0IH0gZnJvbSBcInR5cGVvcm1cIjtcclxuaW1wb3J0IHsgQXBwRGF0YVNvdXJjZSB9IGZyb20gXCIuLi9kYXRhYmFzZS9BcHBEYXRhU291cmNlXCI7XHJcbmltcG9ydCB7IGFwaVdyaXRlTG9nIH0gZnJvbSBcIi4uL2xvZ2dlci93cml0ZUxvZ1wiO1xyXG5pbXBvcnQgeyBSYXRpbmcgfSBmcm9tIFwiLi4vbW9kZWwvUmF0aW5nXCI7XHJcbmltcG9ydCB7IFJhdGluZ0l0ZW0gfSBmcm9tIFwiLi4vbW9kZWwvUmF0aW5nSXRlbVwiO1xyXG5pbXBvcnQgeyBlc0lzRW1wdHkgfSBmcm9tIFwiLi4vdXRpbHMvZXNIZWxwZXJcIjtcclxuXHJcbmNsYXNzIFJhdGluZ1NlcnZpY2Uge1xyXG4gIHByaXZhdGUgcmF0aW5nUmVwb3NpdG9yeTogUmVwb3NpdG9yeTxSYXRpbmc+IHwgbnVsbCA9IG51bGw7XHJcbiAgcHJpdmF0ZSByYXRpbmdJdGVtUmVwb3NpdG9yeTogUmVwb3NpdG9yeTxSYXRpbmdJdGVtPiB8IG51bGwgPSBudWxsO1xyXG5cclxuICBwcml2YXRlIGluaXRSZXBvc2l0b3J5KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucmF0aW5nUmVwb3NpdG9yeSA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnJhdGluZ1JlcG9zaXRvcnkgPSBBcHBEYXRhU291cmNlLmdldFJlcG9zaXRvcnkoUmF0aW5nKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5yYXRpbmdJdGVtUmVwb3NpdG9yeSA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnJhdGluZ0l0ZW1SZXBvc2l0b3J5ID0gQXBwRGF0YVNvdXJjZS5nZXRSZXBvc2l0b3J5KFJhdGluZ0l0ZW0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2F2ZShyYXRpbmc6IFBhcnRpYWw8UmF0aW5nPikge1xyXG4gICAgdGhpcy5pbml0UmVwb3NpdG9yeSgpO1xyXG4gICAgaWYgKHJhdGluZykge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLnJhdGluZ1JlcG9zaXRvcnk/LnNhdmUocmF0aW5nKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3A7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJyYXRpbmcgU2F2ZSBGYWlsZWQgXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEJ5SWQoaWQ6IG51bWJlcik6IFByb21pc2U8UmF0aW5nIHwgbnVsbCB8IHVuZGVmaW5lZD4ge1xyXG4gICAgdGhpcy5pbml0UmVwb3NpdG9yeSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmF0aW5nID0gYXdhaXQgdGhpcy5yYXRpbmdSZXBvc2l0b3J5Py5maW5kT25lKHsgd2hlcmU6IHsgaWQgfSB9KTtcclxuICAgICAgcmV0dXJuIHJhdGluZztcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkVycm9yIGdldHJhdGluZ0J5SUQgXCIsIGVycik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QWxsKCk6IFByb21pc2U8UmF0aW5nW10gfCBudWxsIHwgdW5kZWZpbmVkPiB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByYXRpbmcgPSBhd2FpdCB0aGlzLnJhdGluZ1JlcG9zaXRvcnk/LmZpbmQoKTtcclxuICAgICAgcmV0dXJuIHJhdGluZztcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihgRXJyb3IgQWxsIHJhdGluZyBgLCBlcnIpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHVwZGF0ZShcclxuICAgIHJhdGluZzogUGFydGlhbDxSYXRpbmc+XHJcbiAgKTogUHJvbWlzZTxVcGRhdGVSZXN1bHQgfCBudWxsIHwgdW5kZWZpbmVkPiB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICBpZiAoIWVzSXNFbXB0eShyYXRpbmcpKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgdXBkYXRlcmF0aW5nID0gYXdhaXQgdGhpcy5yYXRpbmdSZXBvc2l0b3J5Py51cGRhdGUoXHJcbiAgICAgICAgICB7IGlkOiByYXRpbmcuaWQgfSxcclxuICAgICAgICAgIHJhdGluZ1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiB1cGRhdGVyYXRpbmc7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoYFVwZGF0ZSByYXRpbmcgRXJyb3IsIGAsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICBhc3luYyBkZWxldGUoaWQ6IG51bWJlcikge1xyXG4gICAgdGhpcy5pbml0UmVwb3NpdG9yeSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmF0aW5ncyA9IGF3YWl0IHRoaXMucmF0aW5nUmVwb3NpdG9yeT8uZGVsZXRlKHsgaWQ6IGlkIH0pO1xyXG4gICAgICByZXR1cm4gcmF0aW5ncztcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkVycm9yIEFsbCByYXRpbmcgXCIsIGVycik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgYWRkUmF0aW5nQnlQcm9kdWN0KHJhdGluZzogUmF0aW5nKSB7XHJcbiAgICBsZXQgc2F2ZVJhdGluZzogUmF0aW5nIHwgbnVsbCB8IHVuZGVmaW5lZCA9IG51bGw7XHJcbiAgICBpZiAocmF0aW5nKSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5UnVubmVyID0gQXBwRGF0YVNvdXJjZS5jcmVhdGVRdWVyeVJ1bm5lcigpO1xyXG4gICAgICBhd2FpdCBxdWVyeVJ1bm5lci5jb25uZWN0KCk7XHJcbiAgICAgIGF3YWl0IHF1ZXJ5UnVubmVyLnN0YXJ0VHJhbnNhY3Rpb24oKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBuUmF0aW5nID0gbmV3IFJhdGluZygpO1xyXG4gICAgICAgIE9iamVjdC5hc3NpZ24oblJhdGluZywgcmF0aW5nKTtcclxuXHJcbiAgICAgICAgc2F2ZVJhdGluZyA9IHF1ZXJ5UnVubmVyLm1hbmFnZXIuY3JlYXRlKFJhdGluZywgblJhdGluZyk7XHJcblxyXG4gICAgICAgIHNhdmVSYXRpbmcgPSBhd2FpdCBxdWVyeVJ1bm5lci5tYW5hZ2VyLnNhdmUoc2F2ZVJhdGluZyk7XHJcblxyXG4gICAgICAgIGxldCByYXRpbmdJdGVtczogUmF0aW5nSXRlbVtdID0gW107XHJcblxyXG4gICAgICAgIHJhdGluZy5yYXRpbmdJdGVtcz8ubWFwKChyYXRpbmdJdGVtKSA9PiB7XHJcbiAgICAgICAgICBpZiAoc2F2ZVJhdGluZyAhPT0gbnVsbCAmJiBzYXZlUmF0aW5nICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgcmF0aW5nSXRlbS5yYXRpbmcgPSBzYXZlUmF0aW5nO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmF0aW5nSXRlbXMucHVzaChxdWVyeVJ1bm5lci5tYW5hZ2VyLmNyZWF0ZShSYXRpbmdJdGVtLCByYXRpbmdJdGVtKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmF0aW5nSXRlbXMgPSBhd2FpdCBxdWVyeVJ1bm5lci5tYW5hZ2VyLnNhdmUocmF0aW5nSXRlbXMpO1xyXG4gICAgICAgIHNhdmVSYXRpbmcucmF0aW5nSXRlbXMgPSByYXRpbmdJdGVtcztcclxuICAgICAgICBhd2FpdCBxdWVyeVJ1bm5lci5jb21taXRUcmFuc2FjdGlvbigpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiQWRkIFByb2R1Y3QgUmV2aWV3IEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgICAgYXdhaXQgcXVlcnlSdW5uZXIucm9sbGJhY2tUcmFuc2FjdGlvbigpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIGlmIChxdWVyeVJ1bm5lci5pc1JlbGVhc2VkKSB7XHJcbiAgICAgICAgICBhd2FpdCBxdWVyeVJ1bm5lci5yZWxlYXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2F2ZVJhdGluZztcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEJ5UHJvZHVjdElkKGlkOiBudW1iZXIpOiBQcm9taXNlPFJhdGluZyB8IG51bGwgfCB1bmRlZmluZWQ+IHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIGxldCByYXRpbmc6UmF0aW5nIHwgdW5kZWZpbmVkIHwgbnVsbCA9IG51bGw7XHJcbiAgICB0cnkge1xyXG4gICAgICByYXRpbmcgPSBhd2FpdCB0aGlzLnJhdGluZ1JlcG9zaXRvcnk/LmZpbmRPbmUoe1xyXG4gICAgICAgIHdoZXJlOiB7IHByb2R1Y3Q6IHsgaWQgfSB9LFxyXG4gICAgICAgIHJlbGF0aW9uczogW10sXHJcbiAgICAgIH0pO1xyXG4gICAgICBpZihyYXRpbmcgIT09IG51bGwgJiYgcmF0aW5nICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIGxldCByYXRpbmdJdGVtcyA9IGF3YWl0IHRoaXMucmF0aW5nSXRlbVJlcG9zaXRvcnk/LmZpbmQoe1xyXG4gICAgICAgICAgd2hlcmU6IHsgcmF0aW5nOiB7IGlkOiByYXRpbmc/LmlkIH0gfSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZihyYXRpbmdJdGVtcyAhPT0gbnVsbCAmJiByYXRpbmdJdGVtcyAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgIHJhdGluZy5yYXRpbmdJdGVtcyA9IHJhdGluZ0l0ZW1zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkVycm9yIGdldFJhdGluZyBCeSBwcm9kdWN0IElEIFwiLCBlcnIpO1xyXG4gICAgICBcclxuICAgIH1cclxuICAgIHJldHVybiByYXRpbmc7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmF0aW5nU2VydmljZSA9IG5ldyBSYXRpbmdTZXJ2aWNlKCk7XHJcbiJdfQ==