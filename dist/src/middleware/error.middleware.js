"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
const errorMiddleware = (error, req, resp, next) => {
    try {
        const status = error.status || 5000;
        const message = error.message || "Something went wrong";
        logger_1.default.error(`[${req.method}]${req.path} >> Status Code :: ${status}, Message:: ${message}`);
    }
    catch (error) {
        next(error);
    }
};
exports.default = errorMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9taWRkbGV3YXJlL2Vycm9yLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSx1REFBNEI7QUFFNUIsTUFBTSxlQUFlLEdBQUcsQ0FDdEIsS0FBb0IsRUFDcEIsR0FBWSxFQUNaLElBQWMsRUFDZCxJQUFrQixFQUNsQixFQUFFO0lBQ0YsSUFBSTtRQUNGLE1BQU0sTUFBTSxHQUFXLEtBQUssQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDO1FBQzVDLE1BQU0sT0FBTyxHQUFXLEtBQUssQ0FBQyxPQUFPLElBQUksc0JBQXNCLENBQUM7UUFFaEUsZ0JBQUcsQ0FBQyxLQUFLLENBQ1AsSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLHNCQUFzQixNQUFNLGVBQWUsT0FBTyxFQUFFLENBQy9FLENBQUM7S0FHSDtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2I7QUFDSCxDQUFDLENBQUM7QUFFRixrQkFBZSxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0RnVuY3Rpb24sIFJlcXVlc3QsIFJlc3BvbnNlIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHsgSHR0cEV4Y2VwdGlvbiB9IGZyb20gXCIuLi9leGNlcHRpb24vSHR0cEV4Y2VwdGlvblwiO1xyXG5pbXBvcnQgbG9nIGZyb20gXCIuLi9sb2dnZXJcIjtcclxuXHJcbmNvbnN0IGVycm9yTWlkZGxld2FyZSA9IChcclxuICBlcnJvcjogSHR0cEV4Y2VwdGlvbixcclxuICByZXE6IFJlcXVlc3QsXHJcbiAgcmVzcDogUmVzcG9uc2UsXHJcbiAgbmV4dDogTmV4dEZ1bmN0aW9uXHJcbikgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBzdGF0dXM6IG51bWJlciA9IGVycm9yLnN0YXR1cyB8fCA1MDAwO1xyXG4gICAgY29uc3QgbWVzc2FnZTogc3RyaW5nID0gZXJyb3IubWVzc2FnZSB8fCBcIlNvbWV0aGluZyB3ZW50IHdyb25nXCI7XHJcblxyXG4gICAgbG9nLmVycm9yKFxyXG4gICAgICBgWyR7cmVxLm1ldGhvZH1dJHtyZXEucGF0aH0gPj4gU3RhdHVzIENvZGUgOjogJHtzdGF0dXN9LCBNZXNzYWdlOjogJHttZXNzYWdlfWBcclxuICAgICk7XHJcbiAgICAgICBcclxuXHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIG5leHQoZXJyb3IpO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGVycm9yTWlkZGxld2FyZTtcclxuXHJcbiJdfQ==