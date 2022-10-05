"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specificationController = void 0;
const writeLog_1 = require("../logger/writeLog");
const specification_service_1 = require("../service/specification.service");
const respFormat_1 = __importDefault(require("../utils/response/respFormat"));
class SpecificationController {
    async getAll(req, resp) {
        try {
            const specifications = await specification_service_1.specificationService.getAll();
            if (specifications) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(specifications, "specification found", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(specifications, "specification not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("specification getAll Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "specification not found"));
        }
    }
    async getById(req, resp) {
        const id = parseInt(req?.params?.id);
        try {
            const specification = await specification_service_1.specificationService.getById(id);
            if (specification) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(specification, "specification found", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(specification, "specification not found"));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("specification getById Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "specification not found"));
        }
    }
    async add(req, resp) {
        const { specType, key, value, description, product, isFeature } = req.body;
        try {
            const specification = await specification_service_1.specificationService.save({
                key,
                value,
                description,
                product,
                isFeature,
            });
            resp.status(201);
            resp.send((0, respFormat_1.default)(specification, " Save Or Added", true));
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("specification Add Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, " specification Add failed", false));
        }
    }
    async update(req, resp) {
        const { specType, key, value, description, product, isFeature, id } = req.body;
        try {
            const intId = parseInt(id);
            const specification = {
                id: intId,
                key,
                value,
                description,
                product,
                isFeature,
            };
            const update = await specification_service_1.specificationService.update(specification);
            if (update !== undefined && update !== null) {
                resp.status(202);
                resp.send((0, respFormat_1.default)(update, "specification updated", true));
            }
            else {
                resp.status(202);
                resp.send((0, respFormat_1.default)(null, "specification update failed", false));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("specification Update Error, ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "specification update failed", false));
        }
    }
    async delete(req, resp) {
        const { id } = req.params;
        try {
            const intId = parseInt(id);
            if (intId > 0) {
                const deleteResp = await specification_service_1.specificationService.delete(intId);
                if (deleteResp) {
                    resp.status(202);
                    resp.send((0, respFormat_1.default)(deleteResp, "specification deleted ", true));
                }
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("specification Delete Error ", error);
            resp.status(202);
            resp.send((0, respFormat_1.default)(null, "specification delete failed", false));
        }
    }
}
exports.specificationController = new SpecificationController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlY2lmaWNhdGlvbi5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRyb2xsZXIvc3BlY2lmaWNhdGlvbi5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLGlEQUFpRDtBQUVqRCw0RUFBd0U7QUFDeEUsOEVBQXNEO0FBRXRELE1BQU0sdUJBQXVCO0lBQzNCLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBWSxFQUFFLElBQWM7UUFDdkMsSUFBSTtZQUNGLE1BQU0sY0FBYyxHQUFHLE1BQU0sNENBQW9CLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDM0QsSUFBSSxjQUFjLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxvQkFBVSxFQUFDLGNBQWMsRUFBRSxxQkFBcUIsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ3BFO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxvQkFBVSxFQUFDLGNBQWMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7YUFDbEU7U0FDRjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Qsc0JBQVcsQ0FBQyxLQUFLLENBQUMsNkJBQTZCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDeEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUEsb0JBQVUsRUFBQyxJQUFJLEVBQUUseUJBQXlCLENBQUMsQ0FBQyxDQUFDO1NBQ3hEO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBWSxFQUFFLElBQWM7UUFDeEMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVB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QUFLLENBQUMsQ0FBQyxDQUFDO1NBQ25FO0lBQ0gsQ0FBQztDQUNGO0FBRVksUUFBQSx1QkFBdUIsR0FBRyxJQUFJLHVCQUF1QixFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7IGFwaVdyaXRlTG9nIH0gZnJvbSBcIi4uL2xvZ2dlci93cml0ZUxvZ1wiO1xyXG5pbXBvcnQgeyBTcGVjaWZpY2F0aW9uIH0gZnJvbSBcIi4uL21vZGVsL1NwZWNpZmljYXRpb25cIjtcclxuaW1wb3J0IHsgc3BlY2lmaWNhdGlvblNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZS9zcGVjaWZpY2F0aW9uLnNlcnZpY2VcIjtcclxuaW1wb3J0IHJlc3BGb3JtYXQgZnJvbSBcIi4uL3V0aWxzL3Jlc3BvbnNlL3Jlc3BGb3JtYXRcIjtcclxuXHJcbmNsYXNzIFNwZWNpZmljYXRpb25Db250cm9sbGVyIHtcclxuICBhc3luYyBnZXRBbGwocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qgc3BlY2lmaWNhdGlvbnMgPSBhd2FpdCBzcGVjaWZpY2F0aW9uU2VydmljZS5nZXRBbGwoKTtcclxuICAgICAgaWYgKHNwZWNpZmljYXRpb25zKSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAwKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChzcGVjaWZpY2F0aW9ucywgXCJzcGVjaWZpY2F0aW9uIGZvdW5kXCIsIHRydWUpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KHNwZWNpZmljYXRpb25zLCBcInNwZWNpZmljYXRpb24gbm90IGZvdW5kXCIpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJzcGVjaWZpY2F0aW9uIGdldEFsbCBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcInNwZWNpZmljYXRpb24gbm90IGZvdW5kXCIpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEJ5SWQocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgY29uc3QgaWQgPSBwYXJzZUludChyZXE/LnBhcmFtcz8uaWQpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHNwZWNpZmljYXRpb24gPSBhd2FpdCBzcGVjaWZpY2F0aW9uU2VydmljZS5nZXRCeUlkKGlkKTtcclxuICAgICAgaWYgKHNwZWNpZmljYXRpb24pIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KHNwZWNpZmljYXRpb24sIFwic3BlY2lmaWNhdGlvbiBmb3VuZFwiLCB0cnVlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChzcGVjaWZpY2F0aW9uLCBcInNwZWNpZmljYXRpb24gbm90IGZvdW5kXCIpKTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJzcGVjaWZpY2F0aW9uIGdldEJ5SWQgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJzcGVjaWZpY2F0aW9uIG5vdCBmb3VuZFwiKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBhZGQocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgY29uc3QgeyBzcGVjVHlwZSwga2V5LCB2YWx1ZSwgZGVzY3JpcHRpb24sIHByb2R1Y3QsIGlzRmVhdHVyZSB9ID0gcmVxLmJvZHk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qgc3BlY2lmaWNhdGlvbiA9IGF3YWl0IHNwZWNpZmljYXRpb25TZXJ2aWNlLnNhdmUoe1xyXG4gICAgICAgIGtleSxcclxuICAgICAgICB2YWx1ZSxcclxuICAgICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgICBwcm9kdWN0LFxyXG4gICAgICAgIGlzRmVhdHVyZSxcclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXNwLnN0YXR1cygyMDEpO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChzcGVjaWZpY2F0aW9uLCBcIiBTYXZlIE9yIEFkZGVkXCIsIHRydWUpKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwic3BlY2lmaWNhdGlvbiBBZGQgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCIgc3BlY2lmaWNhdGlvbiBBZGQgZmFpbGVkXCIsIGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyB1cGRhdGUocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgY29uc3QgeyBzcGVjVHlwZSwga2V5LCB2YWx1ZSwgZGVzY3JpcHRpb24sIHByb2R1Y3QsIGlzRmVhdHVyZSwgaWQgfSA9XHJcbiAgICAgIHJlcS5ib2R5O1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGludElkID0gcGFyc2VJbnQoaWQpO1xyXG5cclxuICAgICAgY29uc3Qgc3BlY2lmaWNhdGlvbjogUGFydGlhbDxTcGVjaWZpY2F0aW9uPiA9IHtcclxuICAgICAgICBpZDogaW50SWQsXHJcbiAgICAgICAga2V5LFxyXG4gICAgICAgIHZhbHVlLFxyXG4gICAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICAgIHByb2R1Y3QsXHJcbiAgICAgICAgaXNGZWF0dXJlLFxyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCB1cGRhdGUgPSBhd2FpdCBzcGVjaWZpY2F0aW9uU2VydmljZS51cGRhdGUoc3BlY2lmaWNhdGlvbik7XHJcblxyXG4gICAgICBpZiAodXBkYXRlICE9PSB1bmRlZmluZWQgJiYgdXBkYXRlICE9PSBudWxsKSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdCh1cGRhdGUsIFwic3BlY2lmaWNhdGlvbiB1cGRhdGVkXCIsIHRydWUpKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXNwLnN0YXR1cygyMDIpO1xyXG4gICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwic3BlY2lmaWNhdGlvbiB1cGRhdGUgZmFpbGVkXCIsIGZhbHNlKSk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwic3BlY2lmaWNhdGlvbiBVcGRhdGUgRXJyb3IsIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwic3BlY2lmaWNhdGlvbiB1cGRhdGUgZmFpbGVkXCIsIGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBkZWxldGUocmVxOiBSZXF1ZXN0LCByZXNwOiBSZXNwb25zZSkge1xyXG4gICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBpbnRJZCA9IHBhcnNlSW50KGlkKTtcclxuICAgICAgaWYgKGludElkID4gMCkge1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZVJlc3AgPSBhd2FpdCBzcGVjaWZpY2F0aW9uU2VydmljZS5kZWxldGUoaW50SWQpO1xyXG5cclxuICAgICAgICBpZiAoZGVsZXRlUmVzcCkge1xyXG4gICAgICAgICAgcmVzcC5zdGF0dXMoMjAyKTtcclxuICAgICAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KGRlbGV0ZVJlc3AsIFwic3BlY2lmaWNhdGlvbiBkZWxldGVkIFwiLCB0cnVlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcInNwZWNpZmljYXRpb24gRGVsZXRlIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMik7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwic3BlY2lmaWNhdGlvbiBkZWxldGUgZmFpbGVkXCIsIGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc3BlY2lmaWNhdGlvbkNvbnRyb2xsZXIgPSBuZXcgU3BlY2lmaWNhdGlvbkNvbnRyb2xsZXIoKTtcclxuIl19