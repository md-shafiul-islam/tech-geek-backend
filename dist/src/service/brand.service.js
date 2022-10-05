"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const writeLog_1 = require("../logger/writeLog");
const Brand_1 = require("../model/Brand");
const esHelper_1 = require("../utils/esHelper");
class BrandService {
    brandRepository = null;
    initRepository() {
        if (this.brandRepository === null) {
            this.brandRepository = AppDataSource_1.AppDataSource.getRepository(Brand_1.Brand);
        }
    }
    async getCount() {
        this.initRepository();
        try {
            const count = await this.brandRepository?.count();
            return count;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error Brand Count Error ", err);
            return 0;
        }
    }
    async getBrandByName(name) {
        this.initRepository();
        try {
            const brand = await this.brandRepository?.findOne({
                where: { name: name },
            });
            return brand;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error getBrandByName ", err);
            return null;
        }
    }
    async save(brand) {
        this.initRepository();
        if (brand) {
            try {
                const resp = await this.brandRepository?.save(brand);
                return resp;
            }
            catch (error) {
                writeLog_1.apiWriteLog.error("Brand Save Failed ");
            }
        }
        return null;
    }
    async getBrandById(id) {
        this.initRepository();
        try {
            const brand = await this.brandRepository?.findOne({ where: { id: id } });
            return brand;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error getBrandByID ", err);
            return null;
        }
    }
    async getAllBrand() {
        this.initRepository();
        try {
            const brands = await this.brandRepository?.find({
                order: { name: "ASC" },
            });
            return brands;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error(`Error All Brand `, err);
            return null;
        }
    }
    async updateBrand(brand) {
        this.initRepository();
        if (!(0, esHelper_1.esIsEmpty)(brand)) {
            let id = 0;
            id = !(0, esHelper_1.esIsEmpty)(brand.id) ? Number(brand.id) : 0;
            if (id > 0) {
                try {
                    const dbBrand = await this.brandRepository?.findOneBy({ id });
                    if (dbBrand !== null && dbBrand !== undefined) {
                        dbBrand.description = !(0, esHelper_1.esIsEmpty)(brand.description)
                            ? brand.description
                            : dbBrand.description;
                        dbBrand.logoUrl = !(0, esHelper_1.esIsEmpty)(brand.logoUrl)
                            ? brand.logoUrl
                            : dbBrand.logoUrl;
                        dbBrand.name = !(0, esHelper_1.esIsEmpty)(brand.name) ? brand.name : dbBrand?.name;
                        dbBrand.tagLine = !(0, esHelper_1.esIsEmpty)(brand.tagLine)
                            ? brand.tagLine
                            : dbBrand.tagLine;
                        dbBrand.website = !(0, esHelper_1.esIsEmpty)(brand.website)
                            ? brand.website
                            : dbBrand.website;
                        const updateBrand = await this.brandRepository?.save(dbBrand);
                        return updateBrand;
                    }
                }
                catch (error) {
                    writeLog_1.apiWriteLog.error(`Update Brand Error, `, error);
                    return null;
                }
            }
        }
        return null;
    }
    async deleteBrand(id) {
        this.initRepository();
        try {
            const brands = await this.brandRepository?.delete({ id: id });
            return brands;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error All Brand ", err);
            return null;
        }
    }
}
exports.brandService = new BrandService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJhbmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL2JyYW5kLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsNkRBQTBEO0FBQzFELGlEQUFpRDtBQUNqRCwwQ0FBdUM7QUFDdkMsZ0RBQThDO0FBRTlDLE1BQU0sWUFBWTtJQUVSLGVBQWUsR0FBNkIsSUFBSSxDQUFDO0lBRWpELGNBQWM7UUFDcEIsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLElBQUksRUFBRTtZQUNqQyxJQUFJLENBQUMsZUFBZSxHQUFHLDZCQUFhLENBQUMsYUFBYSxDQUFDLGFBQUssQ0FBQyxDQUFDO1NBQzNEO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFRO1FBQ1osSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUk7WUFDRixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsS0FBSyxFQUFFLENBQUM7WUFDbEQsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osc0JBQVcsQ0FBQyxLQUFLLENBQUMsMEJBQTBCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbkQsT0FBTyxDQUFDLENBQUM7U0FDVjtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYyxDQUFDLElBQVk7UUFDL0IsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUk7WUFDRixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDO2dCQUNoRCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO2FBQ3RCLENBQUMsQ0FBQztZQUNILE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLHNCQUFXLENBQUMsS0FBSyxDQUFDLHVCQUF1QixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2hE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IH0gZnJvbSBcInFzXCI7XHJcbmltcG9ydCB7IFJlcG9zaXRvcnkgfSBmcm9tIFwidHlwZW9ybVwiO1xyXG5pbXBvcnQgeyBBcHBEYXRhU291cmNlIH0gZnJvbSBcIi4uL2RhdGFiYXNlL0FwcERhdGFTb3VyY2VcIjtcclxuaW1wb3J0IHsgYXBpV3JpdGVMb2cgfSBmcm9tIFwiLi4vbG9nZ2VyL3dyaXRlTG9nXCI7XHJcbmltcG9ydCB7IEJyYW5kIH0gZnJvbSBcIi4uL21vZGVsL0JyYW5kXCI7XHJcbmltcG9ydCB7IGVzSXNFbXB0eSB9IGZyb20gXCIuLi91dGlscy9lc0hlbHBlclwiO1xyXG5cclxuY2xhc3MgQnJhbmRTZXJ2aWNlIHtcclxuICBcclxuICBwcml2YXRlIGJyYW5kUmVwb3NpdG9yeTogUmVwb3NpdG9yeTxCcmFuZD4gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBpbml0UmVwb3NpdG9yeSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmJyYW5kUmVwb3NpdG9yeSA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmJyYW5kUmVwb3NpdG9yeSA9IEFwcERhdGFTb3VyY2UuZ2V0UmVwb3NpdG9yeShCcmFuZCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRDb3VudCgpIHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgdGhpcy5icmFuZFJlcG9zaXRvcnk/LmNvdW50KCk7XHJcbiAgICAgIHJldHVybiBjb3VudDtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkVycm9yIEJyYW5kIENvdW50IEVycm9yIFwiLCBlcnIpO1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEJyYW5kQnlOYW1lKG5hbWU6IHN0cmluZykge1xyXG4gICAgdGhpcy5pbml0UmVwb3NpdG9yeSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgYnJhbmQgPSBhd2FpdCB0aGlzLmJyYW5kUmVwb3NpdG9yeT8uZmluZE9uZSh7XHJcbiAgICAgICAgd2hlcmU6IHsgbmFtZTogbmFtZSB9LFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGJyYW5kO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiRXJyb3IgZ2V0QnJhbmRCeU5hbWUgXCIsIGVycik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2F2ZShicmFuZDogUGFydGlhbDxCcmFuZD4pIHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIGlmIChicmFuZCkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLmJyYW5kUmVwb3NpdG9yeT8uc2F2ZShicmFuZCk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXNwO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiQnJhbmQgU2F2ZSBGYWlsZWQgXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEJyYW5kQnlJZChpZDogbnVtYmVyKTogUHJvbWlzZTxCcmFuZCB8IG51bGwgfCB1bmRlZmluZWQ+IHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGJyYW5kID0gYXdhaXQgdGhpcy5icmFuZFJlcG9zaXRvcnk/LmZpbmRPbmUoeyB3aGVyZTogeyBpZDogaWQgfSB9KTtcclxuICAgICAgcmV0dXJuIGJyYW5kO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiRXJyb3IgZ2V0QnJhbmRCeUlEIFwiLCBlcnIpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEFsbEJyYW5kKCk6IFByb21pc2U8QnJhbmRbXSB8IG51bGwgfCB1bmRlZmluZWQ+IHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGJyYW5kcyA9IGF3YWl0IHRoaXMuYnJhbmRSZXBvc2l0b3J5Py5maW5kKHtcclxuICAgICAgICBvcmRlcjogeyBuYW1lOiBcIkFTQ1wiIH0sXHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm4gYnJhbmRzO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKGBFcnJvciBBbGwgQnJhbmQgYCwgZXJyKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyB1cGRhdGVCcmFuZChicmFuZDogQnJhbmQpOiBQcm9taXNlPEJyYW5kIHwgbnVsbCB8IHVuZGVmaW5lZD4ge1xyXG4gICAgdGhpcy5pbml0UmVwb3NpdG9yeSgpO1xyXG4gICAgaWYgKCFlc0lzRW1wdHkoYnJhbmQpKSB7XHJcbiAgICAgIGxldCBpZDogbnVtYmVyID0gMDtcclxuICAgICAgaWQgPSAhZXNJc0VtcHR5KGJyYW5kLmlkKSA/IE51bWJlcihicmFuZC5pZCkgOiAwO1xyXG4gICAgICBpZiAoaWQgPiAwKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIGNvbnN0IGRiQnJhbmQgPSBhd2FpdCB0aGlzLmJyYW5kUmVwb3NpdG9yeT8uZmluZE9uZUJ5KHsgaWQgfSk7XHJcbiAgICAgICAgICBpZiAoZGJCcmFuZCAhPT0gbnVsbCAmJiBkYkJyYW5kICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgZGJCcmFuZC5kZXNjcmlwdGlvbiA9ICFlc0lzRW1wdHkoYnJhbmQuZGVzY3JpcHRpb24pXHJcbiAgICAgICAgICAgICAgPyBicmFuZC5kZXNjcmlwdGlvblxyXG4gICAgICAgICAgICAgIDogZGJCcmFuZC5kZXNjcmlwdGlvbjtcclxuICAgICAgICAgICAgZGJCcmFuZC5sb2dvVXJsID0gIWVzSXNFbXB0eShicmFuZC5sb2dvVXJsKVxyXG4gICAgICAgICAgICAgID8gYnJhbmQubG9nb1VybFxyXG4gICAgICAgICAgICAgIDogZGJCcmFuZC5sb2dvVXJsO1xyXG4gICAgICAgICAgICBkYkJyYW5kLm5hbWUgPSAhZXNJc0VtcHR5KGJyYW5kLm5hbWUpID8gYnJhbmQubmFtZSA6IGRiQnJhbmQ/Lm5hbWU7XHJcbiAgICAgICAgICAgIGRiQnJhbmQudGFnTGluZSA9ICFlc0lzRW1wdHkoYnJhbmQudGFnTGluZSlcclxuICAgICAgICAgICAgICA/IGJyYW5kLnRhZ0xpbmVcclxuICAgICAgICAgICAgICA6IGRiQnJhbmQudGFnTGluZTtcclxuICAgICAgICAgICAgZGJCcmFuZC53ZWJzaXRlID0gIWVzSXNFbXB0eShicmFuZC53ZWJzaXRlKVxyXG4gICAgICAgICAgICAgID8gYnJhbmQud2Vic2l0ZVxyXG4gICAgICAgICAgICAgIDogZGJCcmFuZC53ZWJzaXRlO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdXBkYXRlQnJhbmQgPSBhd2FpdCB0aGlzLmJyYW5kUmVwb3NpdG9yeT8uc2F2ZShkYkJyYW5kKTtcclxuICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZUJyYW5kO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBhcGlXcml0ZUxvZy5lcnJvcihgVXBkYXRlIEJyYW5kIEVycm9yLCBgLCBlcnJvcik7XHJcbiAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICBhc3luYyBkZWxldGVCcmFuZChpZDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBicmFuZHMgPSBhd2FpdCB0aGlzLmJyYW5kUmVwb3NpdG9yeT8uZGVsZXRlKHsgaWQ6IGlkIH0pO1xyXG4gICAgICByZXR1cm4gYnJhbmRzO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiRXJyb3IgQWxsIEJyYW5kIFwiLCBlcnIpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBicmFuZFNlcnZpY2UgPSBuZXcgQnJhbmRTZXJ2aWNlKCk7XHJcbiJdfQ==