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
exports.Post = void 0;
const typeorm_1 = require("typeorm");
const Brand_1 = require("./Brand");
const Category_1 = require("./Category");
const MetaData_1 = require("./MetaData");
const ImageGallery_1 = require("./ImageGallery");
const User_1 = require("./User");
let Post = class Post {
    id;
    publicId;
    aliasName;
    title;
    content;
    user;
    images;
    author;
    metaDatas;
    brand;
    category;
    createdDate;
    updateDate;
    addAllImage(imgs) {
        if (!Array.isArray(this.images)) {
            this.images = new Array();
        }
        this.images.push.apply(this.images, imgs);
    }
    addImage(image) {
        if (!Array.isArray(this.images)) {
            this.images = new Array();
        }
        this.images.push(image);
    }
    addAllMetaData(metas) {
        if (!Array.isArray(this.metaDatas)) {
            this.metaDatas = new Array();
        }
        this.metaDatas.push.apply(this.metaDatas, metas);
    }
    addMeta(metaData) {
        if (!Array.isArray(this.metaDatas)) {
            this.metaDatas = new Array();
        }
        this.metaDatas.push(metaData);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "public_id", unique: true, length: 60 }),
    (0, typeorm_1.Generated)("uuid"),
    __metadata("design:type", String)
], Post.prototype, "publicId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "alias_name", unique: true }),
    __metadata("design:type", String)
], Post.prototype, "aliasName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "approve_user" }),
    __metadata("design:type", User_1.User)
], Post.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => ImageGallery_1.ImageGallery, (image) => image.posts),
    (0, typeorm_1.JoinTable)({
        name: "posts_images",
        joinColumn: { name: "post", referencedColumnName: "id" },
        inverseJoinColumn: { name: "image", referencedColumnName: "id" },
    }),
    __metadata("design:type", Array)
], Post.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id),
    (0, typeorm_1.JoinColumn)({ name: "author" }),
    __metadata("design:type", User_1.User)
], Post.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => MetaData_1.MetaDeta, (meta) => meta.posts),
    (0, typeorm_1.JoinTable)({
        name: "posts_metadats",
        joinColumn: { name: "post", referencedColumnName: "id" },
        inverseJoinColumn: { name: "meta_data", referencedColumnName: "id" },
    }),
    __metadata("design:type", Array)
], Post.prototype, "metaDatas", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Brand_1.Brand, (brand) => brand.id),
    (0, typeorm_1.JoinColumn)({ name: "brand" }),
    __metadata("design:type", Brand_1.Brand)
], Post.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, (cat) => cat.id),
    (0, typeorm_1.JoinColumn)({ name: "category" }),
    __metadata("design:type", Category_1.Category)
], Post.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Post.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "update_date" }),
    __metadata("design:type", Date)
], Post.prototype, "updateDate", void 0);
Post = __decorate([
    (0, typeorm_1.Entity)({ name: "post" })
], Post);
exports.Post = Post;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9zdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbC9Qb3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQVdpQjtBQUNqQixtQ0FBZ0M7QUFDaEMseUNBQXNDO0FBQ3RDLHlDQUFzQztBQUN0QyxpREFBOEM7QUFDOUMsaUNBQThCO0FBRzlCLElBQWEsSUFBSSxHQUFqQixNQUFhLElBQUk7SUFFZixFQUFFLENBQVM7SUFJWCxRQUFRLENBQVM7SUFHakIsU0FBUyxDQUFTO0lBR2xCLEtBQUssQ0FBUztJQUdkLE9BQU8sQ0FBUztJQUloQixJQUFJLENBQU87SUFRWCxNQUFNLENBQWlCO0lBSXZCLE1BQU0sQ0FBTztJQVFiLFNBQVMsQ0FBYTtJQUl0QixLQUFLLENBQVE7SUFJYixRQUFRLENBQVc7SUFHbkIsV0FBVyxDQUFPO0lBR2xCLFVBQVUsQ0FBTztJQUVqQixXQUFXLENBQUMsSUFBb0I7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQWdCLENBQUM7U0FDekM7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsUUFBUSxDQUFDLEtBQW1CO1FBQzFCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksS0FBSyxFQUFnQixDQUFDO1NBQ3pDO1FBQ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUIsQ0FBQztJQUVELGNBQWMsQ0FBQyxLQUFpQjtRQUM5QixJQUFJLENBQUMsS0FBSyxD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VSxFQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDOzhCQUN2QixhQUFLO21DQUFDO0FBSWI7SUFGQyxJQUFBLG1CQUFTLEVBQUMsR0FBRyxFQUFFLENBQUMsbUJBQVEsRUFBRSxDQUFDLEdBQWEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztJQUNwRCxJQUFBLG9CQUFVLEVBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7OEJBQ3ZCLG1CQUFRO3NDQUFDO0FBR25CO0lBREMsSUFBQSwwQkFBZ0IsR0FBRTs4QkFDTixJQUFJO3lDQUFDO0FBR2xCO0lBREMsSUFBQSwwQkFBZ0IsRUFBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQzs4QkFDOUIsSUFBSTt3Q0FBQztBQXJETixJQUFJO0lBRGhCLElBQUEsZ0JBQU0sRUFBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztHQUNaLElBQUksQ0FrRmhCO0FBbEZZLG9CQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgQ3JlYXRlRGF0ZUNvbHVtbixcclxuICBFbnRpdHksXHJcbiAgR2VuZXJhdGVkLFxyXG4gIEpvaW5Db2x1bW4sXHJcbiAgSm9pblRhYmxlLFxyXG4gIE1hbnlUb01hbnksXHJcbiAgTWFueVRvT25lLFxyXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXHJcbiAgVXBkYXRlRGF0ZUNvbHVtbixcclxufSBmcm9tIFwidHlwZW9ybVwiO1xyXG5pbXBvcnQgeyBCcmFuZCB9IGZyb20gXCIuL0JyYW5kXCI7XHJcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcIi4vQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgTWV0YURldGEgfSBmcm9tIFwiLi9NZXRhRGF0YVwiO1xyXG5pbXBvcnQgeyBJbWFnZUdhbGxlcnkgfSBmcm9tIFwiLi9JbWFnZUdhbGxlcnlcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuL1VzZXJcIjtcclxuXHJcbkBFbnRpdHkoeyBuYW1lOiBcInBvc3RcIiB9KVxyXG5leHBvcnQgY2xhc3MgUG9zdCB7XHJcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxyXG4gIGlkOiBudW1iZXI7XHJcblxyXG4gIEBDb2x1bW4oeyBuYW1lOiBcInB1YmxpY19pZFwiLCB1bmlxdWU6IHRydWUsIGxlbmd0aDo2MCB9KVxyXG4gIEBHZW5lcmF0ZWQoXCJ1dWlkXCIpXHJcbiAgcHVibGljSWQ6IHN0cmluZztcclxuXHJcbiAgQENvbHVtbih7IG5hbWU6IFwiYWxpYXNfbmFtZVwiLCB1bmlxdWU6IHRydWUgfSlcclxuICBhbGlhc05hbWU6IHN0cmluZztcclxuXHJcbiAgQENvbHVtbih7IGxlbmd0aDogMTUwIH0pXHJcbiAgdGl0bGU6IHN0cmluZztcclxuXHJcbiAgQENvbHVtbihcInRleHRcIilcclxuICBjb250ZW50OiBzdHJpbmc7XHJcblxyXG4gIEBNYW55VG9PbmUoKCkgPT4gVXNlciwgKHVzZXI6IFVzZXIpID0+IHVzZXIuaWQsIHsgbnVsbGFibGU6IHRydWUgfSlcclxuICBASm9pbkNvbHVtbih7IG5hbWU6IFwiYXBwcm92ZV91c2VyXCIgfSlcclxuICB1c2VyOiBVc2VyO1xyXG5cclxuICBATWFueVRvTWFueSgoKSA9PiBJbWFnZUdhbGxlcnksIChpbWFnZTogSW1hZ2VHYWxsZXJ5KSA9PiBpbWFnZS5wb3N0cylcclxuICBASm9pblRhYmxlKHtcclxuICAgIG5hbWU6IFwicG9zdHNfaW1hZ2VzXCIsXHJcbiAgICBqb2luQ29sdW1uOiB7IG5hbWU6IFwicG9zdFwiLCByZWZlcmVuY2VkQ29sdW1uTmFtZTogXCJpZFwiIH0sXHJcbiAgICBpbnZlcnNlSm9pbkNvbHVtbjogeyBuYW1lOiBcImltYWdlXCIsIHJlZmVyZW5jZWRDb2x1bW5OYW1lOiBcImlkXCIgfSxcclxuICB9KVxyXG4gIGltYWdlczogSW1hZ2VHYWxsZXJ5W107XHJcblxyXG4gIEBNYW55VG9PbmUoKCkgPT4gVXNlciwgKHVzZXI6IFVzZXIpID0+IHVzZXIuaWQpXHJcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiBcImF1dGhvclwiIH0pXHJcbiAgYXV0aG9yOiBVc2VyO1xyXG5cclxuICBATWFueVRvTWFueSgoKSA9PiBNZXRhRGV0YSwgKG1ldGE6IE1ldGFEZXRhKSA9PiBtZXRhLnBvc3RzKVxyXG4gIEBKb2luVGFibGUoe1xyXG4gICAgbmFtZTogXCJwb3N0c19tZXRhZGF0c1wiLFxyXG4gICAgam9pbkNvbHVtbjogeyBuYW1lOiBcInBvc3RcIiwgcmVmZXJlbmNlZENvbHVtbk5hbWU6IFwiaWRcIiB9LFxyXG4gICAgaW52ZXJzZUpvaW5Db2x1bW46IHsgbmFtZTogXCJtZXRhX2RhdGFcIiwgcmVmZXJlbmNlZENvbHVtbk5hbWU6IFwiaWRcIiB9LFxyXG4gIH0pXHJcbiAgbWV0YURhdGFzOiBNZXRhRGV0YVtdO1xyXG5cclxuICBATWFueVRvT25lKCgpID0+IEJyYW5kLCAoYnJhbmQ6IEJyYW5kKSA9PiBicmFuZC5pZClcclxuICBASm9pbkNvbHVtbih7IG5hbWU6IFwiYnJhbmRcIiB9KVxyXG4gIGJyYW5kOiBCcmFuZDtcclxuXHJcbiAgQE1hbnlUb09uZSgoKSA9PiBDYXRlZ29yeSwgKGNhdDogQ2F0ZWdvcnkpID0+IGNhdC5pZClcclxuICBASm9pbkNvbHVtbih7IG5hbWU6IFwiY2F0ZWdvcnlcIiB9KVxyXG4gIGNhdGVnb3J5OiBDYXRlZ29yeTtcclxuXHJcbiAgQENyZWF0ZURhdGVDb2x1bW4oKVxyXG4gIGNyZWF0ZWREYXRlOiBEYXRlO1xyXG5cclxuICBAVXBkYXRlRGF0ZUNvbHVtbih7IG5hbWU6IFwidXBkYXRlX2RhdGVcIiB9KVxyXG4gIHVwZGF0ZURhdGU6IERhdGU7XHJcblxyXG4gIGFkZEFsbEltYWdlKGltZ3M6IEltYWdlR2FsbGVyeVtdKSB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5pbWFnZXMpKSB7XHJcbiAgICAgIHRoaXMuaW1hZ2VzID0gbmV3IEFycmF5PEltYWdlR2FsbGVyeT4oKTtcclxuICAgIH1cclxuICAgIHRoaXMuaW1hZ2VzLnB1c2guYXBwbHkodGhpcy5pbWFnZXMsIGltZ3MpO1xyXG4gIH1cclxuXHJcbiAgYWRkSW1hZ2UoaW1hZ2U6IEltYWdlR2FsbGVyeSkge1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMuaW1hZ2VzKSkge1xyXG4gICAgICB0aGlzLmltYWdlcyA9IG5ldyBBcnJheTxJbWFnZUdhbGxlcnk+KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmltYWdlcy5wdXNoKGltYWdlKTtcclxuICB9XHJcblxyXG4gIGFkZEFsbE1ldGFEYXRhKG1ldGFzOiBNZXRhRGV0YVtdKSB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5tZXRhRGF0YXMpKSB7XHJcbiAgICAgIHRoaXMubWV0YURhdGFzID0gbmV3IEFycmF5PE1ldGFEZXRhPigpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5tZXRhRGF0YXMucHVzaC5hcHBseSh0aGlzLm1ldGFEYXRhcywgbWV0YXMpO1xyXG4gIH1cclxuXHJcbiAgYWRkTWV0YShtZXRhRGF0YTogTWV0YURldGEpIHtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLm1ldGFEYXRhcykpIHtcclxuICAgICAgdGhpcy5tZXRhRGF0YXMgPSBuZXcgQXJyYXk8TWV0YURldGE+KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1ldGFEYXRhcy5wdXNoKG1ldGFEYXRhKTtcclxuICB9XHJcbn1cclxuIl19