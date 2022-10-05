"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteMapRoute = void 0;
const express_1 = __importDefault(require("express"));
const sitemap_controller_1 = require("../controller/sitemap.controller");
const siteMapRoute = express_1.default.Router();
exports.siteMapRoute = siteMapRoute;
siteMapRoute.get("/", sitemap_controller_1.siteMapController.getAllItemsCount);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZW1hcC5yb3V0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yb3V0ZXMvc2l0ZW1hcC5yb3V0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzREFBOEI7QUFDOUIseUVBQXFFO0FBRXJFLE1BQU0sWUFBWSxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFJN0Isb0NBQVk7QUFGckIsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsc0NBQWlCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBleHByZXNzIGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCB7IHNpdGVNYXBDb250cm9sbGVyIH0gZnJvbSBcIi4uL2NvbnRyb2xsZXIvc2l0ZW1hcC5jb250cm9sbGVyXCI7XHJcblxyXG5jb25zdCBzaXRlTWFwUm91dGUgPSBleHByZXNzLlJvdXRlcigpO1xyXG5cclxuc2l0ZU1hcFJvdXRlLmdldChcIi9cIiwgc2l0ZU1hcENvbnRyb2xsZXIuZ2V0QWxsSXRlbXNDb3VudCk7XHJcblxyXG5leHBvcnQgeyBzaXRlTWFwUm91dGUgfTtcclxuIl19