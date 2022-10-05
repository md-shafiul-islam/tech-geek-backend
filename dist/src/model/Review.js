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
exports.Review = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("./Product");
const User_1 = require("./User");
let Review = class Review {
    id;
    author;
    product;
    approveUser;
    content;
    createdDate;
    updateDate;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Review.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id),
    (0, typeorm_1.JoinColumn)({ name: "author" }),
    __metadata("design:type", User_1.User)
], Review.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_1.Product, (product) => product.reviews),
    (0, typeorm_1.JoinColumn)({ name: "product" }),
    __metadata("design:type", Product_1.Product)
], Review.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "approve_user" }),
    __metadata("design:type", User_1.User)
], Review.prototype, "approveUser", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], Review.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_date" }),
    __metadata("design:type", Date)
], Review.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "update_date" }),
    __metadata("design:type", Date)
], Review.prototype, "updateDate", void 0);
Review = __decorate([
    (0, typeorm_1.Entity)("review")
], Review);
exports.Review = Review;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmV2aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZGVsL1Jldmlldy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FRaUI7QUFDakIsdUNBQW9DO0FBQ3BDLGlDQUE4QjtBQUc5QixJQUFhLE1BQU0sR0FBbkIsTUFBYSxNQUFNO0lBRWpCLEVBQUUsQ0FBUztJQUlYLE1BQU0sQ0FBTztJQUliLE9BQU8sQ0FBVTtJQUlqQixXQUFXLENBQU87SUFHbEIsT0FBTyxDQUFTO0lBR2hCLFdBQVcsQ0FBTztJQUdsQixVQUFVLENBQU87Q0FDbEIsQ0FBQTtBQXRCQztJQURDLElBQUEsZ0NBQXNCLEdBQUU7O2tDQUNkO0FBSVg7SUFGQyxJQUFBLG1CQUFTLEVBQUMsR0FBRyxFQUFFLENBQUMsV0FBSSxFQUFFLENBQUMsSUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzlDLElBQUEsb0JBQVUsRUFBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzs4QkFDdkIsV0FBSTtzQ0FBQztBQUliO0lBRkMsSUFBQSxtQkFBUyxFQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFPLEVBQUUsQ0FBQyxPQUFnQixFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQy9ELElBQUEsb0JBQVUsRUFBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzs4QkFDdkIsaUJBQU87dUNBQUM7QUFJakI7SUFGQyxJQUFBLG1CQUFTLEVBQUMsR0FBRyxFQUFFLENBQUMsV0FBSSxFQUFFLENBQUMsSUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ2xFLElBQUEsb0JBQVUsRUFBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQzs4QkFDeEIsV0FBSTsyQ0FBQztBQUdsQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxNQUFNLENBQUM7O3VDQUNDO0FBR2hCO0lBREMsSUFBQSwwQkFBZ0IsRUFBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQzs4QkFDOUIsSUFBSTsyQ0FBQztBQUdsQjtJQURDLElBQUEsMEJBQWdCLEVBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUM7OEJBQzlCLElBQUk7MENBQUM7QUF2Qk4sTUFBTTtJQURsQixJQUFBLGdCQUFNLEVBQUMsUUFBUSxDQUFDO0dBQ0osTUFBTSxDQXdCbEI7QUF4Qlksd0JBQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbHVtbixcclxuICBDcmVhdGVEYXRlQ29sdW1uLFxyXG4gIEVudGl0eSxcclxuICBKb2luQ29sdW1uLFxyXG4gIE1hbnlUb09uZSxcclxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxyXG4gIFVwZGF0ZURhdGVDb2x1bW4sXHJcbn0gZnJvbSBcInR5cGVvcm1cIjtcclxuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuL1Byb2R1Y3RcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuL1VzZXJcIjtcclxuXHJcbkBFbnRpdHkoXCJyZXZpZXdcIilcclxuZXhwb3J0IGNsYXNzIFJldmlldyB7XHJcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxyXG4gIGlkOiBudW1iZXI7XHJcblxyXG4gIEBNYW55VG9PbmUoKCkgPT4gVXNlciwgKHVzZXI6IFVzZXIpID0+IHVzZXIuaWQpXHJcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiBcImF1dGhvclwiIH0pXHJcbiAgYXV0aG9yOiBVc2VyO1xyXG5cclxuICBATWFueVRvT25lKCgpID0+IFByb2R1Y3QsIChwcm9kdWN0OiBQcm9kdWN0KSA9PiBwcm9kdWN0LnJldmlld3MpXHJcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiBcInByb2R1Y3RcIiB9KVxyXG4gIHByb2R1Y3Q6IFByb2R1Y3Q7XHJcblxyXG4gIEBNYW55VG9PbmUoKCkgPT4gVXNlciwgKHVzZXI6IFVzZXIpID0+IHVzZXIuaWQsIHsgbnVsbGFibGU6IHRydWUgfSlcclxuICBASm9pbkNvbHVtbih7IG5hbWU6IFwiYXBwcm92ZV91c2VyXCIgfSlcclxuICBhcHByb3ZlVXNlcjogVXNlcjtcclxuXHJcbiAgQENvbHVtbihcInRleHRcIilcclxuICBjb250ZW50OiBzdHJpbmc7XHJcblxyXG4gIEBDcmVhdGVEYXRlQ29sdW1uKHsgbmFtZTogXCJjcmVhdGVkX2RhdGVcIiB9KVxyXG4gIGNyZWF0ZWREYXRlOiBEYXRlO1xyXG5cclxuICBAVXBkYXRlRGF0ZUNvbHVtbih7IG5hbWU6IFwidXBkYXRlX2RhdGVcIiB9KVxyXG4gIHVwZGF0ZURhdGU6IERhdGU7XHJcbn1cclxuIl19