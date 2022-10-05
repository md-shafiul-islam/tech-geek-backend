"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteMapController = void 0;
const writeLog_1 = require("../logger/writeLog");
const sitemap_service_1 = require("../service/sitemap.service");
const respFormat_1 = __importDefault(require("../utils/response/respFormat"));
class SiteMapController {
    async getAllItemsCount(req, resp) {
        try {
            const siteMapResp = await sitemap_service_1.siteMapService.getAllItemsCount();
            if (siteMapResp) {
                resp.status(200);
                resp.send((0, respFormat_1.default)(siteMapResp, "Site Map Items Found", true));
            }
            else {
                resp.status(200);
                resp.send((0, respFormat_1.default)(siteMapResp, "Site Map Items Not Found", true));
            }
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Site Map Items Error ", error);
            resp.status(200);
            resp.send((0, respFormat_1.default)(null, "Site Map Items failed", false));
        }
    }
}
exports.siteMapController = new SiteMapController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l0ZW1hcC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRyb2xsZXIvc2l0ZW1hcC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLGlEQUFpRDtBQUNqRCxnRUFBNEQ7QUFDNUQsOEVBQXNEO0FBRXRELE1BQU0saUJBQWlCO0lBQ3JCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFZLEVBQUUsSUFBYztRQUNqRCxJQUFJO1lBQ0YsTUFBTSxXQUFXLEdBQUcsTUFBTSxnQ0FBYyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFFNUQsSUFBSSxXQUFXLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFBLG9CQUFVLEVBQUMsV0FBVyxFQUFFLHNCQUFzQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDbEU7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFBLG9CQUFVLEVBQUMsV0FBVyxFQUFFLDBCQUEwQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDdEU7U0FDRjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2Qsc0JBQVcsQ0FBQyxLQUFLLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDbEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUEsb0JBQVUsRUFBQyxJQUFJLEVBQUUsdUJBQXVCLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUM3RDtJQUNILENBQUM7Q0FDRjtBQUVZLFFBQUEsaUJBQWlCLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVxdWVzdCwgUmVzcG9uc2UgfSBmcm9tIFwiZXhwcmVzc1wiO1xyXG5pbXBvcnQgeyBhcGlXcml0ZUxvZyB9IGZyb20gXCIuLi9sb2dnZXIvd3JpdGVMb2dcIjtcclxuaW1wb3J0IHsgc2l0ZU1hcFNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZS9zaXRlbWFwLnNlcnZpY2VcIjtcclxuaW1wb3J0IHJlc3BGb3JtYXQgZnJvbSBcIi4uL3V0aWxzL3Jlc3BvbnNlL3Jlc3BGb3JtYXRcIjtcclxuXHJcbmNsYXNzIFNpdGVNYXBDb250cm9sbGVyIHtcclxuICBhc3luYyBnZXRBbGxJdGVtc0NvdW50KHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHNpdGVNYXBSZXNwID0gYXdhaXQgc2l0ZU1hcFNlcnZpY2UuZ2V0QWxsSXRlbXNDb3VudCgpO1xyXG5cclxuICAgICAgaWYgKHNpdGVNYXBSZXNwKSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAwKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChzaXRlTWFwUmVzcCwgXCJTaXRlIE1hcCBJdGVtcyBGb3VuZFwiLCB0cnVlKSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzcC5zdGF0dXMoMjAwKTtcclxuICAgICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChzaXRlTWFwUmVzcCwgXCJTaXRlIE1hcCBJdGVtcyBOb3QgRm91bmRcIiwgdHJ1ZSkpO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIlNpdGUgTWFwIEl0ZW1zIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwiU2l0ZSBNYXAgSXRlbXMgZmFpbGVkXCIsIGZhbHNlKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3Qgc2l0ZU1hcENvbnRyb2xsZXIgPSBuZXcgU2l0ZU1hcENvbnRyb2xsZXIoKTtcclxuIl19