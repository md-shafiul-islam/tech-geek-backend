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
exports.RatingItem = void 0;
const typeorm_1 = require("typeorm");
const RateKey_1 = require("./RateKey");
const Rating_1 = require("./Rating");
let RatingItem = class RatingItem {
    id;
    rateKey;
    rating;
    maxValue;
    minValue;
    inValue;
    description;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RatingItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => RateKey_1.RateKey, (rateKey) => rateKey.id),
    (0, typeorm_1.JoinColumn)({ name: "rate_key", referencedColumnName: "id" }),
    __metadata("design:type", RateKey_1.RateKey)
], RatingItem.prototype, "rateKey", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Rating_1.Rating, (rating) => rating.id),
    (0, typeorm_1.JoinColumn)({ name: "rating", referencedColumnName: "id" }),
    __metadata("design:type", Rating_1.Rating)
], RatingItem.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "max_value" }),
    __metadata("design:type", Number)
], RatingItem.prototype, "maxValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "min_value" }),
    __metadata("design:type", Number)
], RatingItem.prototype, "minValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "input_value" }),
    __metadata("design:type", Number)
], RatingItem.prototype, "inValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "description", nullable: true }),
    __metadata("design:type", String)
], RatingItem.prototype, "description", void 0);
RatingItem = __decorate([
    (0, typeorm_1.Entity)({ name: "rating_item" })
], RatingItem);
exports.RatingItem = RatingItem;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmF0aW5nSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbC9SYXRpbmdJdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF3RjtBQUN4Rix1Q0FBb0M7QUFDcEMscUNBQWtDO0FBSWxDLElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7SUFHbkIsRUFBRSxDQUFRO0lBSVYsT0FBTyxDQUFTO0lBSWhCLE1BQU0sQ0FBUTtJQUdkLFFBQVEsQ0FBUTtJQUdoQixRQUFRLENBQVE7SUFHaEIsT0FBTyxDQUFRO0lBR2YsV0FBVyxDQUFRO0NBQ3RCLENBQUE7QUFyQkc7SUFEQyxJQUFBLGdDQUFzQixHQUFFOztzQ0FDZjtBQUlWO0lBRkMsSUFBQSxtQkFBUyxFQUFDLEdBQUUsRUFBRSxDQUFBLGlCQUFPLEVBQUUsQ0FBQyxPQUFlLEVBQUMsRUFBRSxDQUFBLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFDckQsSUFBQSxvQkFBVSxFQUFDLEVBQUMsSUFBSSxFQUFDLFVBQVUsRUFBRSxvQkFBb0IsRUFBQyxJQUFJLEVBQUMsQ0FBQzs4QkFDakQsaUJBQU87MkNBQUM7QUFJaEI7SUFGQyxJQUFBLG1CQUFTLEVBQUMsR0FBRSxFQUFFLENBQUEsZUFBTSxFQUFFLENBQUMsTUFBYSxFQUFDLEVBQUUsQ0FBQSxNQUFNLENBQUMsRUFBRSxDQUFDO0lBQ2pELElBQUEsb0JBQVUsRUFBQyxFQUFDLElBQUksRUFBQyxRQUFRLEVBQUUsb0JBQW9CLEVBQUMsSUFBSSxFQUFDLENBQUM7OEJBQ2hELGVBQU07MENBQUM7QUFHZDtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUMsQ0FBQzs7NENBQ1g7QUFHaEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLENBQUM7OzRDQUNYO0FBR2hCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsSUFBSSxFQUFDLGFBQWEsRUFBQyxDQUFDOzsyQ0FDZDtBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsSUFBSSxFQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUMsSUFBSSxFQUFDLENBQUM7OytDQUN6QjtBQXZCVixVQUFVO0lBRHRCLElBQUEsZ0JBQU0sRUFBQyxFQUFDLElBQUksRUFBQyxhQUFhLEVBQUMsQ0FBQztHQUNoQixVQUFVLENBd0J0QjtBQXhCWSxnQ0FBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgRW50aXR5LCBKb2luQ29sdW1uLCBNYW55VG9PbmUsIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4gfSBmcm9tIFwidHlwZW9ybVwiO1xyXG5pbXBvcnQgeyBSYXRlS2V5IH0gZnJvbSBcIi4vUmF0ZUtleVwiO1xyXG5pbXBvcnQgeyBSYXRpbmcgfSBmcm9tIFwiLi9SYXRpbmdcIjtcclxuXHJcblxyXG5ARW50aXR5KHtuYW1lOlwicmF0aW5nX2l0ZW1cIn0pXHJcbmV4cG9ydCBjbGFzcyBSYXRpbmdJdGVtIHtcclxuXHJcbiAgICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXHJcbiAgICBpZDpudW1iZXI7XHJcblxyXG4gICAgQE1hbnlUb09uZSgoKT0+UmF0ZUtleSwgKHJhdGVLZXk6UmF0ZUtleSk9PnJhdGVLZXkuaWQpXHJcbiAgICBASm9pbkNvbHVtbih7bmFtZTpcInJhdGVfa2V5XCIsIHJlZmVyZW5jZWRDb2x1bW5OYW1lOlwiaWRcIn0pXHJcbiAgICByYXRlS2V5OlJhdGVLZXk7XHJcblxyXG4gICAgQE1hbnlUb09uZSgoKT0+UmF0aW5nLCAocmF0aW5nOlJhdGluZyk9PnJhdGluZy5pZClcclxuICAgIEBKb2luQ29sdW1uKHtuYW1lOlwicmF0aW5nXCIsIHJlZmVyZW5jZWRDb2x1bW5OYW1lOlwiaWRcIn0pXHJcbiAgICByYXRpbmc6UmF0aW5nO1xyXG5cclxuICAgIEBDb2x1bW4oe25hbWU6XCJtYXhfdmFsdWVcIn0pXHJcbiAgICBtYXhWYWx1ZTpudW1iZXI7XHJcblxyXG4gICAgQENvbHVtbih7bmFtZTpcIm1pbl92YWx1ZVwifSlcclxuICAgIG1pblZhbHVlOm51bWJlcjtcclxuXHJcbiAgICBAQ29sdW1uKHtuYW1lOlwiaW5wdXRfdmFsdWVcIn0pXHJcbiAgICBpblZhbHVlOm51bWJlcjtcclxuXHJcbiAgICBAQ29sdW1uKHtuYW1lOlwiZGVzY3JpcHRpb25cIiwgbnVsbGFibGU6dHJ1ZX0pXHJcbiAgICBkZXNjcmlwdGlvbjpzdHJpbmc7XHJcbn0iXX0=