"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specificationTypeService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const writeLog_1 = require("../logger/writeLog");
const SpecificationType_1 = require("../model/SpecificationType");
const esHelper_1 = require("../utils/esHelper");
class SpecificationTypeService {
    specificationTypeRepository = null;
    initRepository() {
        if (this.specificationTypeRepository === null) {
            this.specificationTypeRepository = AppDataSource_1.AppDataSource.getRepository(SpecificationType_1.SpecificationType);
        }
    }
    async save(specificationType) {
        this.initRepository();
        if (specificationType) {
            try {
                const resp = await this.specificationTypeRepository?.save(specificationType);
                return resp;
            }
            catch (error) {
                writeLog_1.apiWriteLog.error("specificationType Save Failed ");
            }
        }
        return null;
    }
    async getById(id) {
        this.initRepository();
        try {
            const specificationType = await this.specificationTypeRepository?.findOne({ where: { id: id } });
            return specificationType;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error getspecificationTypeByID ", err);
            return null;
        }
    }
    async getAll() {
        this.initRepository();
        try {
            const specificationType = await this.specificationTypeRepository?.find();
            return specificationType;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error(`Error All specificationType `, err);
            return null;
        }
    }
    async update(specificationType) {
        this.initRepository();
        if (!(0, esHelper_1.esIsEmpty)(specificationType)) {
            try {
                const updatespecificationType = await this.specificationTypeRepository?.update({ id: specificationType.id }, specificationType);
                return updatespecificationType;
            }
            catch (error) {
                writeLog_1.apiWriteLog.error(`Update specificationType Error, `, error);
                return null;
            }
        }
        return null;
    }
    async delete(id) {
        this.initRepository();
        try {
            const specificationTypes = await this.specificationTypeRepository?.delete({ id: id });
            return specificationTypes;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error All specificationType ", err);
            return null;
        }
    }
}
exports.specificationTypeService = new SpecificationTypeService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlY3R5cGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL3NwZWN0eXBlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNkRBQTBEO0FBQzFELGlEQUFpRDtBQUVqRCxrRUFBK0Q7QUFDL0QsZ0RBQThDO0FBRTlDLE1BQU0sd0JBQXdCO0lBQ3BCLDJCQUEyQixHQUF5QyxJQUFJLENBQUM7SUFFekUsY0FBYztRQUNwQixJQUFJLElBQUksQ0FBQywyQkFBMkIsS0FBSyxJQUFJLEVBQUU7WUFDN0MsSUFBSSxDQUFDLDJCQUEyQixHQUFHLDZCQUFhLENBQUMsYUFBYSxDQUFDLHFDQUFpQixDQUFDLENBQUM7U0FDbkY7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBNkM7UUFDdEQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksaUJBQWlCLEVBQUU7WUFDckIsSUFBSTtnQkFDRixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQywyQkFBMkIsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFFN0UsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLHNCQUFXLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7YUFDckQ7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBVTtRQUN0QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSTtZQUNGLE1BQU0saUJBQWlCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLEVBQUUsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNqRyxPQUFPLGlCQUFpQixDQUFDO1NBQzFCO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixzQkFBVyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMxRCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNO1FBQ1YsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUk7WUFDRixNQUFNLGlCQUFpQixHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixFQUFFLElBQUksRUFBRSxDQUFDO1lBQ3pFLE9BQU8saUJBQWlCLENBQUM7U0FDMUI7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLHNCQUFXLENBQUMsS0FBSyxDQUFDLDhCQUE4QixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxpQkFBNkM7UUFDeEQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFBLG9CQUFTLEVBQUMsaUJBQWlCLENBQUMsRUFBRTtZQUNqQyxJQUFJO2dCQUNGLE1BQU0sdUJBQXVCLEdBQUcsTUFBTSxJQUFJLENBQUMsMkJBQTJCLEVBQUUsTUFBTSxDQUM1RSxFQUFFLEVBQUUsRUFBRSxpQkFBaUIsQ0FBQyxFQUFFLEVBQUUsRUFDNUIsaUJBQWlCLENBQ2xCLENBQUM7Z0JBRUYsT0FBTyx1QkFBdUIsQ0FBQzthQUNoQztZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLHNCQUFXLENBQUMsS0FBSyxDQUFDLGtDQUFrQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM3RCxPQUFPLElBQUksQ0FBQzthQUNiO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQVU7UUFDckIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUk7WUFDRixNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLDJCQUEyQixFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3RGLE9BQU8sa0JBQWtCLENBQUM7U0FDM0I7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLHNCQUFXLENBQUMsS0FBSyxDQUFDLDhCQUE4QixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0NBQ0Y7QUFFWSxRQUFBLHdCQUF3QixHQUFHLElBQUksd0JBQXdCLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcG9zaXRvcnksIFVwZGF0ZVJlc3VsdCB9IGZyb20gXCJ0eXBlb3JtXCI7XHJcbmltcG9ydCB7IEFwcERhdGFTb3VyY2UgfSBmcm9tIFwiLi4vZGF0YWJhc2UvQXBwRGF0YVNvdXJjZVwiO1xyXG5pbXBvcnQgeyBhcGlXcml0ZUxvZyB9IGZyb20gXCIuLi9sb2dnZXIvd3JpdGVMb2dcIjtcclxuaW1wb3J0IHsgQnJhbmQgfSBmcm9tIFwiLi4vbW9kZWwvQnJhbmRcIjtcclxuaW1wb3J0IHsgU3BlY2lmaWNhdGlvblR5cGUgfSBmcm9tIFwiLi4vbW9kZWwvU3BlY2lmaWNhdGlvblR5cGVcIjtcclxuaW1wb3J0IHsgZXNJc0VtcHR5IH0gZnJvbSBcIi4uL3V0aWxzL2VzSGVscGVyXCI7XHJcblxyXG5jbGFzcyBTcGVjaWZpY2F0aW9uVHlwZVNlcnZpY2Uge1xyXG4gIHByaXZhdGUgc3BlY2lmaWNhdGlvblR5cGVSZXBvc2l0b3J5OiBSZXBvc2l0b3J5PFNwZWNpZmljYXRpb25UeXBlPiB8IG51bGwgPSBudWxsO1xyXG5cclxuICBwcml2YXRlIGluaXRSZXBvc2l0b3J5KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuc3BlY2lmaWNhdGlvblR5cGVSZXBvc2l0b3J5ID09PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuc3BlY2lmaWNhdGlvblR5cGVSZXBvc2l0b3J5ID0gQXBwRGF0YVNvdXJjZS5nZXRSZXBvc2l0b3J5KFNwZWNpZmljYXRpb25UeXBlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHNhdmUoc3BlY2lmaWNhdGlvblR5cGU6IFBhcnRpYWw8U3BlY2lmaWNhdGlvblR5cGU+KSB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICBpZiAoc3BlY2lmaWNhdGlvblR5cGUpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgdGhpcy5zcGVjaWZpY2F0aW9uVHlwZVJlcG9zaXRvcnk/LnNhdmUoc3BlY2lmaWNhdGlvblR5cGUpO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzcDtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBhcGlXcml0ZUxvZy5lcnJvcihcInNwZWNpZmljYXRpb25UeXBlIFNhdmUgRmFpbGVkIFwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRCeUlkKGlkOiBudW1iZXIpOiBQcm9taXNlPFNwZWNpZmljYXRpb25UeXBlIHwgbnVsbCB8IHVuZGVmaW5lZD4ge1xyXG4gICAgdGhpcy5pbml0UmVwb3NpdG9yeSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qgc3BlY2lmaWNhdGlvblR5cGUgPSBhd2FpdCB0aGlzLnNwZWNpZmljYXRpb25UeXBlUmVwb3NpdG9yeT8uZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBpZCB9IH0pO1xyXG4gICAgICByZXR1cm4gc3BlY2lmaWNhdGlvblR5cGU7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJFcnJvciBnZXRzcGVjaWZpY2F0aW9uVHlwZUJ5SUQgXCIsIGVycik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QWxsKCk6IFByb21pc2U8U3BlY2lmaWNhdGlvblR5cGVbXSB8IG51bGwgfCB1bmRlZmluZWQ+IHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHNwZWNpZmljYXRpb25UeXBlID0gYXdhaXQgdGhpcy5zcGVjaWZpY2F0aW9uVHlwZVJlcG9zaXRvcnk/LmZpbmQoKTtcclxuICAgICAgcmV0dXJuIHNwZWNpZmljYXRpb25UeXBlO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKGBFcnJvciBBbGwgc3BlY2lmaWNhdGlvblR5cGUgYCwgZXJyKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyB1cGRhdGUoc3BlY2lmaWNhdGlvblR5cGU6IFBhcnRpYWw8U3BlY2lmaWNhdGlvblR5cGU+KTpQcm9taXNlPFVwZGF0ZVJlc3VsdCB8IG51bGwgfCB1bmRlZmluZWQ+IHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIGlmICghZXNJc0VtcHR5KHNwZWNpZmljYXRpb25UeXBlKSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZXNwZWNpZmljYXRpb25UeXBlID0gYXdhaXQgdGhpcy5zcGVjaWZpY2F0aW9uVHlwZVJlcG9zaXRvcnk/LnVwZGF0ZShcclxuICAgICAgICAgIHsgaWQ6IHNwZWNpZmljYXRpb25UeXBlLmlkIH0sXHJcbiAgICAgICAgICBzcGVjaWZpY2F0aW9uVHlwZVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiB1cGRhdGVzcGVjaWZpY2F0aW9uVHlwZTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBhcGlXcml0ZUxvZy5lcnJvcihgVXBkYXRlIHNwZWNpZmljYXRpb25UeXBlIEVycm9yLCBgLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgYXN5bmMgZGVsZXRlKGlkOiBudW1iZXIpIHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHNwZWNpZmljYXRpb25UeXBlcyA9IGF3YWl0IHRoaXMuc3BlY2lmaWNhdGlvblR5cGVSZXBvc2l0b3J5Py5kZWxldGUoeyBpZDogaWQgfSk7XHJcbiAgICAgIHJldHVybiBzcGVjaWZpY2F0aW9uVHlwZXM7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJFcnJvciBBbGwgc3BlY2lmaWNhdGlvblR5cGUgXCIsIGVycik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNwZWNpZmljYXRpb25UeXBlU2VydmljZSA9IG5ldyBTcGVjaWZpY2F0aW9uVHlwZVNlcnZpY2UoKTtcclxuIl19