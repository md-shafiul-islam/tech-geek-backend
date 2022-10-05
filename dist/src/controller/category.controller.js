"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryController = void 0;
const writeLog_1 = require("../logger/writeLog");
const Category_1 = require("../model/Category");
const category_service_1 = require("../service/category.service");
const respFormat_1 = __importDefault(require("../utils/response/respFormat"));
class CategoryController {
    async getAll(req, resp) {
        try {
            const categories = await category_service_1.categoryService.getAllCategory();
            resp.status(200);
            resp.send((0, respFormat_1.default)(categories, "Categories found", true));
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Categories found by ID ", error);
            resp.status(200);
            resp.send((0, respFormat_1.default)(null, "Categories not found", false));
        }
    }
    async getCategoryTree(req, resp) {
        try {
            const categories = await category_service_1.categoryService.getCategoryTree();
            resp
                .status(200)
                .send((0, respFormat_1.default)(categories, "Category Tree found", true));
        }
        catch (error) {
            resp.status(200).send((0, respFormat_1.default)(null, "Category Tree not found", false));
        }
    }
    async getById(req, resp) {
        let { id } = req.params;
        try {
            const intid = Number(id);
            const category = await category_service_1.categoryService.getCategoryById(intid);
            resp.status(200);
            resp.send((0, respFormat_1.default)(category, "Category found", true));
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Category found by ID ", error);
            resp.status(200);
            resp.send((0, respFormat_1.default)(null, "Category not found", false));
        }
    }
    async add(req, resp) {
        const { name, description, parent } = req.body;
        const category = new Category_1.Category();
        category.name = name;
        category.description = description;
        if (parent != null) {
            category.parent = parent;
        }
        try {
            const nCategory = await category_service_1.categoryService.save(category);
            resp.status(201).send((0, respFormat_1.default)(nCategory, "Category added", true));
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Category Add Controller Error ", error);
            resp.status(202).send((0, respFormat_1.default)(null, "Category Add failed", false));
        }
    }
    async update(req, resp) {
        const { name, description, id, parent } = req.body;
        try {
            let idInt = Number(id);
            // apiWriteLog.error("Category Update Controller ... ");
            const nCategory = await category_service_1.categoryService.updateCategory(name, description, idInt, parent);
            resp.status(200).send((0, respFormat_1.default)(nCategory, "Category Updated", true));
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Category Add Controller Error ", error);
            resp.status(202).send((0, respFormat_1.default)(null, "Category Add failed", false));
        }
    }
    async delete(req, resp) {
        const { id } = req.params;
        try {
            let catId = Number(id);
            const nCategory = await category_service_1.categoryService.deleteCategory(catId);
            resp.status(201).send((0, respFormat_1.default)(nCategory, "Category Deleted", true));
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Category Delete Error ", error);
            resp.status(202).send((0, respFormat_1.default)(null, "Deleted failed", false));
        }
    }
}
exports.categoryController = new CategoryController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcnkuY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cm9sbGVyL2NhdGVnb3J5LmNvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsaURBQWlEO0FBQ2pELGdEQUE2QztBQUM3QyxrRUFBOEQ7QUFDOUQsOEVBQXNEO0FBRXRELE1BQU0sa0JBQWtCO0lBQ3RCLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBWSxFQUFFLElBQWM7UUFDdkMsSUFBSTtZQUNGLE1BQU0sVUFBVSxHQUFHLE1BQU0sa0NBQWUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUMxRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxvQkFBVSxFQUFDLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzdEO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxzQkFBVyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxvQkFBVSxFQUFDLElBQUksRUFBRSxzQkFBc0IsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzVEO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxlQUFlLENBQUMsR0FBWSxFQUFFLElBQWM7UUFDaEQsSUFBSTtZQUNGLE1BQU0sVUFBVSxHQUFHLE1BQU0sa0NBQWUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUMzRCxJQUFJO2lCQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7aUJBQ1gsSUFBSSxDQUFDLElBQUEsb0JBQVUsRUFBQyxVQUFVLEVBQUUscUJBQXFCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUM5RDtRQUFDLE9BQU8sS0FB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S0FBSyxDQUFDLGdDQUFnQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUEsb0JBQVUsRUFBQyxJQUFJLEVBQUUscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUN2RTtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQVksRUFBRSxJQUFjO1FBQ3ZDLE1BQU0sRUFBRSxFQUFFLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQzFCLElBQUk7WUFDRixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdkIsTUFBTSxTQUFTLEdBQUcsTUFBTSxrQ0FBZSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUU5RCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFBLG9CQUFVLEVBQUMsU0FBUyxFQUFFLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDeEU7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLHNCQUFXLENBQUMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUEsb0JBQVUsRUFBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNsRTtJQUNILENBQUM7Q0FDRjtBQUVZLFFBQUEsa0JBQWtCLEdBQUcsSUFBSSxrQkFBa0IsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBudW1iZXIgfSBmcm9tIFwieXVwXCI7XHJcbmltcG9ydCB7IGFwaVdyaXRlTG9nIH0gZnJvbSBcIi4uL2xvZ2dlci93cml0ZUxvZ1wiO1xyXG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gXCIuLi9tb2RlbC9DYXRlZ29yeVwiO1xyXG5pbXBvcnQgeyBjYXRlZ29yeVNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZS9jYXRlZ29yeS5zZXJ2aWNlXCI7XHJcbmltcG9ydCByZXNwRm9ybWF0IGZyb20gXCIuLi91dGlscy9yZXNwb25zZS9yZXNwRm9ybWF0XCI7XHJcblxyXG5jbGFzcyBDYXRlZ29yeUNvbnRyb2xsZXIge1xyXG4gIGFzeW5jIGdldEFsbChyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBjYXRlZ29yaWVzID0gYXdhaXQgY2F0ZWdvcnlTZXJ2aWNlLmdldEFsbENhdGVnb3J5KCk7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KGNhdGVnb3JpZXMsIFwiQ2F0ZWdvcmllcyBmb3VuZFwiLCB0cnVlKSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkNhdGVnb3JpZXMgZm91bmQgYnkgSUQgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAwKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJDYXRlZ29yaWVzIG5vdCBmb3VuZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0Q2F0ZWdvcnlUcmVlKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGNhdGVnb3JpZXMgPSBhd2FpdCBjYXRlZ29yeVNlcnZpY2UuZ2V0Q2F0ZWdvcnlUcmVlKCk7XHJcbiAgICAgIHJlc3BcclxuICAgICAgICAuc3RhdHVzKDIwMClcclxuICAgICAgICAuc2VuZChyZXNwRm9ybWF0KGNhdGVnb3JpZXMsIFwiQ2F0ZWdvcnkgVHJlZSBmb3VuZFwiLCB0cnVlKSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXNwLnN0YXR1cygyMDApLnNlbmQocmVzcEZvcm1hdChudWxsLCBcIkNhdGVnb3J5IFRyZWUgbm90IGZvdW5kXCIsIGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRCeUlkKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIGxldCB7IGlkIH0gPSByZXEucGFyYW1zO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgaW50aWQ6IG51bWJlciA9IE51bWJlcihpZCk7XHJcbiAgICAgIGNvbnN0IGNhdGVnb3J5ID0gYXdhaXQgY2F0ZWdvcnlTZXJ2aWNlLmdldENhdGVnb3J5QnlJZChpbnRpZCk7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KGNhdGVnb3J5LCBcIkNhdGVnb3J5IGZvdW5kXCIsIHRydWUpKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiQ2F0ZWdvcnkgZm91bmQgYnkgSUQgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAwKTtcclxuICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJDYXRlZ29yeSBub3QgZm91bmRcIiwgZmFsc2UpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGFkZChyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICBjb25zdCB7IG5hbWUsIGRlc2NyaXB0aW9uLCBwYXJlbnQgfSA9IHJlcS5ib2R5O1xyXG5cclxuICAgIGNvbnN0IGNhdGVnb3J5OiBDYXRlZ29yeSA9IG5ldyBDYXRlZ29yeSgpO1xyXG4gICAgY2F0ZWdvcnkubmFtZSA9IG5hbWU7XHJcbiAgICBjYXRlZ29yeS5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xyXG4gICAgaWYgKHBhcmVudCAhPSBudWxsKSB7XHJcbiAgICAgIGNhdGVnb3J5LnBhcmVudCA9IHBhcmVudDtcclxuICAgIH1cclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBuQ2F0ZWdvcnkgPSBhd2FpdCBjYXRlZ29yeVNlcnZpY2Uuc2F2ZShjYXRlZ29yeSk7XHJcblxyXG4gICAgICByZXNwLnN0YXR1cygyMDEpLnNlbmQocmVzcEZvcm1hdChuQ2F0ZWdvcnksIFwiQ2F0ZWdvcnkgYWRkZWRcIiwgdHJ1ZSkpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJDYXRlZ29yeSBBZGQgQ29udHJvbGxlciBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDIpLnNlbmQocmVzcEZvcm1hdChudWxsLCBcIkNhdGVnb3J5IEFkZCBmYWlsZWRcIiwgZmFsc2UpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHVwZGF0ZShyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICBjb25zdCB7IG5hbWUsIGRlc2NyaXB0aW9uLCBpZCwgcGFyZW50IH0gPSByZXEuYm9keTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCBpZEludCA9IE51bWJlcihpZCk7XHJcbiAgICAgIC8vIGFwaVdyaXRlTG9nLmVycm9yKFwiQ2F0ZWdvcnkgVXBkYXRlIENvbnRyb2xsZXIgLi4uIFwiKTtcclxuICAgICAgY29uc3QgbkNhdGVnb3J5ID0gYXdhaXQgY2F0ZWdvcnlTZXJ2aWNlLnVwZGF0ZUNhdGVnb3J5KFxyXG4gICAgICAgIG5hbWUsXHJcbiAgICAgICAgZGVzY3JpcHRpb24sXHJcbiAgICAgICAgaWRJbnQsXHJcbiAgICAgICAgcGFyZW50XHJcbiAgICAgICk7XHJcblxyXG4gICAgICByZXNwLnN0YXR1cygyMDApLnNlbmQocmVzcEZvcm1hdChuQ2F0ZWdvcnksIFwiQ2F0ZWdvcnkgVXBkYXRlZFwiLCB0cnVlKSk7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkNhdGVnb3J5IEFkZCBDb250cm9sbGVyIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMikuc2VuZChyZXNwRm9ybWF0KG51bGwsIFwiQ2F0ZWdvcnkgQWRkIGZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZGVsZXRlKHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgY2F0SWQgPSBOdW1iZXIoaWQpO1xyXG4gICAgICBjb25zdCBuQ2F0ZWdvcnkgPSBhd2FpdCBjYXRlZ29yeVNlcnZpY2UuZGVsZXRlQ2F0ZWdvcnkoY2F0SWQpO1xyXG5cclxuICAgICAgcmVzcC5zdGF0dXMoMjAxKS5zZW5kKHJlc3BGb3JtYXQobkNhdGVnb3J5LCBcIkNhdGVnb3J5IERlbGV0ZWRcIiwgdHJ1ZSkpO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJDYXRlZ29yeSBEZWxldGUgRXJyb3IgXCIsIGVycm9yKTtcclxuICAgICAgcmVzcC5zdGF0dXMoMjAyKS5zZW5kKHJlc3BGb3JtYXQobnVsbCwgXCJEZWxldGVkIGZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNhdGVnb3J5Q29udHJvbGxlciA9IG5ldyBDYXRlZ29yeUNvbnRyb2xsZXIoKTtcclxuIl19