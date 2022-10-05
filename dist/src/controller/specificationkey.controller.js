"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specificationKeyController = void 0;
const writeLog_1 = require("../logger/writeLog");
const speckey_service_1 = require("../service/speckey.service");
const respFormat_1 = __importDefault(require("../utils/response/respFormat"));
class SpecificationKeyController {
    async getAll(req, resp) {
        try {
            const specKeys = await speckey_service_1.specKeyService.getAll();
            if (specKeys) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(specKeys, "SpecKeys found", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(specKeys, "SpecKeys not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("SpecKeys getAll Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "SpecKeys not found"));
        }
    }
    async getById(req, resp) {
        const id = parseInt(req?.params?.id);
        try {
            const specKey = await speckey_service_1.specKeyService.getById(id);
            if (specKey) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(specKey, "SpecKey found", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(specKey, "SpecKey not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("SpecKey getById Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "SpecKey not found"));
        }
    }
    async add(req, resp) {
        const { name, value } = req.body;
        try {
            const specKey = await speckey_service_1.specKeyService.save({
                name,
                value,
            });
            resp.status(201);
            resp.send((0, respFormat_1.default)(specKey, " Save Or Added", true));
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("SpecKey Add Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, " SpecKey Add failed", false));
        }
    }
    async update(req, resp) {
        const { id, name, value } = req.body;
        try {
            const intId = parseInt(id);
            const specKey = {
                id: intId,
                name,
                value,
            };
            const update = await speckey_service_1.specKeyService.update(specKey);
            if (update !== undefined && update !== null) {
                resp.status(202);
                resp.send((0, respFormat_1.default)(update, "SpecKey updated", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(null, "SpecKey update failed", false));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("SpecKey Update Error, ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "SpecKey update failed", false));
        }
    }
    async delete(req, resp) {
        const { id } = req.params;
        try {
            const intId = parseInt(id);
            if (intId > 0) {
                const deleteResp = await speckey_service_1.specKeyService.delete(intId);
                if (deleteResp) {
                    resp.status(202);
                    resp.send((0, respFormat_1.default)(deleteResp, "SpecKey deleted ", true));
                }
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("SpecKey Delete Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "SpecKey delete failed", false));
        }
    }
}
exports.specificationKeyController = new SpecificationKeyController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlY2lmaWNhdGlvbmtleS5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRyb2xsZXIvc3BlY2lmaWNhdGlvbmtleS5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLGlEQUFpRDtBQUVqRCxnRUFBNEQ7QUFDNUQsOEVBQXNEO0FBRXRELE1BQU0sMEJBQTBCO0lBQzlCLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBWSxFQUFFLElBQWM7UUFDdkMsSUFBSTtZQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sZ0NBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMvQyxJQUFJLFFBQVEsRUFBRTtnQkFDWixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUEsb0JBQVUsRUFBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUN6RDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUEsb0JBQVUsRUFBQyxRQUFRLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO2FBQ3ZEO1NBQ0Y7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLHNCQUFXLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFBLG9CQUFVLEVBQUMsSUFBSSxFQUFFLG9CQUFvQixDQUFDLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQVksRUFBRSxJQUFjO1FBQ3hDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsTUFB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O1xyXG5pbXBvcnQgeyBhcGlXcml0ZUxvZyB9IGZyb20gXCIuLi9sb2dnZXIvd3JpdGVMb2dcIjtcclxuaW1wb3J0IHsgU3BlY0tleSB9IGZyb20gXCIuLi9tb2RlbC9TcGVjS2V5XCI7XHJcbmltcG9ydCB7IHNwZWNLZXlTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2Uvc3BlY2tleS5zZXJ2aWNlXCI7XHJcbmltcG9ydCByZXNwRm9ybWF0IGZyb20gXCIuLi91dGlscy9yZXNwb25zZS9yZXNwRm9ybWF0XCI7XHJcblxyXG5jbGFzcyBTcGVjaWZpY2F0aW9uS2V5Q29udHJvbGxlciB7XHJcbiAgYXN5bmMgZ2V0QWxsKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHNwZWNLZXlzID0gYXdhaXQgc3BlY0tleVNlcnZpY2UuZ2V0QWxsKCk7XHJcbiAgICAgIGlmIChzcGVjS2V5cykge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQoc3BlY0tleXMsIFwiU3BlY0tleXMgZm91bmRcIiwgdHJ1ZSkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQoc3BlY0tleXMsIFwiU3BlY0tleXMgbm90IGZvdW5kXCIpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJTcGVjS2V5cyBnZXRBbGwgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJTcGVjS2V5cyBub3QgZm91bmRcIikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QnlJZChyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICBjb25zdCBpZCA9IHBhcnNlSW50KHJlcT8ucGFyYW1zPy5pZCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qgc3BlY0tleSA9IGF3YWl0IHNwZWNLZXlTZXJ2aWNlLmdldEJ5SWQoaWQpO1xyXG4gICAgICBpZiAoc3BlY0tleSkge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQoc3BlY0tleSwgXCJTcGVjS2V5IGZvdW5kXCIsIHRydWUpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KHNwZWNLZXksIFwiU3BlY0tleSBub3QgZm91bmRcIikpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIlNwZWNLZXkgZ2V0QnlJZCBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcIlNwZWNLZXkgbm90IGZvdW5kXCIpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZChyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICBjb25zdCB7IG5hbWUsIHZhbHVlIH0gPSByZXEuYm9keTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBzcGVjS2V5ID0gYXdhaXQgc3BlY0tleVNlcnZpY2Uuc2F2ZSh7XHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICB2YWx1ZSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXNwLnN0YXR1cygyMDEpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChzcGVjS2V5LCBcIiBTYXZlIE9yIEFkZGVkXCIsIHRydWUpKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiU3BlY0tleSBBZGQgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCIgU3BlY0tleSBBZGQgZmFpbGVkXCIsIGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyB1cGRhdGUocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgY29uc3QgeyBpZCwgbmFtZSwgdmFsdWUgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGludElkID0gcGFyc2VJbnQoaWQpO1xyXG5cclxuICAgICAgY29uc3Qgc3BlY0tleTogUGFydGlhbDxTcGVjS2V5PiA9IHtcclxuICAgICAgICBpZDogaW50SWQsXHJcbiAgICAgICAgbmFtZSxcclxuICAgICAgICB2YWx1ZSxcclxuICAgICAgfTtcclxuICAgICAgY29uc3QgdXBkYXRlID0gYXdhaXQgc3BlY0tleVNlcnZpY2UudXBkYXRlKHNwZWNLZXkpO1xyXG5cclxuICAgICAgaWYgKHVwZGF0ZSAhPT0gdW5kZWZpbmVkICYmIHVwZGF0ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQodXBkYXRlLCBcIlNwZWNLZXkgdXBkYXRlZFwiLCB0cnVlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcIlNwZWNLZXkgdXBkYXRlIGZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIlNwZWNLZXkgVXBkYXRlIEVycm9yLCBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcIlNwZWNLZXkgdXBkYXRlIGZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGVsZXRlKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgaW50SWQgPSBwYXJzZUludChpZCk7XHJcbiAgICAgIGlmIChpbnRJZCA+IDApIHtcclxuICAgICAgICBjb25zdCBkZWxldGVSZXNwID0gYXdhaXQgc3BlY0tleVNlcnZpY2UuZGVsZXRlKGludElkKTtcclxuXHJcbiAgICAgICAgaWYgKGRlbGV0ZVJlc3ApIHtcclxuICAgICAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChkZWxldGVSZXNwLCBcIlNwZWNLZXkgZGVsZXRlZCBcIiwgdHJ1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJTcGVjS2V5IERlbGV0ZSBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcIlNwZWNLZXkgZGVsZXRlIGZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNwZWNpZmljYXRpb25LZXlDb250cm9sbGVyID0gbmV3IFNwZWNpZmljYXRpb25LZXlDb250cm9sbGVyKCk7XHJcbiJdfQ==