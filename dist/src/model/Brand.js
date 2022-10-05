"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = void 0;
const typeorm_1 = require("typeorm");
const News_1 = require("./News");
const Product_1 = require("./Product");
let Brand = class Brand {
    id;
    publicId;
    name;
    description;
    tagLine;
    logoUrl;
    website;
    products;
    news;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Brand.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "public_id", unique: true, length: 60 }),
    __metadata("design:type", String)
], Brand.prototype, "publicId", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 155, nullable: true }),
    __metadata("design:type", String)
], Brand.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Brand.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "tag_line", length: 175, nullable: true }),
    __metadata("design:type", String)
], Brand.prototype, "tagLine", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "logo_url", length: 205, nullable: true }),
    __metadata("design:type", String)
], Brand.prototype, "logoUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "web_url", length: 105, nullable: true }),
    __metadata("design:type", String)
], Brand.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Product_1.Product, (product) => product.brand),
    __metadata("design:type", Array)
], Brand.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => News_1.News, (news) => news.brand),
    __metadata("design:type", Array)
], Brand.prototype, "news", void 0);
Brand = __decorate([
    (0, typeorm_1.Entity)({ name: "brand" })
], Brand);
exports.Brand = Brand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnJhbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWwvQnJhbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBTWlCO0FBQ2pCLGlDQUE4QjtBQUM5Qix1Q0FBb0M7QUFHcEMsSUFBYSxLQUFLLEdBQWxCLE1BQWEsS0FBSztJQUVoQixFQUFFLENBQVM7SUFHWCxRQUFRLENBQVE7SUFHaEIsSUFBSSxDQUFTO0lBR2IsV0FBVyxDQUFTO0lBR3BCLE9BQU8sQ0FBUztJQUdoQixPQUFPLENBQVM7SUFHaEIsT0FBTyxDQUFTO0lBR2hCLFFBQVEsQ0FBWTtJQUdwQixJQUFJLENBQVM7Q0FDZCxDQUFBO0FBekJDO0lBREMsSUFBQSxnQ0FBc0IsR0FBRTs7aUNBQ2Q7QUFHWDtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUUsTUFBTSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsRUFBRSxFQUFDLENBQUM7O3VDQUNuQztBQUdoQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFDLElBQUksRUFBQyxDQUFDOzttQ0FDekI7QUFHYjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFDLElBQUksRUFBQyxDQUFDOzswQ0FDakI7QUFHcEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFDLElBQUksRUFBRSxDQUFDOztzQ0FDdkM7QUFHaEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFDLElBQUksRUFBRSxDQUFDOztzQ0FDekM7QUFHaEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFDLElBQUksRUFBRSxDQUFDOztzQ0FDeEM7QUFHaEI7SUFEQyxJQUFBLG1CQUFTLEVBQUMsR0FBRyxFQUFFLENBQUMsaUJBQU8sRUFBRSxDQUFDLE9BQWdCLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7O3VDQUMxQztBQUdwQjtJQURDLElBQUEsb0JBQVUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxXQUFJLEVBQUUsQ0FBQyxJQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7O21DQUN0QztBQTFCRixLQUFLO0lBRGpCLElBQUEsZ0JBQU0sRUFBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQztHQUNiLEtBQUssQ0EyQmpCO0FBM0JZLHNCQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgRW50aXR5LFxyXG4gIE1hbnlUb01hbnksXHJcbiAgT25lVG9NYW55LFxyXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXHJcbn0gZnJvbSBcInR5cGVvcm1cIjtcclxuaW1wb3J0IHsgTmV3cyB9IGZyb20gXCIuL05ld3NcIjtcclxuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuL1Byb2R1Y3RcIjtcclxuXHJcbkBFbnRpdHkoeyBuYW1lOiBcImJyYW5kXCIgfSlcclxuZXhwb3J0IGNsYXNzIEJyYW5kIHtcclxuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXHJcbiAgaWQ6IG51bWJlcjtcclxuXHJcbiAgQENvbHVtbih7bmFtZTpcInB1YmxpY19pZFwiLCB1bmlxdWU6dHJ1ZSwgbGVuZ3RoOjYwfSlcclxuICBwdWJsaWNJZDpzdHJpbmc7XHJcblxyXG4gIEBDb2x1bW4oeyBsZW5ndGg6IDE1NSwgbnVsbGFibGU6dHJ1ZX0pXHJcbiAgbmFtZTogc3RyaW5nO1xyXG5cclxuICBAQ29sdW1uKHt0eXBlOlwidGV4dFwiLCBudWxsYWJsZTp0cnVlfSlcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG5cclxuICBAQ29sdW1uKHtuYW1lOlwidGFnX2xpbmVcIiwgbGVuZ3RoOiAxNzUsIG51bGxhYmxlOnRydWUgfSlcclxuICB0YWdMaW5lOiBzdHJpbmc7XHJcblxyXG4gIEBDb2x1bW4oeyBuYW1lOiBcImxvZ29fdXJsXCIsIGxlbmd0aDogMjA1LCBudWxsYWJsZTp0cnVlIH0pXHJcbiAgbG9nb1VybDogc3RyaW5nO1xyXG5cclxuICBAQ29sdW1uKHsgbmFtZTogXCJ3ZWJfdXJsXCIsIGxlbmd0aDogMTA1LCBudWxsYWJsZTp0cnVlIH0pXHJcbiAgd2Vic2l0ZTogc3RyaW5nO1xyXG5cclxuICBAT25lVG9NYW55KCgpID0+IFByb2R1Y3QsIChwcm9kdWN0OiBQcm9kdWN0KSA9PiBwcm9kdWN0LmJyYW5kKVxyXG4gIHByb2R1Y3RzOiBQcm9kdWN0W107XHJcblxyXG4gIEBNYW55VG9NYW55KCgpID0+IE5ld3MsIChuZXdzOiBOZXdzKSA9PiBuZXdzLmJyYW5kKVxyXG4gIG5ld3M6IE5ld3NbXTtcclxufVxyXG4iXX0=