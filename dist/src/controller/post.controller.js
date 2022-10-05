"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postController = void 0;
const writeLog_1 = require("../logger/writeLog");
const post_service_1 = require("../service/post.service");
const respFormat_1 = __importDefault(require("../utils/response/respFormat"));
class PostController {
    async getAll(req, resp) {
        try {
            const post = await post_service_1.postService.getAll();
            if (post) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(post, "post found", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(post, "post not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("post getAll Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "post not found"));
        }
    }
    async getById(req, resp) {
        const id = parseInt(req?.params?.id);
        try {
            const post = await post_service_1.postService.getById(id);
            if (post) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(post, "post found", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(post, "post not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("post getById Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "post not found"));
        }
    }
    async add(req, resp) {
        try {
            const post = await post_service_1.postService.save(req.body);
            resp.status(201);
            resp.send((0, respFormat_1.default)(post, " Save Or Added", true));
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("post Add Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, " post Add failed", false));
        }
    }
    async update(req, resp) {
        try {
            const update = await post_service_1.postService.update(req.body);
            if (update !== undefined && update !== null) {
                resp.status(202);
                resp.send((0, respFormat_1.default)(update, "post updated", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(null, "post update failed", false));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("post Update Error, ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "post update failed", false));
        }
    }
    async delete(req, resp) {
        const { id } = req.params;
        try {
            const intId = parseInt(id);
            if (intId > 0) {
                const deleteResp = await post_service_1.postService.delete(intId);
                if (deleteResp) {
                    resp.status(202);
                    resp.send((0, respFormat_1.default)(deleteResp, "post deleted ", true));
                }
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("post Delete Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "post delete failed", false));
        }
    }
}
exports.postController = new PostController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRyb2xsZXIvcG9zdC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLGlEQUFpRDtBQUVqRCwwREFBc0Q7QUFDdEQsOEVBQXNEO0FBRXRELE1BQU0sY0FBYztJQUNsQixLQUFLLENBQUMsTUFBTSxDQUFDLEdBQVksRUFBRSxJQUFjO1FBQ3ZDLElBQUk7WUFDRixNQUFNLElBQUksR0FBRyxNQUFNLDBCQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEMsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFBLG9CQUFVLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ2pEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxvQkFBVSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7YUFDL0M7U0FDRjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Qsc0JBQVcsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUEsb0JBQVUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1NBQy9DO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBWSxFQUFFLElBQWM7UUFDeEMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFckMs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QUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzQixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ2IsTUFBTSxVQUFVLEdBQUcsTUFBTSwwQkFBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFbkQsSUFBSSxVQUFVLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFBLG9CQUFVLEVBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUMxRDthQUNGO1NBQ0Y7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLHNCQUFXLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFBLG9CQUFVLEVBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDMUQ7SUFDSCxDQUFDO0NBQ0Y7QUFFWSxRQUFBLGNBQWMsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBhcGlXcml0ZUxvZyB9IGZyb20gXCIuLi9sb2dnZXIvd3JpdGVMb2dcIjtcclxuaW1wb3J0IHsgUG9zdCB9IGZyb20gXCIuLi9tb2RlbC9Qb3N0XCI7XHJcbmltcG9ydCB7IHBvc3RTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2UvcG9zdC5zZXJ2aWNlXCI7XHJcbmltcG9ydCByZXNwRm9ybWF0IGZyb20gXCIuLi91dGlscy9yZXNwb25zZS9yZXNwRm9ybWF0XCI7XHJcblxyXG5jbGFzcyBQb3N0Q29udHJvbGxlciB7XHJcbiAgYXN5bmMgZ2V0QWxsKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHBvc3QgPSBhd2FpdCBwb3N0U2VydmljZS5nZXRBbGwoKTtcclxuICAgICAgaWYgKHBvc3QpIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KHBvc3QsIFwicG9zdCBmb3VuZFwiLCB0cnVlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChwb3N0LCBcInBvc3Qgbm90IGZvdW5kXCIpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJwb3N0IGdldEFsbCBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInBvc3Qgbm90IGZvdW5kXCIpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEJ5SWQocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgY29uc3QgaWQgPSBwYXJzZUludChyZXE/LnBhcmFtcz8uaWQpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHBvc3QgPSBhd2FpdCBwb3N0U2VydmljZS5nZXRCeUlkKGlkKTtcclxuICAgICAgaWYgKHBvc3QpIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KHBvc3QsIFwicG9zdCBmb3VuZFwiLCB0cnVlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChwb3N0LCBcInBvc3Qgbm90IGZvdW5kXCIpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJwb3N0IGdldEJ5SWQgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJwb3N0IG5vdCBmb3VuZFwiKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBhZGQocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcG9zdCA9IGF3YWl0IHBvc3RTZXJ2aWNlLnNhdmUocmVxLmJvZHkpO1xyXG5cclxuICAgICAgcmVzcC5zdGF0dXMoMjAxKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQocG9zdCwgXCIgU2F2ZSBPciBBZGRlZFwiLCB0cnVlKSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcInBvc3QgQWRkIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwiIHBvc3QgQWRkIGZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgdXBkYXRlKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcblxyXG4gICAgICBjb25zdCB1cGRhdGUgPSBhd2FpdCBwb3N0U2VydmljZS51cGRhdGUocmVxLmJvZHkpO1xyXG5cclxuICAgICAgaWYgKHVwZGF0ZSAhPT0gdW5kZWZpbmVkICYmIHVwZGF0ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQodXBkYXRlLCBcInBvc3QgdXBkYXRlZFwiLCB0cnVlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInBvc3QgdXBkYXRlIGZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcInBvc3QgVXBkYXRlIEVycm9yLCBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInBvc3QgdXBkYXRlIGZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGVsZXRlKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgaW50SWQgPSBwYXJzZUludChpZCk7XHJcbiAgICAgIGlmIChpbnRJZCA+IDApIHtcclxuICAgICAgICBjb25zdCBkZWxldGVSZXNwID0gYXdhaXQgcG9zdFNlcnZpY2UuZGVsZXRlKGludElkKTtcclxuXHJcbiAgICAgICAgaWYgKGRlbGV0ZVJlc3ApIHtcclxuICAgICAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChkZWxldGVSZXNwLCBcInBvc3QgZGVsZXRlZCBcIiwgdHJ1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJwb3N0IERlbGV0ZSBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInBvc3QgZGVsZXRlIGZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHBvc3RDb250cm9sbGVyID0gbmV3IFBvc3RDb250cm9sbGVyKCk7XHJcbiJdfQ==