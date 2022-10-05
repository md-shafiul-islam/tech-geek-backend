"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const writeLog_1 = require("../logger/writeLog");
const Review_1 = require("../model/Review");
const esHelper_1 = require("../utils/esHelper");
class ReviewService {
    reviewRepository = null;
    initRepository() {
        if (this.reviewRepository === null) {
            this.reviewRepository = AppDataSource_1.AppDataSource.getRepository(Review_1.Review);
        }
    }
    async save(review) {
        this.initRepository();
        if (review) {
            try {
                const resp = await this.reviewRepository?.save(review);
                return resp;
            }
            catch (error) {
                writeLog_1.apiWriteLog.error("review Save Failed ");
            }
        }
        return null;
    }
    async getById(id) {
        this.initRepository();
        try {
            const review = await this.reviewRepository?.findOne({
                where: { id: id },
            });
            return review;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error getreviewByID ", err);
            return null;
        }
    }
    async getAll() {
        this.initRepository();
        try {
            const review = await this.reviewRepository?.find();
            return review;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error(`Error All review `, err);
            return null;
        }
    }
    async update(review) {
        this.initRepository();
        if (!(0, esHelper_1.esIsEmpty)(review)) {
            try {
                const updatereview = await this.reviewRepository?.update({ id: review.id }, review);
                return updatereview;
            }
            catch (error) {
                writeLog_1.apiWriteLog.error(`Update review Error, `, error);
                return null;
            }
        }
        return null;
    }
    async delete(id) {
        this.initRepository();
        try {
            const reviews = await this.reviewRepository?.delete({ id: id });
            return reviews;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error All review ", err);
            return null;
        }
    }
    async getAllReviewsByProduct(id) {
        if (id > 0) {
            try {
                const reviews = await this.reviewRepository?.find({
                    where: { product: { id: id } },
                });
                return reviews;
            }
            catch (err) {
                writeLog_1.apiWriteLog.error("Error All review ", err);
                return null;
            }
        }
        return null;
    }
    async getAddReviewsByProduct(product, content) {
        this.initRepository();
        try {
            const review = new Review_1.Review();
            review.product = product;
            review.content = content;
            // review.author get session -> user
            const saveReview = await this.reviewRepository?.save(review);
            return saveReview;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Save product review Error ", err);
            return null;
        }
    }
}
exports.reviewService = new ReviewService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2aWV3LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZS9yZXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSw2REFBMEQ7QUFDMUQsaURBQWlEO0FBR2pELDRDQUF5QztBQUN6QyxnREFBOEM7QUFFOUMsTUFBTSxhQUFhO0lBQ1QsZ0JBQWdCLEdBQThCLElBQUksQ0FBQztJQUVuRCxjQUFjO1FBQ3BCLElBQUksSUFBSSxDQUFDLGdCQUFnQixLQUFLLElBQUksRUFBRTtZQUNsQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsNkJBQWEsQ0FBQyxhQUFhLENBQUMsZUFBTSxDQUFDLENBQUM7U0FDN0Q7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUF1QjtRQUNoQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJO2dCQUNGLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFdkQsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLHNCQUFXLENBQUMsS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7YUFDMUM7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBVTtRQUN0QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSTtZQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sQ0FBQztnQkFDbEQsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTthQUNsQixDQUFDLENBQUM7WUFDSCxPQUFPLE1BQU0sQ0FBQztTQUNmO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixz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T0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7Q0FDRjtBQUVZLFFBQUEsYUFBYSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXBvc2l0b3J5LCBVcGRhdGVSZXN1bHQgfSBmcm9tIFwidHlwZW9ybVwiO1xyXG5pbXBvcnQgeyBBcHBEYXRhU291cmNlIH0gZnJvbSBcIi4uL2RhdGFiYXNlL0FwcERhdGFTb3VyY2VcIjtcclxuaW1wb3J0IHsgYXBpV3JpdGVMb2cgfSBmcm9tIFwiLi4vbG9nZ2VyL3dyaXRlTG9nXCI7XHJcbmltcG9ydCB7IEJyYW5kIH0gZnJvbSBcIi4uL21vZGVsL0JyYW5kXCI7XHJcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi4vbW9kZWwvUHJvZHVjdFwiO1xyXG5pbXBvcnQgeyBSZXZpZXcgfSBmcm9tIFwiLi4vbW9kZWwvUmV2aWV3XCI7XHJcbmltcG9ydCB7IGVzSXNFbXB0eSB9IGZyb20gXCIuLi91dGlscy9lc0hlbHBlclwiO1xyXG5cclxuY2xhc3MgUmV2aWV3U2VydmljZSB7XHJcbiAgcHJpdmF0ZSByZXZpZXdSZXBvc2l0b3J5OiBSZXBvc2l0b3J5PFJldmlldz4gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBpbml0UmVwb3NpdG9yeSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnJldmlld1JlcG9zaXRvcnkgPT09IG51bGwpIHtcclxuICAgICAgdGhpcy5yZXZpZXdSZXBvc2l0b3J5ID0gQXBwRGF0YVNvdXJjZS5nZXRSZXBvc2l0b3J5KFJldmlldyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBzYXZlKHJldmlldzogUGFydGlhbDxSZXZpZXc+KSB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICBpZiAocmV2aWV3KSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMucmV2aWV3UmVwb3NpdG9yeT8uc2F2ZShyZXZpZXcpO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzcDtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBhcGlXcml0ZUxvZy5lcnJvcihcInJldmlldyBTYXZlIEZhaWxlZCBcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QnlJZChpZDogbnVtYmVyKTogUHJvbWlzZTxSZXZpZXcgfCBudWxsIHwgdW5kZWZpbmVkPiB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXZpZXcgPSBhd2FpdCB0aGlzLnJldmlld1JlcG9zaXRvcnk/LmZpbmRPbmUoe1xyXG4gICAgICAgIHdoZXJlOiB7IGlkOiBpZCB9LFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIHJldmlldztcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkVycm9yIGdldHJldmlld0J5SUQgXCIsIGVycik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QWxsKCk6IFByb21pc2U8UmV2aWV3W10gfCBudWxsIHwgdW5kZWZpbmVkPiB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXZpZXcgPSBhd2FpdCB0aGlzLnJldmlld1JlcG9zaXRvcnk/LmZpbmQoKTtcclxuICAgICAgcmV0dXJuIHJldmlldztcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihgRXJyb3IgQWxsIHJldmlldyBgLCBlcnIpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHVwZGF0ZShcclxuICAgIHJldmlldzogUGFydGlhbDxSZXZpZXc+XHJcbiAgKTogUHJvbWlzZTxVcGRhdGVSZXN1bHQgfCBudWxsIHwgdW5kZWZpbmVkPiB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICBpZiAoIWVzSXNFbXB0eShyZXZpZXcpKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgdXBkYXRlcmV2aWV3ID0gYXdhaXQgdGhpcy5yZXZpZXdSZXBvc2l0b3J5Py51cGRhdGUoXHJcbiAgICAgICAgICB7IGlkOiByZXZpZXcuaWQgfSxcclxuICAgICAgICAgIHJldmlld1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiB1cGRhdGVyZXZpZXc7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoYFVwZGF0ZSByZXZpZXcgRXJyb3IsIGAsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICBhc3luYyBkZWxldGUoaWQ6IG51bWJlcikge1xyXG4gICAgdGhpcy5pbml0UmVwb3NpdG9yeSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmV2aWV3cyA9IGF3YWl0IHRoaXMucmV2aWV3UmVwb3NpdG9yeT8uZGVsZXRlKHsgaWQ6IGlkIH0pO1xyXG4gICAgICByZXR1cm4gcmV2aWV3cztcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkVycm9yIEFsbCByZXZpZXcgXCIsIGVycik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QWxsUmV2aWV3c0J5UHJvZHVjdChpZDogbnVtYmVyKSB7XHJcbiAgICBpZiAoaWQgPiAwKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmV2aWV3cyA9IGF3YWl0IHRoaXMucmV2aWV3UmVwb3NpdG9yeT8uZmluZCh7XHJcbiAgICAgICAgICB3aGVyZTogeyBwcm9kdWN0OiB7IGlkOiBpZCB9IH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJldmlld3M7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiRXJyb3IgQWxsIHJldmlldyBcIiwgZXJyKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRBZGRSZXZpZXdzQnlQcm9kdWN0KHByb2R1Y3Q6UHJvZHVjdCwgY29udGVudDpzdHJpbmcpe1xyXG4gICAgdGhpcy5pbml0UmVwb3NpdG9yeSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmV2aWV3ID0gbmV3IFJldmlldygpO1xyXG4gICAgICByZXZpZXcucHJvZHVjdCA9IHByb2R1Y3Q7XHJcbiAgICAgIHJldmlldy5jb250ZW50ID0gY29udGVudDtcclxuICAgICAgLy8gcmV2aWV3LmF1dGhvciBnZXQgc2Vzc2lvbiAtPiB1c2VyXHJcbiAgICAgIGNvbnN0IHNhdmVSZXZpZXcgPSBhd2FpdCB0aGlzLnJldmlld1JlcG9zaXRvcnk/LnNhdmUocmV2aWV3KTtcclxuICAgICAgcmV0dXJuIHNhdmVSZXZpZXc7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJTYXZlIHByb2R1Y3QgcmV2aWV3IEVycm9yIFwiLCBlcnIpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXZpZXdTZXJ2aWNlID0gbmV3IFJldmlld1NlcnZpY2UoKTtcclxuIl19