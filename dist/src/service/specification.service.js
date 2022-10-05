"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specificationService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const writeLog_1 = require("../logger/writeLog");
const Specification_1 = require("../model/Specification");
const esHelper_1 = require("../utils/esHelper");
class SpecificationService {
    specificationRepository = null;
    initRepository() {
        if (this.specificationRepository === null) {
            this.specificationRepository = AppDataSource_1.AppDataSource.getRepository(Specification_1.Specification);
        }
    }
    async save(specification) {
        this.initRepository();
        if (specification) {
            try {
                const resp = await this.specificationRepository?.save(specification);
                return resp;
            }
            catch (error) {
                writeLog_1.apiWriteLog.error("specification Save Failed ");
            }
        }
        return null;
    }
    async getById(id) {
        this.initRepository();
        try {
            const specification = await this.specificationRepository?.findOne({ where: { id: id } });
            return specification;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error getspecificationByID ", err);
            return null;
        }
    }
    async getAll() {
        this.initRepository();
        try {
            const specification = await this.specificationRepository?.find();
            return specification;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error(`Error All specification `, err);
            return null;
        }
    }
    async update(specification) {
        this.initRepository();
        if (!(0, esHelper_1.esIsEmpty)(specification)) {
            try {
                const updatespecification = await this.specificationRepository?.update({ id: specification.id }, specification);
                return updatespecification;
            }
            catch (error) {
                writeLog_1.apiWriteLog.error(`Update specification Error, `, error);
                return null;
            }
        }
        return null;
    }
    async delete(id) {
        this.initRepository();
        try {
            const specifications = await this.specificationRepository?.delete({ id: id });
            return specifications;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error All specification ", err);
            return null;
        }
    }
}
exports.specificationService = new SpecificationService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlY2lmaWNhdGlvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2Uvc3BlY2lmaWNhdGlvbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDZEQUEwRDtBQUMxRCxpREFBaUQ7QUFDakQsMERBQXVEO0FBQ3ZELGdEQUE4QztBQUU5QyxNQUFNLG9CQUFvQjtJQUNoQix1QkFBdUIsR0FBcUMsSUFBSSxDQUFDO0lBRWpFLGNBQWM7UUFDcEIsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEtBQUssSUFBSSxFQUFFO1lBQ3pDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyw2QkFBYSxDQUFDLGFBQWEsQ0FBQyw2QkFBYSxDQUFDLENBQUM7U0FDM0U7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxhQUFxQztRQUM5QyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxhQUFhLEVBQUU7WUFDakIsSUFBSTtnQkFDRixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBRXJFLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxzQkFBVyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2FBQ2pEO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQVU7UUFDdEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUk7WUFDRixNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3pGLE9BQU8sYUFBYSxDQUFDO1NBQ3RCO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixzQkFBVyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN0RCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNO1FBQ1YsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUk7WUFDRixNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUNqRSxPQUFPLGFBQWEsQ0FBQztTQUN0QjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osc0JBQVcsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbkQsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLGFBQXFDO1FBQ2hELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBQSxvQkFBUyxFQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzdCLElBQUk7Z0JBQ0YsTUFBTSxtQkFBbUIsR0FBRyxNQUFNLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxNQUFNLENBQ3BFLEVBQUUsRUFBRSxFQUFFLGFBQWEsQ0FBQyxFQUFFLEVBQUUsRUFDeEIsYUFBYSxDQUNkLENBQUM7Z0JBRUYsT0FBTyxtQkFBbUIsQ0FBQzthQUM1QjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLHNCQUFXLENBQUMsS0FBSyxDQUFDLDhCQUE4QixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN6RCxPQUFPLElBQUksQ0FBQzthQUNiO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQVU7UUFDckIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUk7WUFDRixNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM5RSxPQUFPLGNBQWMsQ0FBQztTQUN2QjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osc0JBQVcsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbkQsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7Q0FDRjtBQUVZLFFBQUEsb0JBQW9CLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVwb3NpdG9yeSwgVXBkYXRlUmVzdWx0IH0gZnJvbSBcInR5cGVvcm1cIjtcclxuaW1wb3J0IHsgQXBwRGF0YVNvdXJjZSB9IGZyb20gXCIuLi9kYXRhYmFzZS9BcHBEYXRhU291cmNlXCI7XHJcbmltcG9ydCB7IGFwaVdyaXRlTG9nIH0gZnJvbSBcIi4uL2xvZ2dlci93cml0ZUxvZ1wiO1xyXG5pbXBvcnQgeyBTcGVjaWZpY2F0aW9uIH0gZnJvbSBcIi4uL21vZGVsL1NwZWNpZmljYXRpb25cIjtcclxuaW1wb3J0IHsgZXNJc0VtcHR5IH0gZnJvbSBcIi4uL3V0aWxzL2VzSGVscGVyXCI7XHJcblxyXG5jbGFzcyBTcGVjaWZpY2F0aW9uU2VydmljZSB7XHJcbiAgcHJpdmF0ZSBzcGVjaWZpY2F0aW9uUmVwb3NpdG9yeTogUmVwb3NpdG9yeTxTcGVjaWZpY2F0aW9uPiB8IG51bGwgPSBudWxsO1xyXG5cclxuICBwcml2YXRlIGluaXRSZXBvc2l0b3J5KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuc3BlY2lmaWNhdGlvblJlcG9zaXRvcnkgPT09IG51bGwpIHtcclxuICAgICAgdGhpcy5zcGVjaWZpY2F0aW9uUmVwb3NpdG9yeSA9IEFwcERhdGFTb3VyY2UuZ2V0UmVwb3NpdG9yeShTcGVjaWZpY2F0aW9uKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHNhdmUoc3BlY2lmaWNhdGlvbjogUGFydGlhbDxTcGVjaWZpY2F0aW9uPikge1xyXG4gICAgdGhpcy5pbml0UmVwb3NpdG9yeSgpO1xyXG4gICAgaWYgKHNwZWNpZmljYXRpb24pIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgdGhpcy5zcGVjaWZpY2F0aW9uUmVwb3NpdG9yeT8uc2F2ZShzcGVjaWZpY2F0aW9uKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3A7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJzcGVjaWZpY2F0aW9uIFNhdmUgRmFpbGVkIFwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRCeUlkKGlkOiBudW1iZXIpOiBQcm9taXNlPFNwZWNpZmljYXRpb24gfCBudWxsIHwgdW5kZWZpbmVkPiB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBzcGVjaWZpY2F0aW9uID0gYXdhaXQgdGhpcy5zcGVjaWZpY2F0aW9uUmVwb3NpdG9yeT8uZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBpZCB9IH0pO1xyXG4gICAgICByZXR1cm4gc3BlY2lmaWNhdGlvbjtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkVycm9yIGdldHNwZWNpZmljYXRpb25CeUlEIFwiLCBlcnIpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEFsbCgpOiBQcm9taXNlPFNwZWNpZmljYXRpb25bXSB8IG51bGwgfCB1bmRlZmluZWQ+IHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHNwZWNpZmljYXRpb24gPSBhd2FpdCB0aGlzLnNwZWNpZmljYXRpb25SZXBvc2l0b3J5Py5maW5kKCk7XHJcbiAgICAgIHJldHVybiBzcGVjaWZpY2F0aW9uO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKGBFcnJvciBBbGwgc3BlY2lmaWNhdGlvbiBgLCBlcnIpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHVwZGF0ZShzcGVjaWZpY2F0aW9uOiBQYXJ0aWFsPFNwZWNpZmljYXRpb24+KTogUHJvbWlzZTxVcGRhdGVSZXN1bHQgfCBudWxsIHwgdW5kZWZpbmVkPiB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICBpZiAoIWVzSXNFbXB0eShzcGVjaWZpY2F0aW9uKSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZXNwZWNpZmljYXRpb24gPSBhd2FpdCB0aGlzLnNwZWNpZmljYXRpb25SZXBvc2l0b3J5Py51cGRhdGUoXHJcbiAgICAgICAgICB7IGlkOiBzcGVjaWZpY2F0aW9uLmlkIH0sXHJcbiAgICAgICAgICBzcGVjaWZpY2F0aW9uXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHVwZGF0ZXNwZWNpZmljYXRpb247XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoYFVwZGF0ZSBzcGVjaWZpY2F0aW9uIEVycm9yLCBgLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgYXN5bmMgZGVsZXRlKGlkOiBudW1iZXIpIHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHNwZWNpZmljYXRpb25zID0gYXdhaXQgdGhpcy5zcGVjaWZpY2F0aW9uUmVwb3NpdG9yeT8uZGVsZXRlKHsgaWQ6IGlkIH0pO1xyXG4gICAgICByZXR1cm4gc3BlY2lmaWNhdGlvbnM7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJFcnJvciBBbGwgc3BlY2lmaWNhdGlvbiBcIiwgZXJyKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc3BlY2lmaWNhdGlvblNlcnZpY2UgPSBuZXcgU3BlY2lmaWNhdGlvblNlcnZpY2UoKTtcclxuIl19