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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const Comment_1 = require("./Comment");
const News_1 = require("./News");
const Post_1 = require("./Post");
const Product_1 = require("./Product");
let User = class User {
    id;
    publicId;
    firstName;
    lastName;
    products;
    posts;
    news;
    comments;
    approveComments;
    isActive;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "public_id", unique: true, length: 75 }),
    (0, typeorm_1.Generated)("uuid"),
    __metadata("design:type", String)
], User.prototype, "publicId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "first_name" }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "last_name" }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Product_1.Product, (product) => product.user),
    __metadata("design:type", Array)
], User.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Post_1.Post, (post) => post.user),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => News_1.News, (news) => news.user),
    __metadata("design:type", Array)
], User.prototype, "news", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_1.Comment, (comment) => comment.author),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_1.Comment, (comment) => comment.approveUser),
    __metadata("design:type", Array)
], User.prototype, "approveComments", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
User = __decorate([
    (0, typeorm_1.Entity)({ name: "user" })
], User);
exports.User = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbC9Vc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQVFpQjtBQUNqQix1Q0FBb0M7QUFDcEMsaUNBQThCO0FBQzlCLGlDQUE4QjtBQUM5Qix1Q0FBb0M7QUFHcEMsSUFBYSxJQUFJLEdBQWpCLE1BQWEsSUFBSTtJQUVmLEVBQUUsQ0FBUztJQUlYLFFBQVEsQ0FBUTtJQUdoQixTQUFTLENBQVM7SUFHbEIsUUFBUSxDQUFTO0lBR2pCLFFBQVEsQ0FBWTtJQUdwQixLQUFLLENBQVM7SUFHZCxJQUFJLENBQVM7SUFHYixRQUFRLENBQVU7SUFHbEIsZUFBZSxDQUFVO0lBR3pCLFFBQVEsQ0FBVTtDQUNuQixDQUFBO0FBN0JDO0lBREMsSUFBQSxnQ0FBc0IsR0FBRTs7Z0NBQ2Q7QUFJWDtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLElBQUksRUFBQyxXQUFXLEVBQUUsTUFBTSxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUMsRUFBRSxFQUFDLENBQUM7SUFDbEQsSUFBQSxtQkFBUyxFQUFDLE1BQU0sQ0FBQzs7c0NBQ0Y7QUFHaEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUM7O3VDQUNiO0FBR2xCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDOztzQ0FDYjtBQUdqQjtJQURDLElBQUEsbUJBQVMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBTyxFQUFFLENBQUMsT0FBZ0IsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzs7c0NBQ3pDO0FBR3BCO0lBREMsSUFBQSxtQkFBUyxFQUFDLEdBQUcsRUFBRSxDQUFDLFdBQUksRUFBRSxDQUFDLElBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7bUNBQ25DO0FBR2Q7SUFEQyxJQUFBLG1CQUFTLEVBQUMsR0FBRyxFQUFFLENBQUMsV0FBSSxFQUFFLENBQUMsSUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOztrQ0FDcEM7QUFHYjtJQURDLElBQUEsbUJBQVMsRUFBQyxHQUFFLEVBQUUsQ0FBQSxpQkFBTyxFQUFFLENBQUMsT0FBZSxFQUFDLEVBQUUsQ0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDOztzQ0FDeEM7QUFHbEI7SUFEQyxJQUFBLG1CQUFTLEVBQUMsR0FBRSxFQUFFLENBQUEsaUJBQU8sRUFBRSxDQUFDLE9BQWUsRUFBQyxFQUFFLENBQUEsT0FBTyxDQUFDLFdBQVcsQ0FBQzs7NkNBQ3RDO0FBR3pCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUM7O3NDQUM1QjtBQTlCUCxJQUFJO0lBRGhCLElBQUEsZ0JBQU0sRUFBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztHQUNaLElBQUksQ0ErQmhCO0FBL0JZLG9CQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgRW50aXR5LFxyXG4gIEdlbmVyYXRlZCxcclxuICBKb2luQ29sdW1uLFxyXG4gIE1hbnlUb09uZSxcclxuICBPbmVUb01hbnksXHJcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcclxufSBmcm9tIFwidHlwZW9ybVwiO1xyXG5pbXBvcnQgeyBDb21tZW50IH0gZnJvbSBcIi4vQ29tbWVudFwiO1xyXG5pbXBvcnQgeyBOZXdzIH0gZnJvbSBcIi4vTmV3c1wiO1xyXG5pbXBvcnQgeyBQb3N0IH0gZnJvbSBcIi4vUG9zdFwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSBcIi4vUHJvZHVjdFwiO1xyXG5cclxuQEVudGl0eSh7IG5hbWU6IFwidXNlclwiIH0pXHJcbmV4cG9ydCBjbGFzcyBVc2VyIHtcclxuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXHJcbiAgaWQ6IG51bWJlcjtcclxuXHJcbiAgQENvbHVtbih7bmFtZTpcInB1YmxpY19pZFwiLCB1bmlxdWU6dHJ1ZSwgbGVuZ3RoOjc1fSlcclxuICBAR2VuZXJhdGVkKFwidXVpZFwiKVxyXG4gIHB1YmxpY0lkOnN0cmluZztcclxuXHJcbiAgQENvbHVtbih7IG5hbWU6IFwiZmlyc3RfbmFtZVwiIH0pXHJcbiAgZmlyc3ROYW1lOiBzdHJpbmc7XHJcblxyXG4gIEBDb2x1bW4oeyBuYW1lOiBcImxhc3RfbmFtZVwiIH0pXHJcbiAgbGFzdE5hbWU6IHN0cmluZztcclxuXHJcbiAgQE9uZVRvTWFueSgoKSA9PiBQcm9kdWN0LCAocHJvZHVjdDogUHJvZHVjdCkgPT4gcHJvZHVjdC51c2VyKVxyXG4gIHByb2R1Y3RzOiBQcm9kdWN0W107XHJcblxyXG4gIEBPbmVUb01hbnkoKCkgPT4gUG9zdCwgKHBvc3Q6IFBvc3QpID0+IHBvc3QudXNlcilcclxuICBwb3N0czogUG9zdFtdO1xyXG5cclxuICBAT25lVG9NYW55KCgpID0+IE5ld3MsIChuZXdzOiBOZXdzKSA9PiBuZXdzLnVzZXIpXHJcbiAgbmV3czogTmV3c1tdO1xyXG5cclxuICBAT25lVG9NYW55KCgpPT5Db21tZW50LCAoY29tbWVudDpDb21tZW50KT0+Y29tbWVudC5hdXRob3IpXHJcbiAgY29tbWVudHM6Q29tbWVudFtdXHJcblxyXG4gIEBPbmVUb01hbnkoKCk9PkNvbW1lbnQsIChjb21tZW50OkNvbW1lbnQpPT5jb21tZW50LmFwcHJvdmVVc2VyKVxyXG4gIGFwcHJvdmVDb21tZW50czpDb21tZW50W11cclxuXHJcbiAgQENvbHVtbih7IG5hbWU6IFwiaXNfYWN0aXZlXCIsIGRlZmF1bHQ6IGZhbHNlIH0pXHJcbiAgaXNBY3RpdmU6IGJvb2xlYW47XHJcbn1cclxuIl19