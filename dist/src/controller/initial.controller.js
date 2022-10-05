"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initialController = void 0;
const path_1 = __importDefault(require("path"));
const csvToJson = require("csvtojson");
const xlsxj = require("xlsx-to-json");
const writeLog_1 = require("../logger/writeLog");
const product_mapper_1 = require("../mapper/product.mapper");
const product_service_1 = require("../service/product.service");
const respFormat_1 = __importDefault(require("../utils/response/respFormat"));
class InitialController {
    // async getFileAndConvertToJSON() {
    //   const { loc, fileName } = req.query;
    //   console.log("Initial File Req QUery ", req.query);
    //   // const filePath = path.join(__dirname, `${sprt}..${sprt}..${sprt}`);
    //   // const csvToJsonFilePath = `${filePath}${fileName}`;
    //   // const csvToJsonFile = await csvToJson.csv().fromFile(csvToJsonFilePath);
    //   return csvToJsonFile;
    // }
    // initSaveAllGeniric() {
    //   this.saveAllGenericItem();
    // }
    async convertFile(req, resp) {
        console.log("Reuest Query ", req.query);
        const { loc, fileName } = req.query;
        try {
            const sprt = path_1.default.sep;
            console.log(" __dirname ", __dirname);
            const filePath = path_1.default.join(__dirname, `${sprt}..${sprt}..${sprt}data-file${sprt}`);
            console.log("File Path ", filePath);
            const xlsxToJsonFilePath = `${filePath}${loc}.xlsx`;
            // const jsonFile = await csvToJson.csv().fromFile(`${filePath}${fileName}`);
            let xlsxToJson = [];
            console.log("Befor xlsxj Run ...");
            xlsxj({
                input: xlsxToJsonFilePath,
                output: `${fileName}.json`,
            }, function (err, result) {
                if (err) {
                    writeLog_1.apiWriteLog.error("JSON Convertion Error ", err);
                    resp.send((0, respFormat_1.default)(null, `JSON Convertion Error  `, true));
                }
                else {
                    xlsxToJson = result;
                    resp.send((0, respFormat_1.default)(result, `JSON Response ${result?.length}`, true));
                }
            });
            console.log("Befor xlsxj Run ...");
        }
        catch (error) {
            console.log("Convert File Error ", error);
            resp.status(200);
            resp.send((0, respFormat_1.default)(null, "Convert File failed", false));
        }
    }
    async saveAllProduct(req, resp) {
        try {
            console.log("Save All Product Run ........");
            const productsJson = req.body?.products;
            console.log("Product Mapping Start ....");
            const products = [];
            if (productsJson) {
                // productsJson.length
                console.log("Product JSON Size, ", productsJson.length);
                for (let index = 0; index < productsJson.length; index++) {
                    const product = await product_mapper_1.productMapper.mapProductByJSON(productsJson[index]);
                    if (product !== null) {
                        console.log("Befor Push Mapped Product ...");
                        products.push(product);
                    }
                    else {
                        console.log("Befor Push Mapped Product Is Null ...");
                    }
                    console.log("Product Mapping Status ....", index);
                }
                console.log("After Product Mapping Size ", products?.length);
                const dbProducts = [];
                for (let i = 0; i < products.length; i++) {
                    console.time(`Save ${i}`);
                    const dbProduct = await product_service_1.productService.saveViaJson(products[i]);
                    console.timeEnd(`Save ${i}`);
                    if (dbProduct !== undefined && dbProduct !== null) {
                        dbProducts.push(dbProduct);
                    }
                }
                console.log("After Save Product ... ", dbProducts?.length);
            }
            console.log("After Product Save ");
            resp.status(200);
            resp.send((0, respFormat_1.default)(products, `Product Save Size ${products?.length}`, true));
        }
        catch (error) {
            console.log("Products Save Error ", error);
            resp.status(200);
            resp.send((0, respFormat_1.default)(null, "Product Save Failed", false));
        }
    }
}
exports.initialController = new InitialController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdGlhbC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbnRyb2xsZXIvaW5pdGlhbC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLGdEQUF3QjtBQUV4QixNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFdkMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBRXRDLGlEQUFpRDtBQUNqRCw2REFBeUQ7QUFFekQsZ0VBQTREO0FBQzVELDhFQUFzRDtBQUV0RCxNQUFNLGlCQUFpQjtJQUNyQixvQ0FBb0M7SUFDcEMseUNBQXlDO0lBRXpDLHVEQUF1RDtJQUV2RCwyRUFBMkU7SUFFM0UsMkRBQTJEO0lBQzNELGdGQUFnRjtJQUNoRiwwQkFBMEI7SUFDMUIsSUFBSTtJQUVKLHlCQUF5QjtJQUN6QiwrQkFBK0I7SUFDL0IsSUFBSTtJQUVKLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBWSxFQUFFLElBQWM7UUFDNUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXhDLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUVwQyxJQUFJO1lBQ0YsTUFBTSxJQUFJLEdBQUcsY0FBSSxDQUFDLEdBQUcsQ0FBQztZQUV0QixPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUV0QyxNQUFNLFFBQVEsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUN4QixTQUFTLEVBQ1QsR0FBRyxJQUFJLEtBQUssSUFBSSxLQUFLLElBQUksWUFBWSxJQUFJLEVBQUUsQ0FDNUMsQ0FBQztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3BDLE1BQU0sa0JBQWtC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LENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNoRSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFFN0IsSUFBSSxTQUFTLEtBQUssU0FBUyxJQUFJLFNBQVMsS0FBSyxJQUFJLEVBQUU7d0JBQ2pELFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQzVCO2lCQUNGO2dCQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2FBQzVEO1lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLElBQUksQ0FDUCxJQUFBLG9CQUFVLEVBQUMsUUFBUSxFQUFFLHFCQUFxQixRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQ3BFLENBQUM7U0FDSDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBQSxvQkFBVSxFQUFDLElBQUksRUFBRSxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzNEO0lBQ0gsQ0FBQztDQUNGO0FBRVksUUFBQSxpQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZXF1ZXN0LCBSZXNwb25zZSB9IGZyb20gXCJleHByZXNzXCI7XHJcbmltcG9ydCBmcyBmcm9tIFwiZnNcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuXHJcbmNvbnN0IGNzdlRvSnNvbiA9IHJlcXVpcmUoXCJjc3Z0b2pzb25cIik7XHJcblxyXG5jb25zdCB4bHN4aiA9IHJlcXVpcmUoXCJ4bHN4LXRvLWpzb25cIik7XHJcblxyXG5pbXBvcnQgeyBhcGlXcml0ZUxvZyB9IGZyb20gXCIuLi9sb2dnZXIvd3JpdGVMb2dcIjtcclxuaW1wb3J0IHsgcHJvZHVjdE1hcHBlciB9IGZyb20gXCIuLi9tYXBwZXIvcHJvZHVjdC5tYXBwZXJcIjtcclxuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuLi9tb2RlbC9Qcm9kdWN0XCI7XHJcbmltcG9ydCB7IHByb2R1Y3RTZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2UvcHJvZHVjdC5zZXJ2aWNlXCI7XHJcbmltcG9ydCByZXNwRm9ybWF0IGZyb20gXCIuLi91dGlscy9yZXNwb25zZS9yZXNwRm9ybWF0XCI7XHJcblxyXG5jbGFzcyBJbml0aWFsQ29udHJvbGxlciB7XHJcbiAgLy8gYXN5bmMgZ2V0RmlsZUFuZENvbnZlcnRUb0pTT04oKSB7XHJcbiAgLy8gICBjb25zdCB7IGxvYywgZmlsZU5hbWUgfSA9IHJlcS5xdWVyeTtcclxuXHJcbiAgLy8gICBjb25zb2xlLmxvZyhcIkluaXRpYWwgRmlsZSBSZXEgUVVlcnkgXCIsIHJlcS5xdWVyeSk7XHJcblxyXG4gIC8vICAgLy8gY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oX19kaXJuYW1lLCBgJHtzcHJ0fS4uJHtzcHJ0fS4uJHtzcHJ0fWApO1xyXG5cclxuICAvLyAgIC8vIGNvbnN0IGNzdlRvSnNvbkZpbGVQYXRoID0gYCR7ZmlsZVBhdGh9JHtmaWxlTmFtZX1gO1xyXG4gIC8vICAgLy8gY29uc3QgY3N2VG9Kc29uRmlsZSA9IGF3YWl0IGNzdlRvSnNvbi5jc3YoKS5mcm9tRmlsZShjc3ZUb0pzb25GaWxlUGF0aCk7XHJcbiAgLy8gICByZXR1cm4gY3N2VG9Kc29uRmlsZTtcclxuICAvLyB9XHJcblxyXG4gIC8vIGluaXRTYXZlQWxsR2VuaXJpYygpIHtcclxuICAvLyAgIHRoaXMuc2F2ZUFsbEdlbmVyaWNJdGVtKCk7XHJcbiAgLy8gfVxyXG5cclxuICBhc3luYyBjb252ZXJ0RmlsZShyZXE6IFJlcXVlc3QsIHJlc3A6IFJlc3BvbnNlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhcIlJldWVzdCBRdWVyeSBcIiwgcmVxLnF1ZXJ5KTtcclxuXHJcbiAgICBjb25zdCB7IGxvYywgZmlsZU5hbWUgfSA9IHJlcS5xdWVyeTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBzcHJ0ID0gcGF0aC5zZXA7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcIiBfX2Rpcm5hbWUgXCIsIF9fZGlybmFtZSk7XHJcblxyXG4gICAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGguam9pbihcclxuICAgICAgICBfX2Rpcm5hbWUsXHJcbiAgICAgICAgYCR7c3BydH0uLiR7c3BydH0uLiR7c3BydH1kYXRhLWZpbGUke3NwcnR9YFxyXG4gICAgICApO1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkZpbGUgUGF0aCBcIiwgZmlsZVBhdGgpO1xyXG4gICAgICBjb25zdCB4bHN4VG9Kc29uRmlsZVBhdGggPSBgJHtmaWxlUGF0aH0ke2xvY30ueGxzeGA7XHJcblxyXG4gICAgICAvLyBjb25zdCBqc29uRmlsZSA9IGF3YWl0IGNzdlRvSnNvbi5jc3YoKS5mcm9tRmlsZShgJHtmaWxlUGF0aH0ke2ZpbGVOYW1lfWApO1xyXG4gICAgICBsZXQgeGxzeFRvSnNvbjogYW55ID0gW107XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiQmVmb3IgeGxzeGogUnVuIC4uLlwiKTtcclxuICAgICAgeGxzeGooXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaW5wdXQ6IHhsc3hUb0pzb25GaWxlUGF0aCxcclxuICAgICAgICAgIG91dHB1dDogYCR7ZmlsZU5hbWV9Lmpzb25gLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZnVuY3Rpb24gKGVycjogYW55LCByZXN1bHQ6IGFueSkge1xyXG4gICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkpTT04gQ29udmVydGlvbiBFcnJvciBcIiwgZXJyKTtcclxuICAgICAgICAgICAgcmVzcC5zZW5kKHJlc3BGb3JtYXQobnVsbCwgYEpTT04gQ29udmVydGlvbiBFcnJvciAgYCwgdHJ1ZSkpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgeGxzeFRvSnNvbiA9IHJlc3VsdDtcclxuICAgICAgICAgICAgcmVzcC5zZW5kKFxyXG4gICAgICAgICAgICAgIHJlc3BGb3JtYXQocmVzdWx0LCBgSlNPTiBSZXNwb25zZSAke3Jlc3VsdD8ubGVuZ3RofWAsIHRydWUpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkJlZm9yIHhsc3hqIFJ1biAuLi5cIik7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkNvbnZlcnQgRmlsZSBFcnJvciBcIiwgZXJyb3IpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICByZXNwLnNlbmQocmVzcEZvcm1hdChudWxsLCBcIkNvbnZlcnQgRmlsZSBmYWlsZWRcIiwgZmFsc2UpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIFxyXG4gIGFzeW5jIHNhdmVBbGxQcm9kdWN0KHJlcTogUmVxdWVzdCwgcmVzcDogUmVzcG9uc2UpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiU2F2ZSBBbGwgUHJvZHVjdCBSdW4gLi4uLi4uLi5cIik7XHJcbiAgICAgIGNvbnN0IHByb2R1Y3RzSnNvbiA9IHJlcS5ib2R5Py5wcm9kdWN0cztcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFwiUHJvZHVjdCBNYXBwaW5nIFN0YXJ0IC4uLi5cIik7XHJcblxyXG4gICAgICBjb25zdCBwcm9kdWN0czogUHJvZHVjdFtdID0gW107XHJcblxyXG4gICAgICBpZiAocHJvZHVjdHNKc29uKSB7XHJcbiAgICAgICAgLy8gcHJvZHVjdHNKc29uLmxlbmd0aFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiUHJvZHVjdCBKU09OIFNpemUsIFwiLCBwcm9kdWN0c0pzb24ubGVuZ3RoKTtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgcHJvZHVjdHNKc29uLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgY29uc3QgcHJvZHVjdCA9IGF3YWl0IHByb2R1Y3RNYXBwZXIubWFwUHJvZHVjdEJ5SlNPTihcclxuICAgICAgICAgICAgcHJvZHVjdHNKc29uW2luZGV4XVxyXG4gICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICBpZiAocHJvZHVjdCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkJlZm9yIFB1c2ggTWFwcGVkIFByb2R1Y3QgLi4uXCIpO1xyXG4gICAgICAgICAgICBwcm9kdWN0cy5wdXNoKHByb2R1Y3QpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJCZWZvciBQdXNoIE1hcHBlZCBQcm9kdWN0IElzIE51bGwgLi4uXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJQcm9kdWN0IE1hcHBpbmcgU3RhdHVzIC4uLi5cIiwgaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFmdGVyIFByb2R1Y3QgTWFwcGluZyBTaXplIFwiLCBwcm9kdWN0cz8ubGVuZ3RoKTtcclxuICAgICAgICBjb25zdCBkYlByb2R1Y3RzOiBQcm9kdWN0W10gPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9kdWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgY29uc29sZS50aW1lKGBTYXZlICR7aX1gKTtcclxuICAgICAgICAgIGNvbnN0IGRiUHJvZHVjdCA9IGF3YWl0IHByb2R1Y3RTZXJ2aWNlLnNhdmVWaWFKc29uKHByb2R1Y3RzW2ldKTtcclxuICAgICAgICAgIGNvbnNvbGUudGltZUVuZChgU2F2ZSAke2l9YCk7XHJcblxyXG4gICAgICAgICAgaWYgKGRiUHJvZHVjdCAhPT0gdW5kZWZpbmVkICYmIGRiUHJvZHVjdCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBkYlByb2R1Y3RzLnB1c2goZGJQcm9kdWN0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWZ0ZXIgU2F2ZSBQcm9kdWN0IC4uLiBcIiwgZGJQcm9kdWN0cz8ubGVuZ3RoKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc29sZS5sb2coXCJBZnRlciBQcm9kdWN0IFNhdmUgXCIpO1xyXG4gICAgICByZXNwLnN0YXR1cygyMDApO1xyXG4gICAgICByZXNwLnNlbmQoXHJcbiAgICAgICAgcmVzcEZvcm1hdChwcm9kdWN0cywgYFByb2R1Y3QgU2F2ZSBTaXplICR7cHJvZHVjdHM/Lmxlbmd0aH1gLCB0cnVlKVxyXG4gICAgICApO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJQcm9kdWN0cyBTYXZlIEVycm9yIFwiLCBlcnJvcik7XHJcbiAgICAgIHJlc3Auc3RhdHVzKDIwMCk7XHJcbiAgICAgIHJlc3Auc2VuZChyZXNwRm9ybWF0KG51bGwsIFwiUHJvZHVjdCBTYXZlIEZhaWxlZFwiLCBmYWxzZSkpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGluaXRpYWxDb250cm9sbGVyID0gbmV3IEluaXRpYWxDb250cm9sbGVyKCk7XHJcbiJdfQ==