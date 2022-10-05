"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiWriteLog = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const _1 = __importDefault(require("."));
class WriteLog {
    logFileStatus = process.env.LOG_FILE_STATUS;
    info(msg, obj = null) {
        _1.default.info(obj, msg);
        this.logWriteToFile(msg, obj);
    }
    warn(msg, obj = null) {
        _1.default.warn(obj, msg);
        this.logWriteToFile(msg, (obj = null));
    }
    error(msg, obj = null) {
        _1.default.error(obj, msg);
        this.logWriteToFile(msg, obj);
    }
    async logWriteToFile(msg, obj = null) {
        if (this.logFileStatus) {
            const msgData = `${msg}, >> OBJ >> ${JSON.stringify(obj, null, 2)}`;
            const fileName = `${(0, dayjs_1.default)().format("YYYY-MM-DDTHH-mm")}.txt`;
            const location = `./logs`;
            if (!fs.existsSync(location)) {
                fs.mkdirSync(location);
            }
            const filePath = path_1.default.join(location, fileName);
            fs.writeFile(filePath, msgData, { flag: "a+" }, (error) => {
                console.log(error);
            });
        }
    }
}
exports.apiWriteLog = new WriteLog();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGVMb2cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbG9nZ2VyL3dyaXRlTG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsa0RBQTBCO0FBQzFCLHVDQUF5QjtBQUN6QixnREFBd0I7QUFDeEIseUNBQW9CO0FBRXBCLE1BQU0sUUFBUTtJQUNKLGFBQWEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQztJQUVwRCxJQUFJLENBQUMsR0FBVyxFQUFFLE1BQVcsSUFBSTtRQUMvQixVQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsSUFBSSxDQUFDLEdBQVcsRUFBRSxNQUFXLElBQUk7UUFDL0IsVUFBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQVcsRUFBRSxNQUFXLElBQUk7UUFDaEMsVUFBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVPLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBVyxFQUFFLE1BQVcsSUFBSTtRQUN2RCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsTUFBTSxPQUFPLEdBQUcsR0FBRyxHQUFHLGVBQWUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDcEUsTUFBTSxRQUFRLEdBQUcsR0FBRyxJQUFBLGVBQUssR0FBRSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUM7WUFDN0QsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUM1QixFQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3hCO1lBRUQsTUFBTSxRQUFRLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDL0MsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Q0FDRjtBQUVZLFFBQUEsV0FBVyxHQUFHLElBQUksUUFBUSxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGF5anMgZnJvbSBcImRheWpzXCI7XHJcbmltcG9ydCAqIGFzIGZzIGZyb20gXCJmc1wiO1xyXG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgbG9nIGZyb20gXCIuXCI7XHJcblxyXG5jbGFzcyBXcml0ZUxvZyB7XHJcbiAgcHJpdmF0ZSBsb2dGaWxlU3RhdHVzID0gcHJvY2Vzcy5lbnYuTE9HX0ZJTEVfU1RBVFVTO1xyXG5cclxuICBpbmZvKG1zZzogc3RyaW5nLCBvYmo6IGFueSA9IG51bGwpIHtcclxuICAgIGxvZy5pbmZvKG9iaiwgbXNnKTtcclxuICAgIHRoaXMubG9nV3JpdGVUb0ZpbGUobXNnLCBvYmopO1xyXG4gIH1cclxuXHJcbiAgd2Fybihtc2c6IHN0cmluZywgb2JqOiBhbnkgPSBudWxsKSB7XHJcbiAgICBsb2cud2FybihvYmosIG1zZyk7XHJcbiAgICB0aGlzLmxvZ1dyaXRlVG9GaWxlKG1zZywgKG9iaiA9IG51bGwpKTtcclxuICB9XHJcblxyXG4gIGVycm9yKG1zZzogc3RyaW5nLCBvYmo6IGFueSA9IG51bGwpIHtcclxuICAgIGxvZy5lcnJvcihvYmosIG1zZyk7XHJcbiAgICB0aGlzLmxvZ1dyaXRlVG9GaWxlKG1zZywgb2JqKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXN5bmMgbG9nV3JpdGVUb0ZpbGUobXNnOiBzdHJpbmcsIG9iajogYW55ID0gbnVsbCkge1xyXG4gICAgaWYgKHRoaXMubG9nRmlsZVN0YXR1cykge1xyXG4gICAgICBjb25zdCBtc2dEYXRhID0gYCR7bXNnfSwgPj4gT0JKID4+ICR7SlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCAyKX1gO1xyXG4gICAgICBjb25zdCBmaWxlTmFtZSA9IGAke2RheWpzKCkuZm9ybWF0KFwiWVlZWS1NTS1ERFRISC1tbVwiKX0udHh0YDtcclxuICAgICAgY29uc3QgbG9jYXRpb24gPSBgLi9sb2dzYDtcclxuICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGxvY2F0aW9uKSkge1xyXG4gICAgICAgIGZzLm1rZGlyU3luYyhsb2NhdGlvbik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnN0IGZpbGVQYXRoID0gcGF0aC5qb2luKGxvY2F0aW9uLCBmaWxlTmFtZSk7XHJcbiAgICAgIGZzLndyaXRlRmlsZShmaWxlUGF0aCwgbXNnRGF0YSwgeyBmbGFnOiBcImErXCIgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBhcGlXcml0ZUxvZyA9IG5ldyBXcml0ZUxvZygpO1xyXG4iXX0=