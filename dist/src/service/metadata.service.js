"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadataService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const writeLog_1 = require("../logger/writeLog");
const MetaData_1 = require("../model/MetaData");
const esHelper_1 = require("../utils/esHelper");
class MetadataService {
    metadataRepository = null;
    initRepository() {
        if (this.metadataRepository === null) {
            this.metadataRepository = AppDataSource_1.AppDataSource.getRepository(MetaData_1.MetaDeta);
        }
    }
    async save(metadata) {
        this.initRepository();
        if (metadata) {
            try {
                const resp = await this.metadataRepository?.save(metadata);
                return resp;
            }
            catch (error) {
                writeLog_1.apiWriteLog.error("metadata Save Failed ");
            }
        }
        return null;
    }
    async getById(id) {
        this.initRepository();
        try {
            const metadata = await this.metadataRepository?.findOne({ where: { id: id } });
            return metadata;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error getmetadataByID ", err);
            return null;
        }
    }
    async getAll() {
        this.initRepository();
        try {
            const metadatas = await this.metadataRepository?.find();
            return metadatas;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error(`Error All metadata `, err);
            return null;
        }
    }
    async update(metadata) {
        this.initRepository();
        if (!(0, esHelper_1.esIsEmpty)(metadata)) {
            try {
                const updatemetadata = await this.metadataRepository?.update({ id: metadata.id }, metadata);
                return updatemetadata;
            }
            catch (error) {
                writeLog_1.apiWriteLog.error(`Update metadata Error, `, error);
                return null;
            }
        }
        return null;
    }
    async delete(id) {
        this.initRepository();
        try {
            const metadatas = await this.metadataRepository?.delete({ id: id });
            return metadatas;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error All metadata ", err);
            return null;
        }
    }
}
exports.metadataService = new MetadataService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL21ldGFkYXRhLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNkRBQTBEO0FBQzFELGlEQUFpRDtBQUNqRCxnREFBNkM7QUFDN0MsZ0RBQThDO0FBRTlDLE1BQU0sZUFBZTtJQUNYLGtCQUFrQixHQUFnQyxJQUFJLENBQUM7SUFFdkQsY0FBYztRQUNwQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxJQUFJLEVBQUU7WUFDcEMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLDZCQUFhLENBQUMsYUFBYSxDQUFDLG1CQUFRLENBQUMsQ0FBQztTQUNqRTtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQTJCO1FBQ3BDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUk7Z0JBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUUzRCxPQUFPLElBQUksQ0FBQzthQUNiO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2Qsc0JBQVcsQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQzthQUM1QztTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFVO1FBQ3RCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJO1lBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUMvRSxPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osc0JBQVcsQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDakQsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTTtRQUNWLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJO1lBQ0YsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFDeEQsT0FBTyxTQUFTLENBQUM7U0FDbEI7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLHNCQUFXLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUEyQjtRQUN0QyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLElBQUEsb0JBQVMsRUFBQyxRQUFRLENBQUMsRUFBRTtZQUN4QixJQUFJO2dCQUNGLE1BQU0sY0FBYyxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FDMUQsRUFBRSxFQUFFLEVBQUUsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUNuQixRQUFRLENBQ1QsQ0FBQztnQkFFRixPQUFPLGNBQWMsQ0FBQzthQUN2QjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLHNCQUFXLENBQUMsS0FBSyxDQUFDLHlCQUF5QixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNwRCxPQUFPLElBQUksQ0FBQzthQUNiO1NBQ0Y7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQVU7UUFDckIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUk7WUFDRixNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNwRSxPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osc0JBQVcsQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDOUMsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7Q0FDRjtBQUVZLFFBQUEsZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXBvc2l0b3J5LCBVcGRhdGVSZXN1bHQgfSBmcm9tIFwidHlwZW9ybVwiO1xyXG5pbXBvcnQgeyBBcHBEYXRhU291cmNlIH0gZnJvbSBcIi4uL2RhdGFiYXNlL0FwcERhdGFTb3VyY2VcIjtcclxuaW1wb3J0IHsgYXBpV3JpdGVMb2cgfSBmcm9tIFwiLi4vbG9nZ2VyL3dyaXRlTG9nXCI7XHJcbmltcG9ydCB7IE1ldGFEZXRhIH0gZnJvbSBcIi4uL21vZGVsL01ldGFEYXRhXCI7XHJcbmltcG9ydCB7IGVzSXNFbXB0eSB9IGZyb20gXCIuLi91dGlscy9lc0hlbHBlclwiO1xyXG5cclxuY2xhc3MgTWV0YWRhdGFTZXJ2aWNlIHtcclxuICBwcml2YXRlIG1ldGFkYXRhUmVwb3NpdG9yeTogUmVwb3NpdG9yeTxNZXRhRGV0YT4gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBpbml0UmVwb3NpdG9yeSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm1ldGFkYXRhUmVwb3NpdG9yeSA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLm1ldGFkYXRhUmVwb3NpdG9yeSA9IEFwcERhdGFTb3VyY2UuZ2V0UmVwb3NpdG9yeShNZXRhRGV0YSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBzYXZlKG1ldGFkYXRhOiBQYXJ0aWFsPE1ldGFEZXRhPikge1xyXG4gICAgdGhpcy5pbml0UmVwb3NpdG9yeSgpO1xyXG4gICAgaWYgKG1ldGFkYXRhKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IHRoaXMubWV0YWRhdGFSZXBvc2l0b3J5Py5zYXZlKG1ldGFkYXRhKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3A7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJtZXRhZGF0YSBTYXZlIEZhaWxlZCBcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QnlJZChpZDogbnVtYmVyKTogUHJvbWlzZTxNZXRhRGV0YSB8IG51bGwgfCB1bmRlZmluZWQ+IHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IG1ldGFkYXRhID0gYXdhaXQgdGhpcy5tZXRhZGF0YVJlcG9zaXRvcnk/LmZpbmRPbmUoeyB3aGVyZTogeyBpZDogaWQgfSB9KTtcclxuICAgICAgcmV0dXJuIG1ldGFkYXRhO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiRXJyb3IgZ2V0bWV0YWRhdGFCeUlEIFwiLCBlcnIpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEFsbCgpOiBQcm9taXNlPE1ldGFEZXRhW10gfCBudWxsIHwgdW5kZWZpbmVkPiB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBtZXRhZGF0YXMgPSBhd2FpdCB0aGlzLm1ldGFkYXRhUmVwb3NpdG9yeT8uZmluZCgpO1xyXG4gICAgICByZXR1cm4gbWV0YWRhdGFzO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKGBFcnJvciBBbGwgbWV0YWRhdGEgYCwgZXJyKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyB1cGRhdGUobWV0YWRhdGE6IFBhcnRpYWw8TWV0YURldGE+KTogUHJvbWlzZTxVcGRhdGVSZXN1bHQgfCBudWxsIHwgdW5kZWZpbmVkPiB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICBpZiAoIWVzSXNFbXB0eShtZXRhZGF0YSkpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB1cGRhdGVtZXRhZGF0YSA9IGF3YWl0IHRoaXMubWV0YWRhdGFSZXBvc2l0b3J5Py51cGRhdGUoXHJcbiAgICAgICAgICB7IGlkOiBtZXRhZGF0YS5pZCB9LFxyXG4gICAgICAgICAgbWV0YWRhdGFcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gdXBkYXRlbWV0YWRhdGE7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoYFVwZGF0ZSBtZXRhZGF0YSBFcnJvciwgYCwgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIGFzeW5jIGRlbGV0ZShpZDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBtZXRhZGF0YXMgPSBhd2FpdCB0aGlzLm1ldGFkYXRhUmVwb3NpdG9yeT8uZGVsZXRlKHsgaWQ6IGlkIH0pO1xyXG4gICAgICByZXR1cm4gbWV0YWRhdGFzO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiRXJyb3IgQWxsIG1ldGFkYXRhIFwiLCBlcnIpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBtZXRhZGF0YVNlcnZpY2UgPSBuZXcgTWV0YWRhdGFTZXJ2aWNlKCk7XHJcbiJdfQ==