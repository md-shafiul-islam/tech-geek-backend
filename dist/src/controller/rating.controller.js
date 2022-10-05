"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingController = void 0;
const writeLog_1 = require("../logger/writeLog");
const rating_key_service_1 = require("../service/rating.key.service");
const rating_service_1 = require("../service/rating.service");
const respFormat_1 = __importDefault(require("../utils/response/respFormat"));
class RatingController {
    async getAll(req, resp) {
        try {
            const rating = await rating_service_1.ratingService.getAll();
            if (rating) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(rating, "rating found", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(rating, "rating not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("rating getAll Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "rating not found"));
        }
    }
    async getById(req, resp) {
        const id = parseInt(req?.params?.id);
        try {
            const rating = await rating_service_1.ratingService.getById(id);
            if (rating) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(rating, "rating found", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(rating, "rating not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("rating getById Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "rating not found"));
        }
    }
    async add(req, resp) {
        try {
            const rating = await rating_service_1.ratingService.save(req.body);
            resp.status(201);
            resp.send((0, respFormat_1.default)(rating, " Save Or Added", true));
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("rating Add Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, " rating Add failed", false));
        }
    }
    async update(req, resp) {
        try {
            const update = await rating_service_1.ratingService.update(req.body);
            if (update !== undefined && update !== null) {
                resp.status(202);
                resp.send((0, respFormat_1.default)(update, "rating updated", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(null, "rating update failed", false));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("rating Update Error, ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "rating update failed", false));
        }
    }
    async delete(req, resp) {
        const { id } = req.params;
        try {
            const intId = parseInt(id);
            if (intId > 0) {
                const deleteResp = await rating_service_1.ratingService.delete(intId);
                if (deleteResp) {
                    resp.status(202);
                    resp.send((0, respFormat_1.default)(deleteResp, "rating deleted ", true));
                }
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("rating Delete Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "rating delete failed", false));
        }
    }
    async deleteRatingKey(req, resp) {
        try {
            const { id } = req.params;
            let intId = Number(id);
            if (intId > 0) {
                const ratingKey = await rating_key_service_1.ratingKeyServices.delete(intId);
                resp.status(202);
                resp.send((0, respFormat_1.default)(ratingKey, "rating key deleted", true));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("rating key Delete Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "rating delete failed", false));
        }
    }
    async updateRatingKey(req, resp) {
        try {
            const ratingKey = await rating_key_service_1.ratingKeyServices.update(req.body);
            resp.status(202);
            resp.send((0, respFormat_1.default)(ratingKey, "rating key deleted", true));
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("rating key Delete Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "rating delete failed", false));
        }
    }
    async addRatingKey(req, resp) {
        try {
            const ratingKey = await rating_key_service_1.ratingKeyServices.save(req.body);
            resp.status(202);
            resp.send((0, respFormat_1.default)(ratingKey, "rating key deleted", true));
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("rating key Delete Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "rating delete failed", false));
        }
    }
    async getAllRatingKey(req, resp) {
        try {
            const ratingKeys = await rating_key_service_1.ratingKeyServices.getAll();
            resp.status(202);
            resp.send((0, respFormat_1.default)(ratingKeys, "rating key deleted", true));
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("rating key Delete Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "rating delete failed", false));
        }
    }
    async getRatingKey(req, resp) {
        try {
            const { id } = req.params;
            const iId = Number(id);
            const ratingKey = await rating_key_service_1.ratingKeyServices.getById(iId);
            resp.status(202);
            resp.send((0, respFormat_1.default)(ratingKey, "rating key deleted", true));
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("rating key Delete Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "rating delete failed", false));
        }
    }
}
exports.ratingController = new RatingController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlci9yYXRpbmcuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxpREFBaUQ7QUFDakQsc0VBQWtFO0FBQ2xFLDhEQUEwRDtBQUMxRCw4RUFBc0Q7QUFFdEQsTUFBTSxnQkFBZ0I7SUFDcEIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFZLEVBQUUsSUFBYztRQUN2QyxJQUFJO1lBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSw4QkFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQzVDLElBQUksTUFBTSxFQUFFO2dCQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxvQkFBVSxFQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNyRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUEsb0JBQVUsRUFBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO2FBQ25EO1NBQ0Y7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLHNCQUFXLENBQUMsS0FBSyxDQUFDLHNCQUFzQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFBLG9CQUFVLEVBQUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQztTQUNqRDtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQVksRUFBRSxJQUFjO1FBQ3hDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEVB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QUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUEsb0JBQVUsRUFBQyxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUM5RDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Qsc0JBQVcsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUEsb0JBQVUsRUFBQyxJQUFJLEVBQUUsc0JBQXNCLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUM1RDtJQUNILENBQUM7Q0FDRjtBQUVZLFFBQUEsZ0JBQWdCLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBhcGlXcml0ZUxvZyB9IGZyb20gXCIuLi9sb2dnZXIvd3JpdGVMb2dcIjtcclxuaW1wb3J0IHsgcmF0aW5nS2V5U2VydmljZXMgfSBmcm9tIFwiLi4vc2VydmljZS9yYXRpbmcua2V5LnNlcnZpY2VcIjtcclxuaW1wb3J0IHsgcmF0aW5nU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlL3JhdGluZy5zZXJ2aWNlXCI7XHJcbmltcG9ydCByZXNwRm9ybWF0IGZyb20gXCIuLi91dGlscy9yZXNwb25zZS9yZXNwRm9ybWF0XCI7XHJcblxyXG5jbGFzcyBSYXRpbmdDb250cm9sbGVyIHtcclxuICBhc3luYyBnZXRBbGwocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmF0aW5nID0gYXdhaXQgcmF0aW5nU2VydmljZS5nZXRBbGwoKTtcclxuICAgICAgaWYgKHJhdGluZykge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQocmF0aW5nLCBcInJhdGluZyBmb3VuZFwiLCB0cnVlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChyYXRpbmcsIFwicmF0aW5nIG5vdCBmb3VuZFwiKSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwicmF0aW5nIGdldEFsbCBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInJhdGluZyBub3QgZm91bmRcIikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QnlJZChyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICBjb25zdCBpZCA9IHBhcnNlSW50KHJlcT8ucGFyYW1zPy5pZCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmF0aW5nID0gYXdhaXQgcmF0aW5nU2VydmljZS5nZXRCeUlkKGlkKTtcclxuICAgICAgaWYgKHJhdGluZykge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQocmF0aW5nLCBcInJhdGluZyBmb3VuZFwiLCB0cnVlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChyYXRpbmcsIFwicmF0aW5nIG5vdCBmb3VuZFwiKSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwicmF0aW5nIGdldEJ5SWQgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJyYXRpbmcgbm90IGZvdW5kXCIpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZChyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByYXRpbmcgPSBhd2FpdCByYXRpbmdTZXJ2aWNlLnNhdmUocmVxLmJvZHkpO1xyXG5cclxuICAgICAgcmVzcC5zdGF0dXMoMjAxKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQocmF0aW5nLCBcIiBTYXZlIE9yIEFkZGVkXCIsIHRydWUpKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwicmF0aW5nIEFkZCBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcIiByYXRpbmcgQWRkIGZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgdXBkYXRlKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHVwZGF0ZSA9IGF3YWl0IHJhdGluZ1NlcnZpY2UudXBkYXRlKHJlcS5ib2R5KTtcclxuXHJcbiAgICAgIGlmICh1cGRhdGUgIT09IHVuZGVmaW5lZCAmJiB1cGRhdGUgIT09IG51bGwpIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KHVwZGF0ZSwgXCJyYXRpbmcgdXBkYXRlZFwiLCB0cnVlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInJhdGluZyB1cGRhdGUgZmFpbGVkXCIsIGZhbHNlKSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwicmF0aW5nIFVwZGF0ZSBFcnJvciwgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJyYXRpbmcgdXBkYXRlIGZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGVsZXRlKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgaW50SWQgPSBwYXJzZUludChpZCk7XHJcbiAgICAgIGlmIChpbnRJZCA+IDApIHtcclxuICAgICAgICBjb25zdCBkZWxldGVSZXNwID0gYXdhaXQgcmF0aW5nU2VydmljZS5kZWxldGUoaW50SWQpO1xyXG5cclxuICAgICAgICBpZiAoZGVsZXRlUmVzcCkge1xyXG4gICAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KGRlbGV0ZVJlc3AsIFwicmF0aW5nIGRlbGV0ZWQgXCIsIHRydWUpKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwicmF0aW5nIERlbGV0ZSBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInJhdGluZyBkZWxldGUgZmFpbGVkXCIsIGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBkZWxldGVSYXRpbmdLZXkocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcclxuICAgICAgbGV0IGludElkID0gTnVtYmVyKGlkKTtcclxuICAgICAgaWYgKGludElkID4gMCkge1xyXG4gICAgICAgIGNvbnN0IHJhdGluZ0tleSA9IGF3YWl0IHJhdGluZ0tleVNlcnZpY2VzLmRlbGV0ZShpbnRJZCk7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChyYXRpbmdLZXksIFwicmF0aW5nIGtleSBkZWxldGVkXCIsIHRydWUpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJyYXRpbmcga2V5IERlbGV0ZSBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInJhdGluZyBkZWxldGUgZmFpbGVkXCIsIGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyB1cGRhdGVSYXRpbmdLZXkocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmF0aW5nS2V5ID0gYXdhaXQgcmF0aW5nS2V5U2VydmljZXMudXBkYXRlKHJlcS5ib2R5KTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQocmF0aW5nS2V5LCBcInJhdGluZyBrZXkgZGVsZXRlZFwiLCB0cnVlKSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcInJhdGluZyBrZXkgRGVsZXRlIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwicmF0aW5nIGRlbGV0ZSBmYWlsZWRcIiwgZmFsc2UpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZFJhdGluZ0tleShyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByYXRpbmdLZXkgPSBhd2FpdCByYXRpbmdLZXlTZXJ2aWNlcy5zYXZlKHJlcS5ib2R5KTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQocmF0aW5nS2V5LCBcInJhdGluZyBrZXkgZGVsZXRlZFwiLCB0cnVlKSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcInJhdGluZyBrZXkgRGVsZXRlIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwicmF0aW5nIGRlbGV0ZSBmYWlsZWRcIiwgZmFsc2UpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEFsbFJhdGluZ0tleShyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByYXRpbmdLZXlzID0gYXdhaXQgcmF0aW5nS2V5U2VydmljZXMuZ2V0QWxsKCk7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KHJhdGluZ0tleXMsIFwicmF0aW5nIGtleSBkZWxldGVkXCIsIHRydWUpKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwicmF0aW5nIGtleSBEZWxldGUgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJyYXRpbmcgZGVsZXRlIGZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0UmF0aW5nS2V5KHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcbiAgICAgIGNvbnN0IGlJZCA9IE51bWJlcihpZCk7XHJcblxyXG4gICAgICBjb25zdCByYXRpbmdLZXkgPSBhd2FpdCByYXRpbmdLZXlTZXJ2aWNlcy5nZXRCeUlkKGlJZCk7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KHJhdGluZ0tleSwgXCJyYXRpbmcga2V5IGRlbGV0ZWRcIiwgdHJ1ZSkpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJyYXRpbmcga2V5IERlbGV0ZSBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInJhdGluZyBkZWxldGUgZmFpbGVkXCIsIGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmF0aW5nQ29udHJvbGxlciA9IG5ldyBSYXRpbmdDb250cm9sbGVyKCk7XHJcbiJdfQ==