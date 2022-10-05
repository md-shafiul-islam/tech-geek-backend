"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specificationTypeController = void 0;
const writeLog_1 = require("../logger/writeLog");
const spectype_service_1 = require("../service/spectype.service");
const respFormat_1 = __importDefault(require("../utils/response/respFormat"));
class SpecificationTypeController {
    async getAll(req, resp) {
        try {
            const specType = await spectype_service_1.specificationTypeService.getAll();
            if (specType) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(specType, "specType found", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(specType, "specType not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("specType getAll Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "specType not found"));
        }
    }
    async getById(req, resp) {
        const id = parseInt(req?.params?.id);
        try {
            const specType = await spectype_service_1.specificationTypeService.getById(id);
            if (specType) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(specType, "specType found", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(specType, "specType not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("specType getById Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "specType not found"));
        }
    }
    async add(req, resp) {
        const { name, value } = req.body;
        try {
            const specType = await spectype_service_1.specificationTypeService.save({
                name,
                value,
            });
            resp.status(201);
            resp.send((0, respFormat_1.default)(specType, " Save Or Added", true));
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("specType Add Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, " specType Add failed", false));
        }
    }
    async update(req, resp) {
        const { id, name, value } = req.body;
        try {
            const intId = parseInt(id);
            const specType = {
                id: intId,
                name,
                value,
            };
            const update = await spectype_service_1.specificationTypeService.update(specType);
            if (update !== undefined && update !== null) {
                resp.status(202);
                resp.send((0, respFormat_1.default)(update, "specType updated", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(null, "specType update failed", false));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("specType Update Error, ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "specType update failed", false));
        }
    }
    async delete(req, resp) {
        const { id } = req.params;
        try {
            const intId = parseInt(id);
            if (intId > 0) {
                const deleteResp = await spectype_service_1.specificationTypeService.delete(intId);
                if (deleteResp) {
                    resp.status(202);
                    resp.send((0, respFormat_1.default)(deleteResp, "specType deleted ", true));
                }
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("specType Delete Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "specType delete failed", false));
        }
    }
}
exports.specificationTypeController = new SpecificationTypeController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlY2lmaWNhdGlvbnR5cGUuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVyL3NwZWNpZmljYXRpb250eXBlLmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsaURBQWlEO0FBRWpELGtFQUF1RTtBQUN2RSw4RUFBc0Q7QUFFdEQsTUFBTSwyQkFBMkI7SUFDL0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFZLEVBQUUsSUFBYztRQUN2QyxJQUFJO1lBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSwyQ0FBd0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN6RCxJQUFJLFFBQVEsRUFBRTtnQkFDWixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUEsb0JBQVUsRUFBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQzthQUN6RDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUEsb0JBQVUsRUFBQyxRQUFRLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO2FBQ3ZEO1NBQ0Y7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLHNCQUFXLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFBLG9CQUFVLEVBQUMsSUFBSSxFQUFFLG9CQUFvQixDQUFDLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQVksRUFBRSxJQUFjO1FBQ3hDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUs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ZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBhcGlXcml0ZUxvZyB9IGZyb20gXCIuLi9sb2dnZXIvd3JpdGVMb2dcIjtcclxuaW1wb3J0IHsgU3BlY2lmaWNhdGlvblR5cGUgfSBmcm9tIFwiLi4vbW9kZWwvU3BlY2lmaWNhdGlvblR5cGVcIjtcclxuaW1wb3J0IHsgc3BlY2lmaWNhdGlvblR5cGVTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2Uvc3BlY3R5cGUuc2VydmljZVwiO1xyXG5pbXBvcnQgcmVzcEZvcm1hdCBmcm9tIFwiLi4vdXRpbHMvcmVzcG9uc2UvcmVzcEZvcm1hdFwiO1xyXG5cclxuY2xhc3MgU3BlY2lmaWNhdGlvblR5cGVDb250cm9sbGVyIHtcclxuICBhc3luYyBnZXRBbGwocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qgc3BlY1R5cGUgPSBhd2FpdCBzcGVjaWZpY2F0aW9uVHlwZVNlcnZpY2UuZ2V0QWxsKCk7XHJcbiAgICAgIGlmIChzcGVjVHlwZSkge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQoc3BlY1R5cGUsIFwic3BlY1R5cGUgZm91bmRcIiwgdHJ1ZSkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQoc3BlY1R5cGUsIFwic3BlY1R5cGUgbm90IGZvdW5kXCIpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJzcGVjVHlwZSBnZXRBbGwgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJzcGVjVHlwZSBub3QgZm91bmRcIikpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QnlJZChyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICBjb25zdCBpZCA9IHBhcnNlSW50KHJlcT8ucGFyYW1zPy5pZCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qgc3BlY1R5cGUgPSBhd2FpdCBzcGVjaWZpY2F0aW9uVHlwZVNlcnZpY2UuZ2V0QnlJZChpZCk7XHJcbiAgICAgIGlmIChzcGVjVHlwZSkge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQoc3BlY1R5cGUsIFwic3BlY1R5cGUgZm91bmRcIiwgdHJ1ZSkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQoc3BlY1R5cGUsIFwic3BlY1R5cGUgbm90IGZvdW5kXCIpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJzcGVjVHlwZSBnZXRCeUlkIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwic3BlY1R5cGUgbm90IGZvdW5kXCIpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZChyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICBjb25zdCB7IG5hbWUsIHZhbHVlIH0gPSByZXEuYm9keTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBzcGVjVHlwZSA9IGF3YWl0IHNwZWNpZmljYXRpb25UeXBlU2VydmljZS5zYXZlKHtcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIHZhbHVlLFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMSk7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KHNwZWNUeXBlLCBcIiBTYXZlIE9yIEFkZGVkXCIsIHRydWUpKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwic3BlY1R5cGUgQWRkIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwiIHNwZWNUeXBlIEFkZCBmYWlsZWRcIiwgZmFsc2UpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHVwZGF0ZShyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICBjb25zdCB7IGlkLCBuYW1lLCB2YWx1ZSB9ID0gcmVxLmJvZHk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgaW50SWQgPSBwYXJzZUludChpZCk7XHJcblxyXG4gICAgICBjb25zdCBzcGVjVHlwZTogUGFydGlhbDxTcGVjaWZpY2F0aW9uVHlwZT4gPSB7XHJcbiAgICAgICAgaWQ6IGludElkLFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgdmFsdWUsXHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnN0IHVwZGF0ZSA9IGF3YWl0IHNwZWNpZmljYXRpb25UeXBlU2VydmljZS51cGRhdGUoc3BlY1R5cGUpO1xyXG5cclxuICAgICAgaWYgKHVwZGF0ZSAhPT0gdW5kZWZpbmVkICYmIHVwZGF0ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQodXBkYXRlLCBcInNwZWNUeXBlIHVwZGF0ZWRcIiwgdHJ1ZSkpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJzcGVjVHlwZSB1cGRhdGUgZmFpbGVkXCIsIGZhbHNlKSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwic3BlY1R5cGUgVXBkYXRlIEVycm9yLCBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInNwZWNUeXBlIHVwZGF0ZSBmYWlsZWRcIiwgZmFsc2UpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGRlbGV0ZShyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGludElkID0gcGFyc2VJbnQoaWQpO1xyXG4gICAgICBpZiAoaW50SWQgPiAwKSB7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlUmVzcCA9IGF3YWl0IHNwZWNpZmljYXRpb25UeXBlU2VydmljZS5kZWxldGUoaW50SWQpO1xyXG5cclxuICAgICAgICBpZiAoZGVsZXRlUmVzcCkge1xyXG4gICAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KGRlbGV0ZVJlc3AsIFwic3BlY1R5cGUgZGVsZXRlZCBcIiwgdHJ1ZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJzcGVjVHlwZSBEZWxldGUgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJzcGVjVHlwZSBkZWxldGUgZmFpbGVkXCIsIGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc3BlY2lmaWNhdGlvblR5cGVDb250cm9sbGVyID0gbmV3IFNwZWNpZmljYXRpb25UeXBlQ29udHJvbGxlcigpO1xyXG4iXX0=