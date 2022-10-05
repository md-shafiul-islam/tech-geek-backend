"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingKeyServices = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const writeLog_1 = require("../logger/writeLog");
const RateKey_1 = require("../model/RateKey");
class RatingKeyService {
    ratingKeyRepository;
    initRepository() {
        this.ratingKeyRepository = AppDataSource_1.AppDataSource.getRepository(RateKey_1.RateKey);
    }
    async getById(id) {
        this.initRepository();
        try {
            const ratingKey = await this.ratingKeyRepository?.findOne({
                where: { id },
            });
            return ratingKey;
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Rating Key Error, ", error);
        }
        return null;
    }
    async getAll() {
        this.initRepository();
        try {
            const ratingKeys = await this.ratingKeyRepository?.find();
            return ratingKeys;
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Rating All Key Error, ", error);
        }
        return null;
    }
    async save(ratingKey) {
        this.initRepository();
        try {
            const ratingKeys = await this.ratingKeyRepository?.save(ratingKey);
            return ratingKeys;
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Rating Key Save Error, ", error);
        }
        return null;
    }
    async update(rKey) {
        try {
            if (rKey) {
                const ratingKey = await this.ratingKeyRepository?.update({ id: rKey.id }, rKey);
                return ratingKey;
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Rating Key Update Error, ", error);
        }
        return null;
    }
    async delete(id) {
        try {
            if (id > 0) {
                const ratingKey = await this.ratingKeyRepository?.delete({ id: id });
                return ratingKey;
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Rating Key Update Error, ", error);
        }
        return null;
    }
}
exports.ratingKeyServices = new RatingKeyService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5nLmtleS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2UvcmF0aW5nLmtleS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDZEQUEwRDtBQUMxRCxpREFBaUQ7QUFDakQsOENBQTJDO0FBRTNDLE1BQU0sZ0JBQWdCO0lBQ1osbUJBQW1CLENBQTZCO0lBRWhELGNBQWM7UUFDcEIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLDZCQUFhLENBQUMsYUFBYSxDQUFDLGlCQUFPLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFVO1FBQ3RCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV0QixJQUFJO1lBQ0YsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsT0FBTyxDQUFDO2dCQUN4RCxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUU7YUFDZCxDQUFDLENBQUM7WUFDSCxPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Qsc0JBQVcsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDaEQ7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTTtRQUNWLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUV0QixJQUFJO1lBQ0YsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFDMUQsT0FBTyxVQUFVLENBQUM7U0FDbkI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLHNCQUFXLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3BEO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFrQjtRQUMzQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFFdEIsSUFBSTtZQUNGLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuRSxPQUFPLFVBQVUsQ0FBQztTQUNuQjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Qsc0JBQVcsQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDckQ7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLElBQWE7UUFDeEIsSUFBSTtZQUNGLElBQUksSUFBSSxFQUFFO2dCQUNSLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FDdEQsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUNmLElBQUksQ0FDTCxDQUFDO2dCQUNGLE9BQU8sU0FBUyxDQUFDO2FBQ2xCO1NBQ0Y7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLHNCQUFXLENBQUMsS0FBSyxDQUFDLDJCQUEyQixFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3ZEO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFVO1FBQ3JCLElBQUk7WUFDQSxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUc7Z0JBQ1gsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsTUFBTSxDQUFDLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxDQUFDLENBQUM7Z0JBQ2xFLE9BQU8sU0FBUyxDQUFDO2FBQ2xCO1NBQ0Y7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLHNCQUFXLENBQUMsS0FBSyxDQUFDLDJCQUEyQixFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3ZEO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNGO0FBRVksUUFBQSxpQkFBaUIsR0FBRyxJQUFJLGdCQUFnQixFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXBvc2l0b3J5IH0gZnJvbSBcInR5cGVvcm1cIjtcclxuaW1wb3J0IHsgQXBwRGF0YVNvdXJjZSB9IGZyb20gXCIuLi9kYXRhYmFzZS9BcHBEYXRhU291cmNlXCI7XHJcbmltcG9ydCB7IGFwaVdyaXRlTG9nIH0gZnJvbSBcIi4uL2xvZ2dlci93cml0ZUxvZ1wiO1xyXG5pbXBvcnQgeyBSYXRlS2V5IH0gZnJvbSBcIi4uL21vZGVsL1JhdGVLZXlcIjtcclxuXHJcbmNsYXNzIFJhdGluZ0tleVNlcnZpY2Uge1xyXG4gIHByaXZhdGUgcmF0aW5nS2V5UmVwb3NpdG9yeTogUmVwb3NpdG9yeTxSYXRlS2V5PiB8IG51bGw7XHJcblxyXG4gIHByaXZhdGUgaW5pdFJlcG9zaXRvcnkoKSB7XHJcbiAgICB0aGlzLnJhdGluZ0tleVJlcG9zaXRvcnkgPSBBcHBEYXRhU291cmNlLmdldFJlcG9zaXRvcnkoUmF0ZUtleSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRCeUlkKGlkOiBudW1iZXIpIHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCByYXRpbmdLZXkgPSBhd2FpdCB0aGlzLnJhdGluZ0tleVJlcG9zaXRvcnk/LmZpbmRPbmUoe1xyXG4gICAgICAgIHdoZXJlOiB7IGlkIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gcmF0aW5nS2V5O1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJSYXRpbmcgS2V5IEVycm9yLCBcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRBbGwoKSB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmF0aW5nS2V5cyA9IGF3YWl0IHRoaXMucmF0aW5nS2V5UmVwb3NpdG9yeT8uZmluZCgpO1xyXG4gICAgICByZXR1cm4gcmF0aW5nS2V5cztcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiUmF0aW5nIEFsbCBLZXkgRXJyb3IsIFwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGFzeW5jIHNhdmUocmF0aW5nS2V5OiBSYXRlS2V5KSB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcmF0aW5nS2V5cyA9IGF3YWl0IHRoaXMucmF0aW5nS2V5UmVwb3NpdG9yeT8uc2F2ZShyYXRpbmdLZXkpO1xyXG4gICAgICByZXR1cm4gcmF0aW5nS2V5cztcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiUmF0aW5nIEtleSBTYXZlIEVycm9yLCBcIiwgZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBhc3luYyB1cGRhdGUocktleTogUmF0ZUtleSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKHJLZXkpIHtcclxuICAgICAgICBjb25zdCByYXRpbmdLZXkgPSBhd2FpdCB0aGlzLnJhdGluZ0tleVJlcG9zaXRvcnk/LnVwZGF0ZShcclxuICAgICAgICAgIHsgaWQ6IHJLZXkuaWQgfSxcclxuICAgICAgICAgIHJLZXlcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiByYXRpbmdLZXk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiUmF0aW5nIEtleSBVcGRhdGUgRXJyb3IsIFwiLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGFzeW5jIGRlbGV0ZShpZDogbnVtYmVyKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGlmIChpZCA+IDAgKSB7XHJcbiAgICAgICAgICBjb25zdCByYXRpbmdLZXkgPSBhd2FpdCB0aGlzLnJhdGluZ0tleVJlcG9zaXRvcnk/LmRlbGV0ZSh7aWQ6aWR9KTtcclxuICAgICAgICAgIHJldHVybiByYXRpbmdLZXk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiUmF0aW5nIEtleSBVcGRhdGUgRXJyb3IsIFwiLCBlcnJvcik7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmF0aW5nS2V5U2VydmljZXMgPSBuZXcgUmF0aW5nS2V5U2VydmljZSgpO1xyXG4iXX0=