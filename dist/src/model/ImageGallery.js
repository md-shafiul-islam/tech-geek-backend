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
exports.ImageGallery = void 0;
const typeorm_1 = require("typeorm");
const News_1 = require("./News");
const Post_1 = require("./Post");
const Product_1 = require("./Product");
let ImageGallery = class ImageGallery {
    id;
    name;
    altTag;
    title;
    location;
    products;
    posts;
    news;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ImageGallery.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 155 }),
    __metadata("design:type", String)
], ImageGallery.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "alt_tag", length: 105 }),
    __metadata("design:type", String)
], ImageGallery.prototype, "altTag", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 105 }),
    __metadata("design:type", String)
], ImageGallery.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 205 }),
    __metadata("design:type", String)
], ImageGallery.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Product_1.Product),
    __metadata("design:type", Array)
], ImageGallery.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Post_1.Post),
    __metadata("design:type", Array)
], ImageGallery.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => News_1.News),
    __metadata("design:type", News_1.News)
], ImageGallery.prototype, "news", void 0);
ImageGallery = __decorate([
    (0, typeorm_1.Entity)("image_gallery")
], ImageGallery);
exports.ImageGallery = ImageGallery;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1hZ2VHYWxsZXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZGVsL0ltYWdlR2FsbGVyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FRaUI7QUFDakIsaUNBQThCO0FBQzlCLGlDQUE4QjtBQUM5Qix1Q0FBb0M7QUFHcEMsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQUV2QixFQUFFLENBQVM7SUFHWCxJQUFJLENBQVM7SUFHYixNQUFNLENBQVM7SUFHZixLQUFLLENBQVM7SUFHZCxRQUFRLENBQVM7SUFHakIsUUFBUSxDQUFZO0lBR3BCLEtBQUssQ0FBUztJQUdkLElBQUksQ0FBTztDQUNaLENBQUE7QUF0QkM7SUFEQyxJQUFBLGdDQUFzQixHQUFFOzt3Q0FDZDtBQUdYO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDOzswQ0FDWDtBQUdiO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7OzRDQUMxQjtBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDOzsyQ0FDVjtBQUdkO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDOzs4Q0FDUDtBQUdqQjtJQURDLElBQUEsb0JBQVUsRUFBQyxHQUFFLEVBQUUsQ0FBQSxpQkFBTyxDQUFDOzs4Q0FDSjtBQUdwQjtJQURDLElBQUEsb0JBQVUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxXQUFJLENBQUM7OzJDQUNUO0FBR2Q7SUFEQyxJQUFBLG9CQUFVLEVBQUMsR0FBRyxFQUFFLENBQUMsV0FBSSxDQUFDOzhCQUNqQixXQUFJOzBDQUFDO0FBdkJBLFlBQVk7SUFEeEIsSUFBQSxnQkFBTSxFQUFDLGVBQWUsQ0FBQztHQUNYLFlBQVksQ0F3QnhCO0FBeEJZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgRW50aXR5LFxyXG4gIEpvaW5Db2x1bW4sXHJcbiAgSm9pblRhYmxlLFxyXG4gIE1hbnlUb01hbnksXHJcbiAgTWFueVRvT25lLFxyXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXHJcbn0gZnJvbSBcInR5cGVvcm1cIjtcclxuaW1wb3J0IHsgTmV3cyB9IGZyb20gXCIuL05ld3NcIjtcclxuaW1wb3J0IHsgUG9zdCB9IGZyb20gXCIuL1Bvc3RcIjtcclxuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuL1Byb2R1Y3RcIjtcclxuXHJcbkBFbnRpdHkoXCJpbWFnZV9nYWxsZXJ5XCIpXHJcbmV4cG9ydCBjbGFzcyBJbWFnZUdhbGxlcnkge1xyXG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcclxuICBpZDogbnVtYmVyO1xyXG5cclxuICBAQ29sdW1uKHsgbGVuZ3RoOiAxNTUgfSlcclxuICBuYW1lOiBzdHJpbmc7XHJcblxyXG4gIEBDb2x1bW4oeyBuYW1lOiBcImFsdF90YWdcIiwgbGVuZ3RoOiAxMDUgfSlcclxuICBhbHRUYWc6IHN0cmluZztcclxuXHJcbiAgQENvbHVtbih7IGxlbmd0aDogMTA1IH0pXHJcbiAgdGl0bGU6IHN0cmluZztcclxuXHJcbiAgQENvbHVtbih7IGxlbmd0aDogMjA1IH0pXHJcbiAgbG9jYXRpb246IHN0cmluZztcclxuXHJcbiAgQE1hbnlUb01hbnkoKCk9PlByb2R1Y3QpXHJcbiAgcHJvZHVjdHM6IFByb2R1Y3RbXTtcclxuXHJcbiAgQE1hbnlUb01hbnkoKCkgPT4gUG9zdClcclxuICBwb3N0czogUG9zdFtdO1xyXG5cclxuICBATWFueVRvTWFueSgoKSA9PiBOZXdzKVxyXG4gIG5ld3M6IE5ld3M7XHJcbn1cclxuIl19