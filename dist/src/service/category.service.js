"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const writeLog_1 = require("../logger/writeLog");
const Category_1 = require("../model/Category");
const esHelper_1 = require("../utils/esHelper");
class CategoryService {
    categoryRepository = null;
    categoryTreeRepository = null;
    initRepository() {
        if (this.categoryRepository === null) {
            this.categoryRepository = AppDataSource_1.AppDataSource.getRepository(Category_1.Category);
        }
        if (this.categoryTreeRepository === null) {
            this.categoryTreeRepository = AppDataSource_1.AppDataSource.getTreeRepository(Category_1.Category);
        }
    }
    async save(category) {
        this.initRepository();
        if (category) {
            try {
                const resp = await this.categoryRepository?.save(category);
                return resp;
            }
            catch (error) {
                writeLog_1.apiWriteLog.error("category Save Failed ");
            }
        }
        return null;
    }
    async getCategoryById(id) {
        this.initRepository();
        try {
            const category = await this.categoryRepository?.findOne({
                where: { id: id },
            });
            return category;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error getcategoryByID ", err);
            return null;
        }
    }
    async getAllCategoryAsStringArray() {
        this.initRepository();
        try {
            const categories = await this.categoryRepository?.find();
            const catStr = [];
            if (categories) {
                categories.forEach((item) => {
                    catStr.push(item.key);
                });
            }
            return catStr;
        }
        catch (error) {
            console.log("Categories String not found ", error);
            return null;
        }
    }
    async getCategoryTree() {
        this.initRepository();
        try {
            const categories = await this.categoryTreeRepository?.findTrees();
            return categories;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error get Tree Categories, ", err);
            return null;
        }
    }
    async getAllCategory() {
        this.initRepository();
        try {
            const categories = await this.categoryRepository?.find();
            return categories;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error(`Error All category `, err);
            return null;
        }
    }
    async updateCategory(name, description, id, parent) {
        this.initRepository();
        try {
            const dbCategory = await this.categoryRepository?.findOneBy({ id });
            if (dbCategory !== null && dbCategory !== undefined) {
                writeLog_1.apiWriteLog.info("Category Update ... ");
                // let name: string = "";
                // let description: string = "";
                if (!(0, esHelper_1.esIsEmpty)(description)) {
                    dbCategory.description = description;
                }
                if (!(0, esHelper_1.esIsEmpty)(name)) {
                    dbCategory.name = name;
                }
                if (!(0, esHelper_1.esIsEmpty)(parent)) {
                    dbCategory.parent = parent;
                }
                const updateCategory = await this.categoryRepository?.save(dbCategory);
                writeLog_1.apiWriteLog.info("Category Update Response ", updateCategory);
                return updateCategory;
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error(`Update category Error, `, error);
            return null;
        }
        return null;
    }
    async deleteCategory(id) {
        this.initRepository();
        try {
            const category = await this.categoryRepository?.delete({ id: id });
            return category;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error Delete category ", err);
            return null;
        }
    }
}
exports.categoryService = new CategoryService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NhdGVnb3J5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsNkRBQTBEO0FBQzFELGlEQUFpRDtBQUNqRCxnREFBNkM7QUFFN0MsZ0RBQThDO0FBRTlDLE1BQU0sZUFBZTtJQUNYLGtCQUFrQixHQUFnQyxJQUFJLENBQUM7SUFDdkQsc0JBQXNCLEdBQW9DLElBQUksQ0FBQztJQUUvRCxjQUFjO1FBQ3BCLElBQUksSUFBSSxDQUFDLGtCQUFrQixLQUFLLElBQUksRUFBRTtZQUNwQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsNkJBQWEsQ0FBQyxhQUFhLENBQUMsbUJBQVEsQ0FBQyxDQUFDO1NBQ2pFO1FBRUQsSUFBSSxJQUFJLENBQUMsc0JBQXNCLEtBQUssSUFBSSxFQUFFO1lBQ3hDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyw2QkFBYSxDQUFDLGlCQUFpQixDQUFDLG1CQUFRLENBQUMsQ0FBQztTQUN6RTtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQWtCO1FBQzNCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLFFBQVEsRUFBRTtZQUNaLElBQUk7Z0JBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUUzRCxPQUFPLElBQUksQ0FBQzthQUNiO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2Qsc0JBQVcsQ0FBQyxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQzthQUM1QztTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUFVO1FBQzlCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJO1lBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDO2dCQUN0RCxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO2FBQ2xCLENBQUMsQ0FBQztZQUNILE9BQU8sUUFBUSxDQUFDO1NBQ2pCO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixzQkFBVyxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNqRCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQywyQkFBMkI7UUFDL0IsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUk7WUFDRixNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUN6RCxNQUFNLE1BQU0sR0FBWSxFQUFFLENBQUM7WUFDM0IsSUFBSSxVQUFVLEVBQUU7Z0JBQ2QsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQWEsRUFBRSxFQUFFO29CQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDeEIsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUNELE9BQU8sTUFBTSxDQUFDO1NBQ2Y7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbkQsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZTtRQUNuQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSTtZQUNGLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixFQUFFLFNBQVMsRUFBRSxDQUFDO1lBQ2xFLE9BQU8sVUFBVSxDQUFDO1NBQ25CO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixzQkFBVyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUN0RCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxjQUFjO1FBQ2xCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJO1lBQ0YsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFDekQsT0FBTyxVQUFVLENBQUM7U0FDbkI7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLHNCQUFXLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLGNBQWMsQ0FDbEIsSUFBWSxFQUNaLFdBQW1CLEVBQ25CLEVBQVUsRUFDVixNQUFnQjtRQUVoQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSTtZQUNGLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixFQUFFLFNBQVMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDcEUsSUFBSSxVQUFVLEtBQUssSUFBSSxJQUFJLFVBQVUsS0FBSyxTQUFTLEVBQUU7Z0JBQ25ELHNCQUFXLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQ3pDLHlCQUF5QjtnQkFDekIsZ0NBQWdDO2dCQUNoQyxJQUFJLENBQUMsSUFBQSxvQkFBUyxFQUFDLFdBQVcsQ0FBQyxFQUFFO29CQUMzQixVQUFVLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztpQkFDdEM7Z0JBRUQsSUFBSSxDQUFDLElBQUEsb0JBQVMsRUFBQyxJQUFJLENBQUMsRUFBRTtvQkFDcEIsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7aUJBQ3hCO2dCQUVELElBQUksQ0FBQyxJQUFBLG9CQUFTLEVBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ3RCLFVBQVUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO2lCQUM1QjtnQkFFRCxNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3ZFLHNCQUFXLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLGNBQWMsQ0FBQyxDQUFDO2dCQUM5RCxPQUFPLGNBQWMsQ0FBQzthQUN2QjtTQUNGO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxzQkFBVyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNwRCxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFVO1FBQzdCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJO1lBQ0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDbkUsT0FBTyxRQUFRLENBQUM7U0FDakI7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLHNCQUFXLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ2pELE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0NBQ0Y7QUFFWSxRQUFBLGVBQWUsR0FBRyxJQUFJLGVBQWUsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGUgZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHsgUmVwb3NpdG9yeSwgVHJlZVJlcG9zaXRvcnksIFVwZGF0ZVJlc3VsdCB9IGZyb20gXCJ0eXBlb3JtXCI7XHJcbmltcG9ydCB7IEFwcERhdGFTb3VyY2UgfSBmcm9tIFwiLi4vZGF0YWJhc2UvQXBwRGF0YVNvdXJjZVwiO1xyXG5pbXBvcnQgeyBhcGlXcml0ZUxvZyB9IGZyb20gXCIuLi9sb2dnZXIvd3JpdGVMb2dcIjtcclxuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tIFwiLi4vbW9kZWwvQ2F0ZWdvcnlcIjtcclxuXHJcbmltcG9ydCB7IGVzSXNFbXB0eSB9IGZyb20gXCIuLi91dGlscy9lc0hlbHBlclwiO1xyXG5cclxuY2xhc3MgQ2F0ZWdvcnlTZXJ2aWNlIHtcclxuICBwcml2YXRlIGNhdGVnb3J5UmVwb3NpdG9yeTogUmVwb3NpdG9yeTxDYXRlZ29yeT4gfCBudWxsID0gbnVsbDtcclxuICBwcml2YXRlIGNhdGVnb3J5VHJlZVJlcG9zaXRvcnk6IFRyZWVSZXBvc2l0b3J5PENhdGVnb3J5PiB8IG51bGwgPSBudWxsO1xyXG5cclxuICBwcml2YXRlIGluaXRSZXBvc2l0b3J5KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuY2F0ZWdvcnlSZXBvc2l0b3J5ID09PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuY2F0ZWdvcnlSZXBvc2l0b3J5ID0gQXBwRGF0YVNvdXJjZS5nZXRSZXBvc2l0b3J5KENhdGVnb3J5KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5jYXRlZ29yeVRyZWVSZXBvc2l0b3J5ID09PSBudWxsKSB7XHJcbiAgICAgIHRoaXMuY2F0ZWdvcnlUcmVlUmVwb3NpdG9yeSA9IEFwcERhdGFTb3VyY2UuZ2V0VHJlZVJlcG9zaXRvcnkoQ2F0ZWdvcnkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2F2ZShjYXRlZ29yeTogQ2F0ZWdvcnkpIHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIGlmIChjYXRlZ29yeSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCB0aGlzLmNhdGVnb3J5UmVwb3NpdG9yeT8uc2F2ZShjYXRlZ29yeSk7XHJcblxyXG4gICAgICAgIHJldHVybiByZXNwO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiY2F0ZWdvcnkgU2F2ZSBGYWlsZWQgXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldENhdGVnb3J5QnlJZChpZDogbnVtYmVyKTogUHJvbWlzZTxDYXRlZ29yeSB8IG51bGwgfCB1bmRlZmluZWQ+IHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGNhdGVnb3J5ID0gYXdhaXQgdGhpcy5jYXRlZ29yeVJlcG9zaXRvcnk/LmZpbmRPbmUoe1xyXG4gICAgICAgIHdoZXJlOiB7IGlkOiBpZCB9LFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGNhdGVnb3J5O1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiRXJyb3IgZ2V0Y2F0ZWdvcnlCeUlEIFwiLCBlcnIpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEFsbENhdGVnb3J5QXNTdHJpbmdBcnJheSgpIHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGNhdGVnb3JpZXMgPSBhd2FpdCB0aGlzLmNhdGVnb3J5UmVwb3NpdG9yeT8uZmluZCgpO1xyXG4gICAgICBjb25zdCBjYXRTdHI6c3RyaW5nW10gPSBbXTtcclxuICAgICAgaWYgKGNhdGVnb3JpZXMpIHtcclxuICAgICAgICBjYXRlZ29yaWVzLmZvckVhY2goKGl0ZW06Q2F0ZWdvcnkpID0+IHtcclxuICAgICAgICAgIGNhdFN0ci5wdXNoKGl0ZW0ua2V5KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4gY2F0U3RyO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJDYXRlZ29yaWVzIFN0cmluZyBub3QgZm91bmQgXCIsIGVycm9yKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRDYXRlZ29yeVRyZWUoKSB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBjYXRlZ29yaWVzID0gYXdhaXQgdGhpcy5jYXRlZ29yeVRyZWVSZXBvc2l0b3J5Py5maW5kVHJlZXMoKTtcclxuICAgICAgcmV0dXJuIGNhdGVnb3JpZXM7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJFcnJvciBnZXQgVHJlZSBDYXRlZ29yaWVzLCBcIiwgZXJyKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRBbGxDYXRlZ29yeSgpOiBQcm9taXNlPENhdGVnb3J5W10gfCBudWxsIHwgdW5kZWZpbmVkPiB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBjYXRlZ29yaWVzID0gYXdhaXQgdGhpcy5jYXRlZ29yeVJlcG9zaXRvcnk/LmZpbmQoKTtcclxuICAgICAgcmV0dXJuIGNhdGVnb3JpZXM7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoYEVycm9yIEFsbCBjYXRlZ29yeSBgLCBlcnIpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHVwZGF0ZUNhdGVnb3J5KFxyXG4gICAgbmFtZTogc3RyaW5nLFxyXG4gICAgZGVzY3JpcHRpb246IHN0cmluZyxcclxuICAgIGlkOiBudW1iZXIsXHJcbiAgICBwYXJlbnQ6IENhdGVnb3J5XHJcbiAgKSB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBkYkNhdGVnb3J5ID0gYXdhaXQgdGhpcy5jYXRlZ29yeVJlcG9zaXRvcnk/LmZpbmRPbmVCeSh7IGlkIH0pO1xyXG4gICAgICBpZiAoZGJDYXRlZ29yeSAhPT0gbnVsbCAmJiBkYkNhdGVnb3J5ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBhcGlXcml0ZUxvZy5pbmZvKFwiQ2F0ZWdvcnkgVXBkYXRlIC4uLiBcIik7XHJcbiAgICAgICAgLy8gbGV0IG5hbWU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgLy8gbGV0IGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgIGlmICghZXNJc0VtcHR5KGRlc2NyaXB0aW9uKSkge1xyXG4gICAgICAgICAgZGJDYXRlZ29yeS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCFlc0lzRW1wdHkobmFtZSkpIHtcclxuICAgICAgICAgIGRiQ2F0ZWdvcnkubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIWVzSXNFbXB0eShwYXJlbnQpKSB7XHJcbiAgICAgICAgICBkYkNhdGVnb3J5LnBhcmVudCA9IHBhcmVudDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHVwZGF0ZUNhdGVnb3J5ID0gYXdhaXQgdGhpcy5jYXRlZ29yeVJlcG9zaXRvcnk/LnNhdmUoZGJDYXRlZ29yeSk7XHJcbiAgICAgICAgYXBpV3JpdGVMb2cuaW5mbyhcIkNhdGVnb3J5IFVwZGF0ZSBSZXNwb25zZSBcIiwgdXBkYXRlQ2F0ZWdvcnkpO1xyXG4gICAgICAgIHJldHVybiB1cGRhdGVDYXRlZ29yeTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoYFVwZGF0ZSBjYXRlZ29yeSBFcnJvciwgYCwgZXJyb3IpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICBhc3luYyBkZWxldGVDYXRlZ29yeShpZDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBjYXRlZ29yeSA9IGF3YWl0IHRoaXMuY2F0ZWdvcnlSZXBvc2l0b3J5Py5kZWxldGUoeyBpZDogaWQgfSk7XHJcbiAgICAgIHJldHVybiBjYXRlZ29yeTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkVycm9yIERlbGV0ZSBjYXRlZ29yeSBcIiwgZXJyKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY2F0ZWdvcnlTZXJ2aWNlID0gbmV3IENhdGVnb3J5U2VydmljZSgpO1xyXG4iXX0=