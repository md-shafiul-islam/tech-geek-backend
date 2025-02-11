"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsRoute = void 0;
const express_1 = __importDefault(require("express"));
const news_controller_1 = require("../controller/news.controller");
const newsRoute = express_1.default.Router();
exports.newsRoute = newsRoute;
newsRoute.get("/", news_controller_1.newsController.getAll);
newsRoute.get(`/:id`, news_controller_1.newsController.getById);
newsRoute.post("/", news_controller_1.newsController.add);
newsRoute.put("/", news_controller_1.newsController.update);
newsRoute.delete(`/:id`, news_controller_1.newsController.delete);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3cy5yb3V0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvbmV3cy5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzREFBOEI7QUFDOUIsbUVBQStEO0FBRS9ELE1BQU0sU0FBUyxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFZMUIsOEJBQVM7QUFWbEIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsZ0NBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUxQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxnQ0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBRTlDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLGdDQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFeEMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsZ0NBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUUxQyxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxnQ0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGV4cHJlc3MgZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHsgbmV3c0NvbnRyb2xsZXIgfSBmcm9tIFwiLi4vY29udHJvbGxlci9uZXdzLmNvbnRyb2xsZXJcIjtcclxuXHJcbmNvbnN0IG5ld3NSb3V0ZSA9IGV4cHJlc3MuUm91dGVyKCk7XHJcblxyXG5uZXdzUm91dGUuZ2V0KFwiL1wiLCBuZXdzQ29udHJvbGxlci5nZXRBbGwpO1xyXG5cclxubmV3c1JvdXRlLmdldChgLzppZGAsIG5ld3NDb250cm9sbGVyLmdldEJ5SWQpO1xyXG5cclxubmV3c1JvdXRlLnBvc3QoXCIvXCIsIG5ld3NDb250cm9sbGVyLmFkZCk7XHJcblxyXG5uZXdzUm91dGUucHV0KFwiL1wiLCBuZXdzQ29udHJvbGxlci51cGRhdGUpO1xyXG5cclxubmV3c1JvdXRlLmRlbGV0ZShgLzppZGAsIG5ld3NDb250cm9sbGVyLmRlbGV0ZSk7XHJcblxyXG5leHBvcnQgeyBuZXdzUm91dGUgfTtcclxuIl19