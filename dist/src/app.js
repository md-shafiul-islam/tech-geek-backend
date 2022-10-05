"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const default_1 = __importDefault(require("../config/default"));
const index_1 = __importDefault(require("./logger/index"));
const routes_1 = __importDefault(require("./routes"));
const AppDataSource_1 = require("./database/AppDataSource");
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
class App {
    port = default_1.default.appPort;
    host = default_1.default.appHost;
    env = "";
    dataSource;
    app;
    constructor() {
        this.app = (0, express_1.default)();
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeErrorHandling();
    }
    initializeErrorHandling() {
        //TODO: Error Handeler
    }
    initializeRoutes() {
        (0, routes_1.default)(this.app);
    }
    initializeMiddlewares() {
        this.app.use(express_1.default.json({ limit: "150mb" }));
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(error_middleware_1.default);
    }
    getServer() {
        return this.app;
    }
    async connectToDatabase() {
        this.dataSource = AppDataSource_1.AppDataSource;
    }
    listen() {
        this.app.listen(this.port, this.host, () => {
            index_1.default.info(`=================================`);
            index_1.default.info(`======= ENV: ${this.env} =======`);
            index_1.default.info(`🚀 App listening on the port http://${this.host}:${this.port}`);
            index_1.default.info(`=================================`);
        });
    }
}
exports.default = App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHlCQUF1QjtBQUN2Qiw0QkFBMEI7QUFDMUIsc0RBQStDO0FBRy9DLGdFQUF1QztBQUN2QywyREFBaUM7QUFDakMsc0RBQThCO0FBQzlCLDREQUF5RDtBQUN6RCxxRkFBNEQ7QUFFNUQsTUFBTSxHQUFHO0lBQ1AsSUFBSSxHQUFHLGlCQUFNLENBQUMsT0FBaUIsQ0FBQztJQUNoQyxJQUFJLEdBQUcsaUJBQU0sQ0FBQyxPQUFpQixDQUFDO0lBQ2hDLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFFVCxVQUFVLENBQWE7SUFFaEIsR0FBRyxDQUFjO0lBRXhCO1FBQ0UsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQztRQUVyQixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV6QixJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBRUQsdUJBQXVCO1FBQ3JCLHNCQUFzQjtJQUN4QixDQUFDO0lBQ0QsZ0JBQWdCO1FBQ2QsSUFBQSxnQkFBTSxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBQ0QscUJBQXFCO1FBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMvQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpQkFBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsMEJBQWUsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTSxTQUFTO1FBQ2QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7SUFFTyxLQUFLLENBQUMsaUJBQWlCO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsNkJBQWEsQ0FBQztJQUNsQyxDQUFDO0lBRU0sTUFBTTtRQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDekMsZUFBRyxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1lBQzlDLGVBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDO1lBQzdDLGVBQUcsQ0FBQyxJQUFJLENBQUMsdUNBQXVDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDMUUsZUFBRyxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBRUQsa0JBQWUsR0FBRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiZG90ZW52L2NvbmZpZ1wiO1xyXG5pbXBvcnQgXCJyZWZsZWN0LW1ldGFkYXRhXCI7XHJcbmltcG9ydCBleHByZXNzLCB7IEFwcGxpY2F0aW9uIH0gZnJvbSBcImV4cHJlc3NcIjtcclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gXCJ0eXBlb3JtXCI7XHJcblxyXG5pbXBvcnQgY29uZmlnIGZyb20gXCIuLi9jb25maWcvZGVmYXVsdFwiO1xyXG5pbXBvcnQgbG9nIGZyb20gXCIuL2xvZ2dlci9pbmRleFwiO1xyXG5pbXBvcnQgcm91dGVzIGZyb20gXCIuL3JvdXRlc1wiO1xyXG5pbXBvcnQgeyBBcHBEYXRhU291cmNlIH0gZnJvbSBcIi4vZGF0YWJhc2UvQXBwRGF0YVNvdXJjZVwiO1xyXG5pbXBvcnQgZXJyb3JNaWRkbGV3YXJlIGZyb20gXCIuL21pZGRsZXdhcmUvZXJyb3IubWlkZGxld2FyZVwiO1xyXG5cclxuY2xhc3MgQXBwIHtcclxuICBwb3J0ID0gY29uZmlnLmFwcFBvcnQgYXMgbnVtYmVyO1xyXG4gIGhvc3QgPSBjb25maWcuYXBwSG9zdCBhcyBzdHJpbmc7XHJcbiAgZW52ID0gXCJcIjtcclxuXHJcbiAgZGF0YVNvdXJjZTogRGF0YVNvdXJjZTtcclxuXHJcbiAgcHVibGljIGFwcDogQXBwbGljYXRpb247XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5hcHAgPSBleHByZXNzKCk7XHJcblxyXG4gICAgdGhpcy5jb25uZWN0VG9EYXRhYmFzZSgpO1xyXG5cclxuICAgIHRoaXMuaW5pdGlhbGl6ZU1pZGRsZXdhcmVzKCk7XHJcbiAgICB0aGlzLmluaXRpYWxpemVSb3V0ZXMoKTtcclxuICAgIHRoaXMuaW5pdGlhbGl6ZUVycm9ySGFuZGxpbmcoKTtcclxuICB9XHJcblxyXG4gIGluaXRpYWxpemVFcnJvckhhbmRsaW5nKCkge1xyXG4gICAgLy9UT0RPOiBFcnJvciBIYW5kZWxlclxyXG4gIH1cclxuICBpbml0aWFsaXplUm91dGVzKCkge1xyXG4gICAgcm91dGVzKHRoaXMuYXBwKTtcclxuICB9XHJcbiAgaW5pdGlhbGl6ZU1pZGRsZXdhcmVzKCkge1xyXG4gICAgdGhpcy5hcHAudXNlKGV4cHJlc3MuanNvbih7IGxpbWl0OiBcIjE1MG1iXCIgfSkpO1xyXG4gICAgdGhpcy5hcHAudXNlKGV4cHJlc3MudXJsZW5jb2RlZCh7IGV4dGVuZGVkOiBmYWxzZSB9KSk7XHJcbiAgICB0aGlzLmFwcC51c2UoZXJyb3JNaWRkbGV3YXJlKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRTZXJ2ZXIoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5hcHA7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGFzeW5jIGNvbm5lY3RUb0RhdGFiYXNlKCkge1xyXG4gICAgdGhpcy5kYXRhU291cmNlID0gQXBwRGF0YVNvdXJjZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBsaXN0ZW4oKSB7XHJcbiAgICB0aGlzLmFwcC5saXN0ZW4odGhpcy5wb3J0LCB0aGlzLmhvc3QsICgpID0+IHtcclxuICAgICAgbG9nLmluZm8oYD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PWApO1xyXG4gICAgICBsb2cuaW5mbyhgPT09PT09PSBFTlY6ICR7dGhpcy5lbnZ9ID09PT09PT1gKTtcclxuICAgICAgbG9nLmluZm8oYPCfmoAgQXBwIGxpc3RlbmluZyBvbiB0aGUgcG9ydCBodHRwOi8vJHt0aGlzLmhvc3R9OiR7dGhpcy5wb3J0fWApO1xyXG4gICAgICBsb2cuaW5mbyhgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09YCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcDtcclxuIl19