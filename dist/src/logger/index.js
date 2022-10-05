"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const dayjs_1 = __importDefault(require("dayjs"));
const log = (0, pino_1.default)({
    prettyPrint: true,
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${(0, dayjs_1.default)().format()}"`,
});
exports.default = log;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbG9nZ2VyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsZ0RBQTBCO0FBQzFCLGtEQUEwQjtBQUUxQixNQUFNLEdBQUcsR0FBRyxJQUFBLGNBQU0sRUFBQztJQUNqQixXQUFXLEVBQUUsSUFBSTtJQUNqQixJQUFJLEVBQUU7UUFDSixHQUFHLEVBQUUsS0FBSztLQUNYO0lBQ0QsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLFlBQVksSUFBQSxlQUFLLEdBQUUsQ0FBQyxNQUFNLEVBQUUsR0FBRztDQUNqRCxDQUFDLENBQUM7QUFFSCxrQkFBZSxHQUFHLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbG9nZ2VyIGZyb20gXCJwaW5vXCI7XHJcbmltcG9ydCBkYXlqcyBmcm9tIFwiZGF5anNcIjtcclxuXHJcbmNvbnN0IGxvZyA9IGxvZ2dlcih7XHJcbiAgcHJldHR5UHJpbnQ6IHRydWUsXHJcbiAgYmFzZToge1xyXG4gICAgcGlkOiBmYWxzZSxcclxuICB9LFxyXG4gIHRpbWVzdGFtcDogKCkgPT4gYCxcInRpbWVcIjpcIiR7ZGF5anMoKS5mb3JtYXQoKX1cImAsXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbG9nO1xyXG4iXX0=