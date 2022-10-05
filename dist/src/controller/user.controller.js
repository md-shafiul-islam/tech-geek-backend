"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const writeLog_1 = require("../logger/writeLog");
const user_service_1 = require("../service/user.service");
const respFormat_1 = __importDefault(require("../utils/response/respFormat"));
class UserController {
    async getAll(req, resp) {
        try {
            const user = await user_service_1.userService.getAll();
            if (user) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(user, "user found", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(user, "user not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("user getAll Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "user not found"));
        }
    }
    async getById(req, resp) {
        const id = parseInt(req?.params?.id);
        try {
            const user = await user_service_1.userService.getById(id);
            if (user) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(user, "user found", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(user, "user not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("user getById Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "user not found"));
        }
    }
    async add(req, resp) {
        const { firstName, lastName } = req.body;
        try {
            const user = await user_service_1.userService.save({
                firstName,
                lastName,
            });
            resp.status(201);
            resp.send((0, respFormat_1.default)(user, " Save Or Added", true));
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("user Add Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, " user Add failed", false));
        }
    }
    async update(req, resp) {
        const { id, firstName, lastName } = req.body;
        try {
            const intId = parseInt(id);
            const user = {
                id: intId,
                firstName,
                lastName,
            };
            const update = await user_service_1.userService.update(user);
            if (update !== undefined && update !== null) {
                resp.status(202);
                resp.send((0, respFormat_1.default)(update, "user updated", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(null, "user update failed", false));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("user Update Error, ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "user update failed", false));
        }
    }
    async delete(req, resp) {
        const { id } = req.params;
        try {
            const intId = parseInt(id);
            if (intId > 0) {
                const deleteResp = await user_service_1.userService.delete(intId);
                if (deleteResp) {
                    resp.status(202);
                    resp.send((0, respFormat_1.default)(deleteResp, "user deleted ", true));
                }
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("user Delete Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "user delete failed", false));
        }
    }
}
exports.userController = new UserController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRyb2xsZXIvdXNlci5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLGlEQUFpRDtBQUVqRCwwREFBc0Q7QUFDdEQsOEVBQXNEO0FBRXRELE1BQU0sY0FBYztJQUNsQixLQUFLLENBQUMsTUFBTSxDQUFDLEdBQVksRUFBRSxJQUFjO1FBQ3ZDLElBQUk7WUFDRixNQUFNLElBQUksR0FBRyxNQUFNLDBCQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDeEMsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFBLG9CQUFVLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ2pEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxvQkFBVSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7YUFDL0M7U0FDRjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Qsc0JBQVcsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUEsb0JBQVUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1NBQy9DO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBWSxFQUFFLElBQWM7UUFDeEMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFckMsSUFBSTtZQUNGLE1BQU0sSUFBSSxHQUFHLE1BQU0sMEJBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDM0MsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFBLG9CQUFVLEVBQUMsSUFBSSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ2pEO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxvQkFBVSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7YUFDL0M7U0FDRjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Qsc0JBQVcsQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUEsb0JBQVUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1NBQy9DO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBWSxFQUFFLElBQWM7UUFDcEMsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBRXpDLElBQUk7WUFDRixNQUFNLElBQUksR0FBRyxNQUFNLDBCQUFXLENBQUMsSUFBSSxDQUFDO2dCQUNsQyxTQUFTO2dCQUNULFFBQVE7YUFDVCxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxvQkFBVSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3JEO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxzQkFBVyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxvQkFBVSxFQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3hEO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBWSxFQUFFLElBQWM7UUFDdkMsTUFBTSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUU3QyxJQUFJO1lBQ0YsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRTNCLE1BQU0sSUFBSSxHQUFrQjtnQkFDMUIsRUFBRSxFQUFFLEtBQUs7Z0JBQ1QsU0FBUztnQkFDVCxRQUFRO2FBQ1QsQ0FBQztZQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sMEJBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFOUMsSUFBSSxNQUFNLEtBQUssU0FBUyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7Z0JBQzNDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxvQkFBVSxFQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUNyRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUEsb0JBQVUsRUFBQyxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUMxRDtTQUNGO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxzQkFBVyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNoRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxvQkFBVSxFQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzFEO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBWSxFQUFFLElBQWM7UUFDdkMsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFFMUIsSUFBSTtZQUNGLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzQixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ2IsTUFBTSxVQUFVLEdBQUcsTUFBTSwwQkFBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFbkQsSUFBSSxVQUFVLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFBLG9CQUFVLEVBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUMxRDthQUNGO1NBQ0Y7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLHNCQUFXLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFBLG9CQUFVLEVBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDMUQ7SUFDSCxDQUFDO0NBQ0Y7QUFFWSxRQUFBLGNBQWMsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBhcGlXcml0ZUxvZyB9IGZyb20gXCIuLi9sb2dnZXIvd3JpdGVMb2dcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuLi9tb2RlbC9Vc2VyXCI7XHJcbmltcG9ydCB7IHVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2UvdXNlci5zZXJ2aWNlXCI7XHJcbmltcG9ydCByZXNwRm9ybWF0IGZyb20gXCIuLi91dGlscy9yZXNwb25zZS9yZXNwRm9ybWF0XCI7XHJcblxyXG5jbGFzcyBVc2VyQ29udHJvbGxlciB7XHJcbiAgYXN5bmMgZ2V0QWxsKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB1c2VyU2VydmljZS5nZXRBbGwoKTtcclxuICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KHVzZXIsIFwidXNlciBmb3VuZFwiLCB0cnVlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdCh1c2VyLCBcInVzZXIgbm90IGZvdW5kXCIpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJ1c2VyIGdldEFsbCBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInVzZXIgbm90IGZvdW5kXCIpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEJ5SWQocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgY29uc3QgaWQgPSBwYXJzZUludChyZXE/LnBhcmFtcz8uaWQpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB1c2VyU2VydmljZS5nZXRCeUlkKGlkKTtcclxuICAgICAgaWYgKHVzZXIpIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KHVzZXIsIFwidXNlciBmb3VuZFwiLCB0cnVlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdCh1c2VyLCBcInVzZXIgbm90IGZvdW5kXCIpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJ1c2VyIGdldEJ5SWQgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJ1c2VyIG5vdCBmb3VuZFwiKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBhZGQocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgY29uc3QgeyBmaXJzdE5hbWUsIGxhc3ROYW1lIH0gPSByZXEuYm9keTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgdXNlclNlcnZpY2Uuc2F2ZSh7XHJcbiAgICAgICAgZmlyc3ROYW1lLFxyXG4gICAgICAgIGxhc3ROYW1lLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMSk7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KHVzZXIsIFwiIFNhdmUgT3IgQWRkZWRcIiwgdHJ1ZSkpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJ1c2VyIEFkZCBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcIiB1c2VyIEFkZCBmYWlsZWRcIiwgZmFsc2UpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHVwZGF0ZShyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICBjb25zdCB7IGlkLCBmaXJzdE5hbWUsIGxhc3ROYW1lIH0gPSByZXEuYm9keTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBpbnRJZCA9IHBhcnNlSW50KGlkKTtcclxuXHJcbiAgICAgIGNvbnN0IHVzZXI6IFBhcnRpYWw8VXNlcj4gPSB7XHJcbiAgICAgICAgaWQ6IGludElkLFxyXG4gICAgICAgIGZpcnN0TmFtZSxcclxuICAgICAgICBsYXN0TmFtZSxcclxuICAgICAgfTtcclxuICAgICAgY29uc3QgdXBkYXRlID0gYXdhaXQgdXNlclNlcnZpY2UudXBkYXRlKHVzZXIpO1xyXG5cclxuICAgICAgaWYgKHVwZGF0ZSAhPT0gdW5kZWZpbmVkICYmIHVwZGF0ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQodXBkYXRlLCBcInVzZXIgdXBkYXRlZFwiLCB0cnVlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInVzZXIgdXBkYXRlIGZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcInVzZXIgVXBkYXRlIEVycm9yLCBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInVzZXIgdXBkYXRlIGZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGVsZXRlKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgaW50SWQgPSBwYXJzZUludChpZCk7XHJcbiAgICAgIGlmIChpbnRJZCA+IDApIHtcclxuICAgICAgICBjb25zdCBkZWxldGVSZXNwID0gYXdhaXQgdXNlclNlcnZpY2UuZGVsZXRlKGludElkKTtcclxuXHJcbiAgICAgICAgaWYgKGRlbGV0ZVJlc3ApIHtcclxuICAgICAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChkZWxldGVSZXNwLCBcInVzZXIgZGVsZXRlZCBcIiwgdHJ1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJ1c2VyIERlbGV0ZSBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInVzZXIgZGVsZXRlIGZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHVzZXJDb250cm9sbGVyID0gbmV3IFVzZXJDb250cm9sbGVyKCk7XHJcbiJdfQ==