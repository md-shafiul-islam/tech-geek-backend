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
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("./Category");
const ImageGallery_1 = require("./ImageGallery");
const MetaData_1 = require("./MetaData");
const ProductPrice_1 = require("./ProductPrice");
const Rating_1 = require("./Rating");
const Review_1 = require("./Review");
const Specification_1 = require("./Specification");
const User_1 = require("./User");
let Product = class Product {
    id;
    publicId;
    aliasName;
    title;
    model;
    quantity;
    ram;
    imageUrl;
    videoUrl;
    prices;
    price;
    discountPrice;
    discountStatus;
    isUpcoming;
    description;
    user;
    category;
    images;
    metaDatas;
    brand;
    specifications;
    reviews;
    ratings;
    avgRating;
    createDate;
    updateDate;
    addMetaData(meta) {
        if (!Array.isArray(this.metaDatas)) {
            this.metaDatas = new Array();
        }
        this.metaDatas.push(meta);
    }
    addAllMetaData(metas) {
        if (!Array.isArray(this.metaDatas)) {
            this.metaDatas = new Array();
        }
        this.metaDatas.push.apply(this.metaDatas, metas);
    }
    addImage(image) {
        if (!Array.isArray(this.images)) {
            this.images = new Array();
        }
        this.images.push(image);
    }
    addAllSpecification(specs) {
        if (!Array.isArray(this.specifications)) {
            this.specifications = new Array();
        }
        this.specifications.push.apply(this.specifications, specs);
    }
    addSpecification(spec) {
        if (!Array.isArray(this.specifications)) {
            this.specifications = new Array();
        }
        this.specifications.push(spec);
    }
    addAllImage(imgs) {
        if (!Array.isArray(this.images)) {
            this.images = new Array();
        }
        this.images.push.apply(this.images, imgs);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "public_id", unique: true, length: 75 }),
    (0, typeorm_1.Generated)("uuid"),
    __metadata("design:type", String)
], Product.prototype, "publicId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "alias_name" }),
    __metadata("design:type", String)
], Product.prototype, "aliasName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        length: 175,
    }),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "double" }),
    __metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Product.prototype, "ram", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "image_url", length: 205 }),
    __metadata("design:type", String)
], Product.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "video_url", type: "text", nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "videoUrl", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ProductPrice_1.ProductPrice, (productPrice) => productPrice.product),
    __metadata("design:type", Array)
], Product.prototype, "prices", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "discount_price", default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "discountPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "discount_status" }),
    __metadata("design:type", Boolean)
], Product.prototype, "discountStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_upcoming" }),
    __metadata("design:type", Boolean)
], Product.prototype, "isUpcoming", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "longtext", default: null, nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id),
    (0, typeorm_1.JoinColumn)({ name: "user" }),
    __metadata("design:type", User_1.User)
], Product.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, (category) => category.id),
    (0, typeorm_1.JoinColumn)({ name: "category" }),
    __metadata("design:type", Category_1.Category)
], Product.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => ImageGallery_1.ImageGallery, (image) => image.products, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: "product_images",
        joinColumn: { name: "product", referencedColumnName: "id" },
        inverseJoinColumn: { name: "image", referencedColumnName: "id" },
    }),
    __metadata("design:type", Array)
], Product.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => MetaData_1.MetaDeta, (metadata) => metadata.products, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: "product_meta",
        joinColumn: { name: "product", referencedColumnName: "id" },
        inverseJoinColumn: { name: "meta", referencedColumnName: "id" },
    }),
    __metadata("design:type", Array)
], Product.prototype, "metaDatas", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "brand" }),
    __metadata("design:type", String)
], Product.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Specification_1.Specification, (spec) => spec.product),
    __metadata("design:type", Array)
], Product.prototype, "specifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Review_1.Review, (review) => review.product),
    __metadata("design:type", Array)
], Product.prototype, "reviews", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Rating_1.Rating, (rating) => rating.product),
    __metadata("design:type", Array)
], Product.prototype, "ratings", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Rating_1.Rating, (rating) => rating.avgRatProduct),
    __metadata("design:type", Rating_1.Rating)
], Product.prototype, "avgRating", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "create_date" }),
    __metadata("design:type", Date)
], Product.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "update_date" }),
    __metadata("design:type", Date)
], Product.prototype, "updateDate", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)({ name: "product" })
], Product);
exports.Product = Product;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbC9Qcm9kdWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQWFpQjtBQUVqQix5Q0FBc0M7QUFDdEMsaURBQThDO0FBQzlDLHlDQUFzQztBQUN0QyxpREFBOEM7QUFDOUMscUNBQWtDO0FBQ2xDLHFDQUFrQztBQUNsQyxtREFBZ0Q7QUFDaEQsaUNBQThCO0FBRzlCLElBQWEsT0FBTyxHQUFwQixNQUFhLE9BQU87SUFFbEIsRUFBRSxDQUFTO0lBSVgsUUFBUSxDQUFTO0lBR2pCLFNBQVMsQ0FBUztJQUtsQixLQUFLLENBQVM7SUFHZCxLQUFLLENBQVM7SUFHZCxRQUFRLENBQVM7SUFHakIsR0FBRyxDQUFTO0lBR1osUUFBUSxDQUFTO0lBR2pCLFFBQVEsQ0FBUztJQU1qQixNQUFNLENBQWlCO0lBR3ZCLEtBQUssQ0FBUztJQUdkLGFBQWEsQ0FBUztJQUd0QixjQUFjLENBQVU7SUFHeEIsVUFBVSxDQUFVO0lBR3BCLFdBQVcsQ0FBUztJQUlwQixJQUFJLENBQU87SUFJWCxRQUFRLENBQVc7SUFVbkIsTUFBTSxDQUFpQjtJQVV2QixTQUFTLENBQWE7SUFHdEIsS0FBSyxDQUFTO0lBR2QsY0FBYyxDQUFrQjtJQUdoQyxPQUFPLENBQVc7SUFHbEIsT0FBTyxDQUFXO0lBR2xCLFNBQVMsQ0FBUztJQUdsQixVQUFVLENBQU87SUFHakIsVUFBVSxDQUFPO0lBRWpCLFdBQVcsQ0FBQyxJQUFjO1FBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksS0FBSyxFQUFZLENBQUM7U0FDeEM7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsY0FBYyxDQUFDLEtB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QUMsZUFBTSxFQUFFLENBQUMsTUFBYyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDOzhCQUN0RCxlQUFNOzBDQUFDO0FBR2xCO0lBREMsSUFBQSwwQkFBZ0IsRUFBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQzs4QkFDOUIsSUFBSTsyQ0FBQztBQUdqQjtJQURDLElBQUEsMEJBQWdCLEVBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUM7OEJBQzlCLElBQUk7MkNBQUM7QUFuR04sT0FBTztJQURuQixJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7R0FDZixPQUFPLENBa0puQjtBQWxKWSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29sdW1uLFxyXG4gIENyZWF0ZURhdGVDb2x1bW4sXHJcbiAgRW50aXR5LFxyXG4gIEdlbmVyYXRlZCxcclxuICBKb2luQ29sdW1uLFxyXG4gIEpvaW5UYWJsZSxcclxuICBNYW55VG9NYW55LFxyXG4gIE1hbnlUb09uZSxcclxuICBPbmVUb01hbnksXHJcbiAgT25lVG9PbmUsXHJcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcclxuICBVcGRhdGVEYXRlQ29sdW1uLFxyXG59IGZyb20gXCJ0eXBlb3JtXCI7XHJcbmltcG9ydCB7IEJyYW5kIH0gZnJvbSBcIi4vQnJhbmRcIjtcclxuaW1wb3J0IHsgQ2F0ZWdvcnkgfSBmcm9tIFwiLi9DYXRlZ29yeVwiO1xyXG5pbXBvcnQgeyBJbWFnZUdhbGxlcnkgfSBmcm9tIFwiLi9JbWFnZUdhbGxlcnlcIjtcclxuaW1wb3J0IHsgTWV0YURldGEgfSBmcm9tIFwiLi9NZXRhRGF0YVwiO1xyXG5pbXBvcnQgeyBQcm9kdWN0UHJpY2UgfSBmcm9tIFwiLi9Qcm9kdWN0UHJpY2VcIjtcclxuaW1wb3J0IHsgUmF0aW5nIH0gZnJvbSBcIi4vUmF0aW5nXCI7XHJcbmltcG9ydCB7IFJldmlldyB9IGZyb20gXCIuL1Jldmlld1wiO1xyXG5pbXBvcnQgeyBTcGVjaWZpY2F0aW9uIH0gZnJvbSBcIi4vU3BlY2lmaWNhdGlvblwiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4vVXNlclwiO1xyXG5cclxuQEVudGl0eSh7IG5hbWU6IFwicHJvZHVjdFwiIH0pXHJcbmV4cG9ydCBjbGFzcyBQcm9kdWN0IHtcclxuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXHJcbiAgaWQ6IG51bWJlcjtcclxuXHJcbiAgQENvbHVtbih7IG5hbWU6IFwicHVibGljX2lkXCIsIHVuaXF1ZTogdHJ1ZSwgbGVuZ3RoOiA3NSB9KVxyXG4gIEBHZW5lcmF0ZWQoXCJ1dWlkXCIpXHJcbiAgcHVibGljSWQ6IHN0cmluZztcclxuXHJcbiAgQENvbHVtbih7IG5hbWU6IFwiYWxpYXNfbmFtZVwiIH0pXHJcbiAgYWxpYXNOYW1lOiBzdHJpbmc7XHJcblxyXG4gIEBDb2x1bW4oe1xyXG4gICAgbGVuZ3RoOiAxNzUsXHJcbiAgfSlcclxuICB0aXRsZTogc3RyaW5nO1xyXG5cclxuICBAQ29sdW1uKClcclxuICBtb2RlbDogc3RyaW5nO1xyXG5cclxuICBAQ29sdW1uKHsgdHlwZTogXCJkb3VibGVcIiB9KVxyXG4gIHF1YW50aXR5OiBudW1iZXI7XHJcblxyXG4gIEBDb2x1bW4oeyBsZW5ndGg6IDEwMCB9KVxyXG4gIHJhbTogc3RyaW5nO1xyXG5cclxuICBAQ29sdW1uKHsgbmFtZTogXCJpbWFnZV91cmxcIiwgbGVuZ3RoOiAyMDUgfSlcclxuICBpbWFnZVVybDogc3RyaW5nO1xyXG5cclxuICBAQ29sdW1uKHsgbmFtZTogXCJ2aWRlb191cmxcIiwgdHlwZTogXCJ0ZXh0XCIsIG51bGxhYmxlOiB0cnVlIH0pXHJcbiAgdmlkZW9Vcmw6IHN0cmluZztcclxuXHJcbiAgQE9uZVRvTWFueShcclxuICAgICgpID0+IFByb2R1Y3RQcmljZSxcclxuICAgIChwcm9kdWN0UHJpY2U6IFByb2R1Y3RQcmljZSkgPT4gcHJvZHVjdFByaWNlLnByb2R1Y3RcclxuICApXHJcbiAgcHJpY2VzOiBQcm9kdWN0UHJpY2VbXTtcclxuXHJcbiAgQENvbHVtbih7IGRlZmF1bHQ6IDAgfSlcclxuICBwcmljZTogbnVtYmVyO1xyXG5cclxuICBAQ29sdW1uKHsgbmFtZTogXCJkaXNjb3VudF9wcmljZVwiLCBkZWZhdWx0OiAwIH0pXHJcbiAgZGlzY291bnRQcmljZTogbnVtYmVyO1xyXG5cclxuICBAQ29sdW1uKHsgbmFtZTogXCJkaXNjb3VudF9zdGF0dXNcIiB9KVxyXG4gIGRpc2NvdW50U3RhdHVzOiBib29sZWFuO1xyXG5cclxuICBAQ29sdW1uKHsgbmFtZTogXCJpc191cGNvbWluZ1wiIH0pXHJcbiAgaXNVcGNvbWluZzogYm9vbGVhbjtcclxuXHJcbiAgQENvbHVtbih7IHR5cGU6IFwibG9uZ3RleHRcIiwgZGVmYXVsdDogbnVsbCwgbnVsbGFibGU6IHRydWUgfSlcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG5cclxuICBATWFueVRvT25lKCgpID0+IFVzZXIsICh1c2VyOiBVc2VyKSA9PiB1c2VyLmlkKVxyXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogXCJ1c2VyXCIgfSlcclxuICB1c2VyOiBVc2VyO1xyXG5cclxuICBATWFueVRvT25lKCgpID0+IENhdGVnb3J5LCAoY2F0ZWdvcnk6IENhdGVnb3J5KSA9PiBjYXRlZ29yeS5pZClcclxuICBASm9pbkNvbHVtbih7IG5hbWU6IFwiY2F0ZWdvcnlcIiB9KVxyXG4gIGNhdGVnb3J5OiBDYXRlZ29yeTtcclxuXHJcbiAgQE1hbnlUb01hbnkoKCkgPT4gSW1hZ2VHYWxsZXJ5LCAoaW1hZ2U6IEltYWdlR2FsbGVyeSkgPT4gaW1hZ2UucHJvZHVjdHMsIHtcclxuICAgIGNhc2NhZGU6IHRydWUsXHJcbiAgfSlcclxuICBASm9pblRhYmxlKHtcclxuICAgIG5hbWU6IFwicHJvZHVjdF9pbWFnZXNcIixcclxuICAgIGpvaW5Db2x1bW46IHsgbmFtZTogXCJwcm9kdWN0XCIsIHJlZmVyZW5jZWRDb2x1bW5OYW1lOiBcImlkXCIgfSxcclxuICAgIGludmVyc2VKb2luQ29sdW1uOiB7IG5hbWU6IFwiaW1hZ2VcIiwgcmVmZXJlbmNlZENvbHVtbk5hbWU6IFwiaWRcIiB9LFxyXG4gIH0pXHJcbiAgaW1hZ2VzOiBJbWFnZUdhbGxlcnlbXTtcclxuXHJcbiAgQE1hbnlUb01hbnkoKCkgPT4gTWV0YURldGEsIChtZXRhZGF0YTogTWV0YURldGEpID0+IG1ldGFkYXRhLnByb2R1Y3RzLCB7XHJcbiAgICBjYXNjYWRlOiB0cnVlLFxyXG4gIH0pXHJcbiAgQEpvaW5UYWJsZSh7XHJcbiAgICBuYW1lOiBcInByb2R1Y3RfbWV0YVwiLFxyXG4gICAgam9pbkNvbHVtbjogeyBuYW1lOiBcInByb2R1Y3RcIiwgcmVmZXJlbmNlZENvbHVtbk5hbWU6IFwiaWRcIiB9LFxyXG4gICAgaW52ZXJzZUpvaW5Db2x1bW46IHsgbmFtZTogXCJtZXRhXCIsIHJlZmVyZW5jZWRDb2x1bW5OYW1lOiBcImlkXCIgfSxcclxuICB9KVxyXG4gIG1ldGFEYXRhczogTWV0YURldGFbXTtcclxuXHJcbiAgQENvbHVtbih7IG5hbWU6IFwiYnJhbmRcIiB9KVxyXG4gIGJyYW5kOiBzdHJpbmc7XHJcblxyXG4gIEBPbmVUb01hbnkoKCkgPT4gU3BlY2lmaWNhdGlvbiwgKHNwZWM6IFNwZWNpZmljYXRpb24pID0+IHNwZWMucHJvZHVjdClcclxuICBzcGVjaWZpY2F0aW9uczogU3BlY2lmaWNhdGlvbltdO1xyXG5cclxuICBAT25lVG9NYW55KCgpID0+IFJldmlldywgKHJldmlldzogUmV2aWV3KSA9PiByZXZpZXcucHJvZHVjdClcclxuICByZXZpZXdzOiBSZXZpZXdbXTtcclxuXHJcbiAgQE9uZVRvTWFueSgoKSA9PiBSYXRpbmcsIChyYXRpbmc6IFJhdGluZykgPT4gcmF0aW5nLnByb2R1Y3QpXHJcbiAgcmF0aW5nczogUmF0aW5nW107XHJcblxyXG4gIEBPbmVUb09uZSgoKSA9PiBSYXRpbmcsIChyYXRpbmc6IFJhdGluZykgPT4gcmF0aW5nLmF2Z1JhdFByb2R1Y3QpXHJcbiAgYXZnUmF0aW5nOiBSYXRpbmc7XHJcblxyXG4gIEBDcmVhdGVEYXRlQ29sdW1uKHsgbmFtZTogXCJjcmVhdGVfZGF0ZVwiIH0pXHJcbiAgY3JlYXRlRGF0ZTogRGF0ZTtcclxuXHJcbiAgQFVwZGF0ZURhdGVDb2x1bW4oeyBuYW1lOiBcInVwZGF0ZV9kYXRlXCIgfSlcclxuICB1cGRhdGVEYXRlOiBEYXRlO1xyXG5cclxuICBhZGRNZXRhRGF0YShtZXRhOiBNZXRhRGV0YSkge1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMubWV0YURhdGFzKSkge1xyXG4gICAgICB0aGlzLm1ldGFEYXRhcyA9IG5ldyBBcnJheTxNZXRhRGV0YT4oKTtcclxuICAgIH1cclxuICAgIHRoaXMubWV0YURhdGFzLnB1c2gobWV0YSk7XHJcbiAgfVxyXG5cclxuICBhZGRBbGxNZXRhRGF0YShtZXRhczogTWV0YURldGFbXSkge1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMubWV0YURhdGFzKSkge1xyXG4gICAgICB0aGlzLm1ldGFEYXRhcyA9IG5ldyBBcnJheTxNZXRhRGV0YT4oKTtcclxuICAgIH1cclxuICAgIHRoaXMubWV0YURhdGFzLnB1c2guYXBwbHkodGhpcy5tZXRhRGF0YXMsIG1ldGFzKTtcclxuICB9XHJcblxyXG4gIGFkZEltYWdlKGltYWdlOiBJbWFnZUdhbGxlcnkpIHtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLmltYWdlcykpIHtcclxuICAgICAgdGhpcy5pbWFnZXMgPSBuZXcgQXJyYXk8SW1hZ2VHYWxsZXJ5PigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW1hZ2VzLnB1c2goaW1hZ2UpO1xyXG4gIH1cclxuXHJcbiAgYWRkQWxsU3BlY2lmaWNhdGlvbihzcGVjczogU3BlY2lmaWNhdGlvbltdKSB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5zcGVjaWZpY2F0aW9ucykpIHtcclxuICAgICAgdGhpcy5zcGVjaWZpY2F0aW9ucyA9IG5ldyBBcnJheTxTcGVjaWZpY2F0aW9uPigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc3BlY2lmaWNhdGlvbnMucHVzaC5hcHBseSh0aGlzLnNwZWNpZmljYXRpb25zLCBzcGVjcyk7XHJcbiAgfVxyXG5cclxuICBhZGRTcGVjaWZpY2F0aW9uKHNwZWM6IFNwZWNpZmljYXRpb24pIHtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLnNwZWNpZmljYXRpb25zKSkge1xyXG4gICAgICB0aGlzLnNwZWNpZmljYXRpb25zID0gbmV3IEFycmF5PFNwZWNpZmljYXRpb24+KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zcGVjaWZpY2F0aW9ucy5wdXNoKHNwZWMpO1xyXG4gIH1cclxuXHJcbiAgYWRkQWxsSW1hZ2UoaW1nczogSW1hZ2VHYWxsZXJ5W10pIHtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLmltYWdlcykpIHtcclxuICAgICAgdGhpcy5pbWFnZXMgPSBuZXcgQXJyYXk8SW1hZ2VHYWxsZXJ5PigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW1hZ2VzLnB1c2guYXBwbHkodGhpcy5pbWFnZXMsIGltZ3MpO1xyXG4gIH1cclxufVxyXG4iXX0=