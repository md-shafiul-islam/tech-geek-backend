"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.specKeyService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const writeLog_1 = require("../logger/writeLog");
const SpecKey_1 = require("../model/SpecKey");
const esHelper_1 = require("../utils/esHelper");
class SpecKeyService {
    specKeyRepository = null;
    initRepository() {
        if (this.specKeyRepository === null) {
            this.specKeyRepository = AppDataSource_1.AppDataSource.getRepository(SpecKey_1.SpecKey);
        }
    }
    async save(specKey) {
        this.initRepository();
        if (specKey) {
            try {
                const resp = await this.specKeyRepository?.save(specKey);
                return resp;
            }
            catch (error) {
                writeLog_1.apiWriteLog.error("specKey Save Failed ");
            }
        }
        return null;
    }
    async getById(id) {
        this.initRepository();
        try {
            const specKey = await this.specKeyRepository?.findOne({
                where: { id: id },
            });
            return specKey;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error getspecKeyByID ", err);
            return null;
        }
    }
    async getAll() {
        this.initRepository();
        try {
            const specKey = await this.specKeyRepository?.find();
            return specKey;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error(`Error All specKey `, err);
            return null;
        }
    }
    async update(specKey) {
        this.initRepository();
        if (!(0, esHelper_1.esIsEmpty)(specKey)) {
            try {
                const updatespecKey = await this.specKeyRepository?.update({ id: specKey.id }, specKey);
                return updatespecKey;
            }
            catch (error) {
                writeLog_1.apiWriteLog.error(`Update specKey Error, `, error);
                return null;
            }
        }
        return null;
    }
    async delete(id) {
        this.initRepository();
        try {
            const specKeys = await this.specKeyRepository?.delete({ id: id });
            return specKeys;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error All specKey ", err);
            return null;
        }
    }
}
exports.specKeyService = new SpecKeyService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BlY2tleS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2Uvc3BlY2tleS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDZEQUEwRDtBQUMxRCxpREFBaUQ7QUFDakQsOENBQTJDO0FBQzNDLGdEQUE4QztBQUU5QyxNQUFNLGNBQWM7SUFDVixpQkFBaUIsR0FBK0IsSUFBSSxDQUFDO0lBRXJELGNBQWM7UUFDcEIsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssSUFBSSxFQUFFO1lBQ25DLElBQUksQ0FBQyxpQkFBaUIsR0FBRyw2QkFBYSxDQUFDLGFBQWEsQ0FBQyxpQkFBTyxDQUFDLENBQUM7U0FDL0Q7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUF5QjtRQUNsQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxPQUFPLEVBQUU7WUFDWCxJQUFJO2dCQUNGLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFFekQsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLHNCQUFXLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7YUFDM0M7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBVTtRQUN0QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSTtZQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQztnQkFDcEQsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTthQUNsQixDQUFDLENBQUM7WUFDSCxPQUFPLE9BQU8sQ0FBQztTQUNoQjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osc0JBQVcsQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDaEQsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTTtRQUNWLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJO1lBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFDckQsT0FBTyxPQUFPLENBQUM7U0FDaEI7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLHNCQUFXLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzdDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FDVixPQUF5QjtRQUV6QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUEsb0JBQVMsRUFBQyxPQUFPLENBQUMsRUFBRTtZQUN2QixJQUFJO2dCQUNGLE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FDeEQsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUNsQixPQUFPLENBQ1IsQ0FBQztnQkFFRixPQUFPLGFBQWEsQ0FBQzthQUN0QjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLHNCQUFXLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNuRCxPQUFPLElBQUksQ0FBQzthQUNiO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQVU7UUFDckIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUk7WUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNsRSxPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osc0JBQVcsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDN0MsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7Q0FDRjtBQUVZLFFBQUEsY0FBYyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXBvc2l0b3J5LCBVcGRhdGVSZXN1bHQgfSBmcm9tIFwidHlwZW9ybVwiO1xyXG5pbXBvcnQgeyBBcHBEYXRhU291cmNlIH0gZnJvbSBcIi4uL2RhdGFiYXNlL0FwcERhdGFTb3VyY2VcIjtcclxuaW1wb3J0IHsgYXBpV3JpdGVMb2cgfSBmcm9tIFwiLi4vbG9nZ2VyL3dyaXRlTG9nXCI7XHJcbmltcG9ydCB7IFNwZWNLZXkgfSBmcm9tIFwiLi4vbW9kZWwvU3BlY0tleVwiO1xyXG5pbXBvcnQgeyBlc0lzRW1wdHkgfSBmcm9tIFwiLi4vdXRpbHMvZXNIZWxwZXJcIjtcclxuXHJcbmNsYXNzIFNwZWNLZXlTZXJ2aWNlIHtcclxuICBwcml2YXRlIHNwZWNLZXlSZXBvc2l0b3J5OiBSZXBvc2l0b3J5PFNwZWNLZXk+IHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgaW5pdFJlcG9zaXRvcnkoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5zcGVjS2V5UmVwb3NpdG9yeSA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnNwZWNLZXlSZXBvc2l0b3J5ID0gQXBwRGF0YVNvdXJjZS5nZXRSZXBvc2l0b3J5KFNwZWNLZXkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2F2ZShzcGVjS2V5OiBQYXJ0aWFsPFNwZWNLZXk+KSB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICBpZiAoc3BlY0tleSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLnNwZWNLZXlSZXBvc2l0b3J5Py5zYXZlKHNwZWNLZXkpO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzcDtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBhcGlXcml0ZUxvZy5lcnJvcihcInNwZWNLZXkgU2F2ZSBGYWlsZWQgXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEJ5SWQoaWQ6IG51bWJlcik6IFByb21pc2U8U3BlY0tleSB8IG51bGwgfCB1bmRlZmluZWQ+IHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHNwZWNLZXkgPSBhd2FpdCB0aGlzLnNwZWNLZXlSZXBvc2l0b3J5Py5maW5kT25lKHtcclxuICAgICAgICB3aGVyZTogeyBpZDogaWQgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBzcGVjS2V5O1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiRXJyb3IgZ2V0c3BlY0tleUJ5SUQgXCIsIGVycik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QWxsKCk6IFByb21pc2U8U3BlY0tleVtdIHwgbnVsbCB8IHVuZGVmaW5lZD4ge1xyXG4gICAgdGhpcy5pbml0UmVwb3NpdG9yeSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3Qgc3BlY0tleSA9IGF3YWl0IHRoaXMuc3BlY0tleVJlcG9zaXRvcnk/LmZpbmQoKTtcclxuICAgICAgcmV0dXJuIHNwZWNLZXk7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoYEVycm9yIEFsbCBzcGVjS2V5IGAsIGVycik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgdXBkYXRlKFxyXG4gICAgc3BlY0tleTogUGFydGlhbDxTcGVjS2V5PlxyXG4gICk6IFByb21pc2U8VXBkYXRlUmVzdWx0IHwgbnVsbCB8IHVuZGVmaW5lZD4ge1xyXG4gICAgdGhpcy5pbml0UmVwb3NpdG9yeSgpO1xyXG4gICAgaWYgKCFlc0lzRW1wdHkoc3BlY0tleSkpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB1cGRhdGVzcGVjS2V5ID0gYXdhaXQgdGhpcy5zcGVjS2V5UmVwb3NpdG9yeT8udXBkYXRlKFxyXG4gICAgICAgICAgeyBpZDogc3BlY0tleS5pZCB9LFxyXG4gICAgICAgICAgc3BlY0tleVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiB1cGRhdGVzcGVjS2V5O1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGFwaVdyaXRlTG9nLmVycm9yKGBVcGRhdGUgc3BlY0tleSBFcnJvciwgYCwgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIGFzeW5jIGRlbGV0ZShpZDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBzcGVjS2V5cyA9IGF3YWl0IHRoaXMuc3BlY0tleVJlcG9zaXRvcnk/LmRlbGV0ZSh7IGlkOiBpZCB9KTtcclxuICAgICAgcmV0dXJuIHNwZWNLZXlzO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiRXJyb3IgQWxsIHNwZWNLZXkgXCIsIGVycik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHNwZWNLZXlTZXJ2aWNlID0gbmV3IFNwZWNLZXlTZXJ2aWNlKCk7XHJcbiJdfQ==