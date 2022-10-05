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
exports.MetaDeta = void 0;
const typeorm_1 = require("typeorm");
const News_1 = require("./News");
const Post_1 = require("./Post");
const Product_1 = require("./Product");
let MetaDeta = class MetaDeta {
    id;
    name;
    content;
    products;
    posts;
    news;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MetaDeta.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 75 }),
    __metadata("design:type", String)
], MetaDeta.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", default: null }),
    __metadata("design:type", String)
], MetaDeta.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Product_1.Product),
    __metadata("design:type", Array)
], MetaDeta.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Post_1.Post),
    __metadata("design:type", Array)
], MetaDeta.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => News_1.News),
    __metadata("design:type", Array)
], MetaDeta.prototype, "news", void 0);
MetaDeta = __decorate([
    (0, typeorm_1.Entity)({ name: "meta_data" })
], MetaDeta);
exports.MetaDeta = MetaDeta;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0YURhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWwvTWV0YURhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQTZFO0FBQzdFLGlDQUE4QjtBQUM5QixpQ0FBOEI7QUFDOUIsdUNBQW9DO0FBSXBDLElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVE7SUFHakIsRUFBRSxDQUFPO0lBR1QsSUFBSSxDQUFPO0lBR1gsT0FBTyxDQUFPO0lBR2QsUUFBUSxDQUFVO0lBR2xCLEtBQUssQ0FBTztJQUdaLElBQUksQ0FBTztDQUdkLENBQUE7QUFsQkc7SUFEQyxJQUFBLGdDQUFzQixHQUFFOztvQ0FDaEI7QUFHVDtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLE1BQU0sRUFBQyxFQUFFLEVBQUMsQ0FBQzs7c0NBQ1Q7QUFHWDtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUUsT0FBTyxFQUFDLElBQUksRUFBQyxDQUFDOzt5Q0FDdEI7QUFHZDtJQURDLElBQUEsb0JBQVUsRUFBQyxHQUFFLEVBQUUsQ0FBQSxpQkFBTyxDQUFDOzswQ0FDTjtBQUdsQjtJQURDLElBQUEsb0JBQVUsRUFBQyxHQUFFLEVBQUUsQ0FBQSxXQUFJLENBQUM7O3VDQUNUO0FBR1o7SUFEQyxJQUFBLG9CQUFVLEVBQUMsR0FBRSxFQUFFLENBQUEsV0FBSSxDQUFDOztzQ0FDVjtBQWxCRixRQUFRO0lBRHBCLElBQUEsZ0JBQU0sRUFBQyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsQ0FBQztHQUNkLFFBQVEsQ0FxQnBCO0FBckJZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBFbnRpdHksIE1hbnlUb01hbnksIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4gfSBmcm9tIFwidHlwZW9ybVwiO1xyXG5pbXBvcnQgeyBOZXdzIH0gZnJvbSBcIi4vTmV3c1wiO1xyXG5pbXBvcnQgeyBQb3N0IH0gZnJvbSBcIi4vUG9zdFwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSBcIi4vUHJvZHVjdFwiO1xyXG5cclxuXHJcbkBFbnRpdHkoe25hbWU6XCJtZXRhX2RhdGFcIn0pXHJcbmV4cG9ydCBjbGFzcyBNZXRhRGV0YXtcclxuXHJcbiAgICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXHJcbiAgICBpZDpudW1iZXJcclxuXHJcbiAgICBAQ29sdW1uKHtsZW5ndGg6NzV9KVxyXG4gICAgbmFtZTpzdHJpbmdcclxuXHJcbiAgICBAQ29sdW1uKHt0eXBlOlwidGV4dFwiLCBkZWZhdWx0Om51bGx9KVxyXG4gICAgY29udGVudDpzdHJpbmdcclxuXHJcbiAgICBATWFueVRvTWFueSgoKT0+UHJvZHVjdClcclxuICAgIHByb2R1Y3RzOlByb2R1Y3RbXVxyXG5cclxuICAgIEBNYW55VG9NYW55KCgpPT5Qb3N0KVxyXG4gICAgcG9zdHM6UG9zdFtdXHJcblxyXG4gICAgQE1hbnlUb01hbnkoKCk9Pk5ld3MpXHJcbiAgICBuZXdzOk5ld3NbXVxyXG5cclxuXHJcbn0iXX0=