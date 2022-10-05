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
exports.News = void 0;
const typeorm_1 = require("typeorm");
const Brand_1 = require("./Brand");
const Category_1 = require("./Category");
const MetaData_1 = require("./MetaData");
const ImageGallery_1 = require("./ImageGallery");
const User_1 = require("./User");
let News = class News {
    id;
    aliasName;
    title;
    user;
    metaDatas;
    content;
    images;
    brand;
    category;
    crateDate;
    updateDate;
    addImage(image) {
        if (!Array.isArray(this.images)) {
            this.images = new Array();
        }
        this.images.push(image);
    }
    addAllImage(imgs) {
        if (!Array.isArray(this.images)) {
            this.images = new Array();
        }
        this.images.push.apply(this.images, imgs);
    }
    addMetaData(meta) {
        if (!Array.isArray(this.metaDatas)) {
            this.metaDatas = new Array();
        }
        this.metaDatas.push(meta);
    }
    addAllMeta(metas) {
        if (!Array.isArray(this.metaDatas)) {
            this.metaDatas = new Array();
        }
        this.metaDatas.push.apply(this.metaDatas, metas);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], News.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "alias_name" }),
    __metadata("design:type", String)
], News.prototype, "aliasName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 205 }),
    __metadata("design:type", String)
], News.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id),
    (0, typeorm_1.JoinColumn)({ name: "user" }),
    __metadata("design:type", User_1.User)
], News.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => MetaData_1.MetaDeta, (meta) => meta.news),
    (0, typeorm_1.JoinTable)({
        name: "news_metadata",
        joinColumn: { name: "news", referencedColumnName: "id" },
        inverseJoinColumn: { name: "meta_data", referencedColumnName: "id" },
    }),
    __metadata("design:type", Array)
], News.prototype, "metaDatas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], News.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => ImageGallery_1.ImageGallery, (img) => img.news),
    (0, typeorm_1.JoinTable)({
        name: "news_images",
        joinColumn: { name: "news", referencedColumnName: "id" },
        inverseJoinColumn: { name: "image", referencedColumnName: "id" },
    }),
    __metadata("design:type", Array)
], News.prototype, "images", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Brand_1.Brand, (brand) => brand.news),
    (0, typeorm_1.JoinTable)({
        name: "news_brands",
        joinColumn: { name: "news", referencedColumnName: "id" },
        inverseJoinColumn: { name: "brand", referencedColumnName: "id" },
    }),
    __metadata("design:type", Brand_1.Brand)
], News.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, (cat) => cat.id),
    (0, typeorm_1.JoinColumn)({ name: "category", referencedColumnName: "id" }),
    __metadata("design:type", Category_1.Category)
], News.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], News.prototype, "crateDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "update_date", type: "datetime" }),
    __metadata("design:type", Date)
], News.prototype, "updateDate", void 0);
News = __decorate([
    (0, typeorm_1.Entity)({ name: "news" })
], News);
exports.News = News;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmV3cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbC9OZXdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQVNpQjtBQUNqQixtQ0FBZ0M7QUFDaEMseUNBQXNDO0FBQ3RDLHlDQUFzQztBQUN0QyxpREFBOEM7QUFDOUMsaUNBQThCO0FBRzlCLElBQWEsSUFBSSxHQUFqQixNQUFhLElBQUk7SUFFZixFQUFFLENBQVM7SUFHWCxTQUFTLENBQVE7SUFHakIsS0FBSyxDQUFTO0lBSWQsSUFBSSxDQUFPO0lBUVgsU0FBUyxDQUFhO0lBR3RCLE9BQU8sQ0FBUztJQVFoQixNQUFNLENBQWlCO0lBUXZCLEtBQUssQ0FBUTtJQUliLFFBQVEsQ0FBVztJQUduQixTQUFTLENBQU87SUFHaEIsVUFBVSxDQUFPO0lBRWpCLFFBQVEsQ0FBQyxLQUFtQjtRQUMxQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBZ0IsQ0FBQztTQUN6QztRQUNELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBb0I7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxLQUFLLEVBQWdCLENBQUM7U0FDekM7UUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsV0FBVyxDQUFDLElBQWM7UUFDeEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FB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c0NBQUM7QUFHbkI7SUFEQyxJQUFBLDBCQUFnQixHQUFFOzhCQUNSLElBQUk7dUNBQUM7QUFHaEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQzs4QkFDdEMsSUFBSTt3Q0FBQztBQWpETixJQUFJO0lBRGhCLElBQUEsZ0JBQU0sRUFBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQztHQUNaLElBQUksQ0ErRWhCO0FBL0VZLG9CQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgQ3JlYXRlRGF0ZUNvbHVtbixcclxuICBFbnRpdHksXHJcbiAgSm9pbkNvbHVtbixcclxuICBKb2luVGFibGUsXHJcbiAgTWFueVRvTWFueSxcclxuICBNYW55VG9PbmUsXHJcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcclxufSBmcm9tIFwidHlwZW9ybVwiO1xyXG5pbXBvcnQgeyBCcmFuZCB9IGZyb20gXCIuL0JyYW5kXCI7XHJcbmltcG9ydCB7IENhdGVnb3J5IH0gZnJvbSBcIi4vQ2F0ZWdvcnlcIjtcclxuaW1wb3J0IHsgTWV0YURldGEgfSBmcm9tIFwiLi9NZXRhRGF0YVwiO1xyXG5pbXBvcnQgeyBJbWFnZUdhbGxlcnkgfSBmcm9tIFwiLi9JbWFnZUdhbGxlcnlcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuL1VzZXJcIjtcclxuXHJcbkBFbnRpdHkoeyBuYW1lOiBcIm5ld3NcIiB9KVxyXG5leHBvcnQgY2xhc3MgTmV3cyB7XHJcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxyXG4gIGlkOiBudW1iZXI7XHJcblxyXG4gIEBDb2x1bW4oe25hbWU6XCJhbGlhc19uYW1lXCJ9KVxyXG4gIGFsaWFzTmFtZTpzdHJpbmc7XHJcblxyXG4gIEBDb2x1bW4oeyBsZW5ndGg6IDIwNSB9KVxyXG4gIHRpdGxlOiBzdHJpbmc7XHJcblxyXG4gIEBNYW55VG9PbmUoKCkgPT4gVXNlciwgKHVzZXI6IFVzZXIpID0+IHVzZXIuaWQpXHJcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiBcInVzZXJcIiB9KVxyXG4gIHVzZXI6IFVzZXI7XHJcblxyXG4gIEBNYW55VG9NYW55KCgpID0+IE1ldGFEZXRhLCAobWV0YTogTWV0YURldGEpID0+IG1ldGEubmV3cylcclxuICBASm9pblRhYmxlKHtcclxuICAgIG5hbWU6IFwibmV3c19tZXRhZGF0YVwiLFxyXG4gICAgam9pbkNvbHVtbjogeyBuYW1lOiBcIm5ld3NcIiwgcmVmZXJlbmNlZENvbHVtbk5hbWU6IFwiaWRcIiB9LFxyXG4gICAgaW52ZXJzZUpvaW5Db2x1bW46IHsgbmFtZTogXCJtZXRhX2RhdGFcIiwgcmVmZXJlbmNlZENvbHVtbk5hbWU6IFwiaWRcIiB9LFxyXG4gIH0pXHJcbiAgbWV0YURhdGFzOiBNZXRhRGV0YVtdO1xyXG5cclxuICBAQ29sdW1uKHsgdHlwZTogXCJ0ZXh0XCIgfSlcclxuICBjb250ZW50OiBzdHJpbmc7XHJcblxyXG4gIEBNYW55VG9NYW55KCgpID0+IEltYWdlR2FsbGVyeSwgKGltZzogSW1hZ2VHYWxsZXJ5KSA9PiBpbWcubmV3cylcclxuICBASm9pblRhYmxlKHtcclxuICAgIG5hbWU6IFwibmV3c19pbWFnZXNcIixcclxuICAgIGpvaW5Db2x1bW46IHsgbmFtZTogXCJuZXdzXCIsIHJlZmVyZW5jZWRDb2x1bW5OYW1lOiBcImlkXCIgfSxcclxuICAgIGludmVyc2VKb2luQ29sdW1uOiB7IG5hbWU6IFwiaW1hZ2VcIiwgcmVmZXJlbmNlZENvbHVtbk5hbWU6IFwiaWRcIiB9LFxyXG4gIH0pXHJcbiAgaW1hZ2VzOiBJbWFnZUdhbGxlcnlbXTtcclxuXHJcbiAgQE1hbnlUb01hbnkoKCkgPT4gQnJhbmQsIChicmFuZDogQnJhbmQpID0+IGJyYW5kLm5ld3MpXHJcbiAgQEpvaW5UYWJsZSh7XHJcbiAgICBuYW1lOiBcIm5ld3NfYnJhbmRzXCIsXHJcbiAgICBqb2luQ29sdW1uOiB7IG5hbWU6IFwibmV3c1wiLCByZWZlcmVuY2VkQ29sdW1uTmFtZTogXCJpZFwiIH0sXHJcbiAgICBpbnZlcnNlSm9pbkNvbHVtbjogeyBuYW1lOiBcImJyYW5kXCIsIHJlZmVyZW5jZWRDb2x1bW5OYW1lOiBcImlkXCIgfSxcclxuICB9KVxyXG4gIGJyYW5kOiBCcmFuZDtcclxuXHJcbiAgQE1hbnlUb09uZSgoKSA9PiBDYXRlZ29yeSwgKGNhdDogQ2F0ZWdvcnkpID0+IGNhdC5pZClcclxuICBASm9pbkNvbHVtbih7IG5hbWU6IFwiY2F0ZWdvcnlcIiwgcmVmZXJlbmNlZENvbHVtbk5hbWU6IFwiaWRcIiB9KVxyXG4gIGNhdGVnb3J5OiBDYXRlZ29yeTtcclxuXHJcbiAgQENyZWF0ZURhdGVDb2x1bW4oKVxyXG4gIGNyYXRlRGF0ZTogRGF0ZTtcclxuXHJcbiAgQENvbHVtbih7IG5hbWU6IFwidXBkYXRlX2RhdGVcIiwgdHlwZTogXCJkYXRldGltZVwiIH0pXHJcbiAgdXBkYXRlRGF0ZTogRGF0ZTtcclxuXHJcbiAgYWRkSW1hZ2UoaW1hZ2U6IEltYWdlR2FsbGVyeSkge1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMuaW1hZ2VzKSkge1xyXG4gICAgICB0aGlzLmltYWdlcyA9IG5ldyBBcnJheTxJbWFnZUdhbGxlcnk+KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmltYWdlcy5wdXNoKGltYWdlKTtcclxuICB9XHJcblxyXG4gIGFkZEFsbEltYWdlKGltZ3M6IEltYWdlR2FsbGVyeVtdKSB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodGhpcy5pbWFnZXMpKSB7XHJcbiAgICAgIHRoaXMuaW1hZ2VzID0gbmV3IEFycmF5PEltYWdlR2FsbGVyeT4oKTtcclxuICAgIH1cclxuICAgIHRoaXMuaW1hZ2VzLnB1c2guYXBwbHkodGhpcy5pbWFnZXMsIGltZ3MpO1xyXG4gIH1cclxuXHJcbiAgYWRkTWV0YURhdGEobWV0YTogTWV0YURldGEpIHtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheSh0aGlzLm1ldGFEYXRhcykpIHtcclxuICAgICAgdGhpcy5tZXRhRGF0YXMgPSBuZXcgQXJyYXk8TWV0YURldGE+KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1ldGFEYXRhcy5wdXNoKG1ldGEpO1xyXG4gIH1cclxuXHJcbiAgYWRkQWxsTWV0YShtZXRhczogTWV0YURldGFbXSkge1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHRoaXMubWV0YURhdGFzKSkge1xyXG4gICAgICB0aGlzLm1ldGFEYXRhcyA9IG5ldyBBcnJheTxNZXRhRGV0YT4oKTtcclxuICAgIH1cclxuICAgIHRoaXMubWV0YURhdGFzLnB1c2guYXBwbHkodGhpcy5tZXRhRGF0YXMsIG1ldGFzKTtcclxuICB9XHJcbiAgXHJcbn1cclxuIl19