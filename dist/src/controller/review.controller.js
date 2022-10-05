"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const writeLog_1 = require("../logger/writeLog");
const review_service_1 = require("../service/review.service");
const respFormat_1 = __importDefault(require("../utils/response/respFormat"));
class ReviewController {
    async getAll(req, resp) {
        try {
            const review = await review_service_1.reviewService.getAll();
            if (review) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(review, "review found", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(review, "review not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("review getAll Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "review not found"));
        }
    }
    async getById(req, resp) {
        const id = parseInt(req?.params?.id);
        try {
            const review = await review_service_1.reviewService.getById(id);
            if (review) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(review, "review found", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(review, "review not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("review getById Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "review not found"));
        }
    }
    async add(req, resp) {
        try {
            const review = await review_service_1.reviewService.save(req.body);
            resp.status(201);
            resp.send((0, respFormat_1.default)(review, " Save Or Added", true));
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("review Add Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, " review Add failed", false));
        }
    }
    async update(req, resp) {
        try {
            const update = await review_service_1.reviewService.update(req.body);
            if (update !== undefined && update !== null) {
                resp.status(202);
                resp.send((0, respFormat_1.default)(update, "review updated", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(null, "review update failed", false));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("review Update Error, ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "review update failed", false));
        }
    }
    async delete(req, resp) {
        const { id } = req.params;
        try {
            const intId = parseInt(id);
            if (intId > 0) {
                const deleteResp = await review_service_1.reviewService.delete(intId);
                if (deleteResp) {
                    resp.status(202);
                    resp.send((0, respFormat_1.default)(deleteResp, "review deleted ", true));
                }
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("review Delete Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "review delete failed", false));
        }
    }
}
exports.reviewController = new ReviewController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2aWV3LmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJvbGxlci9yZXZpZXcuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxpREFBaUQ7QUFDakQsOERBQTBEO0FBQzFELDhFQUFzRDtBQUV0RCxNQUFNLGdCQUFnQjtJQUNwQixLQUFLLENBQUMsTUFBTSxDQUFDLEdBQVksRUFBRSxJQUFjO1FBQ3ZDLElBQUk7WUFDRixNQUFNLE1BQU0sR0FBRyxNQUFNLDhCQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDNUMsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFBLG9CQUFVLEVBQUMsTUFBTSxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ3JEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxvQkFBVSxFQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7YUFDbkQ7U0FDRjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Qsc0JBQVcsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUEsb0JBQVUsRUFBQyxJQUFJLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1NBQ2pEO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBWSxFQUFFLElBQWM7UUFDeEMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7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TSxLQUFLLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzNCLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDYixNQUFNLFVBQVUsR0FBRyxNQUFNLDhCQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUVyRCxJQUFJLFVBQVUsRUFBRTtvQkFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUEsb0JBQVUsRUFBQyxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDNUQ7YUFDRjtTQUNGO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxzQkFBVyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxvQkFBVSxFQUFDLElBQUksRUFBRSxzQkFBc0IsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzVEO0lBQ0gsQ0FBQztDQUNGO0FBRVksUUFBQSxnQkFBZ0IsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7IGFwaVdyaXRlTG9nIH0gZnJvbSBcIi4uL2xvZ2dlci93cml0ZUxvZ1wiO1xyXG5pbXBvcnQgeyByZXZpZXdTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2UvcmV2aWV3LnNlcnZpY2VcIjtcclxuaW1wb3J0IHJlc3BGb3JtYXQgZnJvbSBcIi4uL3V0aWxzL3Jlc3BvbnNlL3Jlc3BGb3JtYXRcIjtcclxuXHJcbmNsYXNzIFJldmlld0NvbnRyb2xsZXIge1xyXG4gIGFzeW5jIGdldEFsbChyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXZpZXcgPSBhd2FpdCByZXZpZXdTZXJ2aWNlLmdldEFsbCgpO1xyXG4gICAgICBpZiAocmV2aWV3KSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAwKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChyZXZpZXcsIFwicmV2aWV3IGZvdW5kXCIsIHRydWUpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KHJldmlldywgXCJyZXZpZXcgbm90IGZvdW5kXCIpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJyZXZpZXcgZ2V0QWxsIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwicmV2aWV3IG5vdCBmb3VuZFwiKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRCeUlkKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IGlkID0gcGFyc2VJbnQocmVxPy5wYXJhbXM/LmlkKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByZXZpZXcgPSBhd2FpdCByZXZpZXdTZXJ2aWNlLmdldEJ5SWQoaWQpO1xyXG4gICAgICBpZiAocmV2aWV3KSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAwKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChyZXZpZXcsIFwicmV2aWV3IGZvdW5kXCIsIHRydWUpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KHJldmlldywgXCJyZXZpZXcgbm90IGZvdW5kXCIpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJyZXZpZXcgZ2V0QnlJZCBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInJldmlldyBub3QgZm91bmRcIikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgYWRkKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJldmlldyA9IGF3YWl0IHJldmlld1NlcnZpY2Uuc2F2ZShyZXEuYm9keSk7XHJcblxyXG4gICAgICByZXNwLnN0YXR1cygyMDEpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChyZXZpZXcsIFwiIFNhdmUgT3IgQWRkZWRcIiwgdHJ1ZSkpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJyZXZpZXcgQWRkIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwiIHJldmlldyBBZGQgZmFpbGVkXCIsIGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyB1cGRhdGUocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgdXBkYXRlID0gYXdhaXQgcmV2aWV3U2VydmljZS51cGRhdGUocmVxLmJvZHkpO1xyXG5cclxuICAgICAgaWYgKHVwZGF0ZSAhPT0gdW5kZWZpbmVkICYmIHVwZGF0ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQodXBkYXRlLCBcInJldmlldyB1cGRhdGVkXCIsIHRydWUpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwicmV2aWV3IHVwZGF0ZSBmYWlsZWRcIiwgZmFsc2UpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJyZXZpZXcgVXBkYXRlIEVycm9yLCBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInJldmlldyB1cGRhdGUgZmFpbGVkXCIsIGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBkZWxldGUocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBpbnRJZCA9IHBhcnNlSW50KGlkKTtcclxuICAgICAgaWYgKGludElkID4gMCkge1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZVJlc3AgPSBhd2FpdCByZXZpZXdTZXJ2aWNlLmRlbGV0ZShpbnRJZCk7XHJcblxyXG4gICAgICAgIGlmIChkZWxldGVSZXNwKSB7XHJcbiAgICAgICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQoZGVsZXRlUmVzcCwgXCJyZXZpZXcgZGVsZXRlZCBcIiwgdHJ1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJyZXZpZXcgRGVsZXRlIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwicmV2aWV3IGRlbGV0ZSBmYWlsZWRcIiwgZmFsc2UpKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCByZXZpZXdDb250cm9sbGVyID0gbmV3IFJldmlld0NvbnRyb2xsZXIoKTtcclxuIl19