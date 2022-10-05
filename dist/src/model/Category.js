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
exports.Category = void 0;
const typeorm_1 = require("typeorm");
const News_1 = require("./News");
const Post_1 = require("./Post");
const Product_1 = require("./Product");
let Category = class Category {
    id;
    name;
    description;
    key;
    actionUrl;
    children;
    parent;
    products;
    posts;
    news;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50 }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "text",
    }),
    __metadata("design:type", String)
], Category.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 60 }),
    __metadata("design:type", String)
], Category.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, name: "action_url", nullable: true }),
    __metadata("design:type", String)
], Category.prototype, "actionUrl", void 0);
__decorate([
    (0, typeorm_1.TreeChildren)(),
    __metadata("design:type", Array)
], Category.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.TreeParent)(),
    __metadata("design:type", Category)
], Category.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Product_1.Product, (product) => product.category),
    __metadata("design:type", Array)
], Category.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Post_1.Post, (post) => post.category),
    __metadata("design:type", Array)
], Category.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => News_1.News, (news) => news.category),
    __metadata("design:type", Array)
], Category.prototype, "news", void 0);
Category = __decorate([
    (0, typeorm_1.Entity)({ name: "category" }),
    (0, typeorm_1.Tree)("closure-table", {
        closureTableName: "category_closure",
        ancestorColumnName: (column) => "parent" + column.propertyName,
        descendantColumnName: (column) => "children" + column.propertyName,
    })
], Category);
exports.Category = Category;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2F0ZWdvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWwvQ2F0ZWdvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBVWlCO0FBQ2pCLGlDQUE4QjtBQUM5QixpQ0FBOEI7QUFDOUIsdUNBQW9DO0FBUXBDLElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVE7SUFFbkIsRUFBRSxDQUFTO0lBR1gsSUFBSSxDQUFTO0lBS2IsV0FBVyxDQUFTO0lBR3BCLEdBQUcsQ0FBUztJQUdaLFNBQVMsQ0FBUztJQUdsQixRQUFRLENBQWE7SUFHckIsTUFBTSxDQUFXO0lBR2pCLFFBQVEsQ0FBWTtJQUdwQixLQUFLLENBQVM7SUFHZCxJQUFJLENBQVM7Q0FDZCxDQUFBO0FBOUJDO0lBREMsSUFBQSxnQ0FBc0IsR0FBRTs7b0NBQ2Q7QUFHWDtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQzs7c0NBQ1Y7QUFLYjtJQUhDLElBQUEsZ0JBQU0sRUFBQztRQUNOLElBQUksRUFBRSxNQUFNO0tBQ2IsQ0FBQzs7NkNBQ2tCO0FBR3BCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDOztxQ0FDWDtBQUdaO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQzs7MkNBQ3pDO0FBR2xCO0lBREMsSUFBQSxzQkFBWSxHQUFFOzswQ0FDTTtBQUdyQjtJQURDLElBQUEsb0JBQVUsR0FBRTs4QkFDTCxRQUFRO3dDQUFDO0FBR2pCO0lBREMsSUFBQSxtQkFBUyxFQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7OzBDQUNwQztBQUdwQjtJQURDLElBQUEsbUJBQVMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxXQUFJLEVBQUUsQ0FBQyxJQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7O3VDQUN2QztBQUdkO0lBREMsSUFBQSxtQkFBUyxFQUFDLEdBQUcsRUFBRSxDQUFDLFdBQUksRUFBRSxDQUFDLElBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7c0NBQ3hDO0FBL0JGLFFBQVE7SUFOcEIsSUFBQSxnQkFBTSxFQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDO0lBQzVCLElBQUEsY0FBSSxFQUFDLGVBQWUsRUFBRTtRQUNyQixnQkFBZ0IsRUFBRSxrQkFBa0I7UUFDcEMsa0JBQWtCLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsWUFBWTtRQUM5RCxvQkFBb0IsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxZQUFZO0tBQ25FLENBQUM7R0FDVyxRQUFRLENBZ0NwQjtBQWhDWSw0QkFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29sdW1uLFxyXG4gIEVudGl0eSxcclxuICBKb2luQ29sdW1uLFxyXG4gIE9uZVRvTWFueSxcclxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxyXG4gIFRyZWUsXHJcbiAgVHJlZUNoaWxkcmVuLFxyXG4gIFRyZWVQYXJlbnQsXHJcbiAgVHJlZUxldmVsQ29sdW1uLFxyXG59IGZyb20gXCJ0eXBlb3JtXCI7XHJcbmltcG9ydCB7IE5ld3MgfSBmcm9tIFwiLi9OZXdzXCI7XHJcbmltcG9ydCB7IFBvc3QgfSBmcm9tIFwiLi9Qb3N0XCI7XHJcbmltcG9ydCB7IFByb2R1Y3QgfSBmcm9tIFwiLi9Qcm9kdWN0XCI7XHJcblxyXG5ARW50aXR5KHsgbmFtZTogXCJjYXRlZ29yeVwiIH0pXHJcbkBUcmVlKFwiY2xvc3VyZS10YWJsZVwiLCB7XHJcbiAgY2xvc3VyZVRhYmxlTmFtZTogXCJjYXRlZ29yeV9jbG9zdXJlXCIsXHJcbiAgYW5jZXN0b3JDb2x1bW5OYW1lOiAoY29sdW1uKSA9PiBcInBhcmVudFwiICsgY29sdW1uLnByb3BlcnR5TmFtZSxcclxuICBkZXNjZW5kYW50Q29sdW1uTmFtZTogKGNvbHVtbikgPT4gXCJjaGlsZHJlblwiICsgY29sdW1uLnByb3BlcnR5TmFtZSxcclxufSlcclxuZXhwb3J0IGNsYXNzIENhdGVnb3J5IHtcclxuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXHJcbiAgaWQ6IG51bWJlcjtcclxuXHJcbiAgQENvbHVtbih7IGxlbmd0aDogNTAgfSlcclxuICBuYW1lOiBzdHJpbmc7XHJcblxyXG4gIEBDb2x1bW4oe1xyXG4gICAgdHlwZTogXCJ0ZXh0XCIsXHJcbiAgfSlcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG5cclxuICBAQ29sdW1uKHsgbGVuZ3RoOiA2MCB9KVxyXG4gIGtleTogc3RyaW5nO1xyXG5cclxuICBAQ29sdW1uKHsgbGVuZ3RoOiAyMCwgbmFtZTogXCJhY3Rpb25fdXJsXCIsIG51bGxhYmxlOiB0cnVlIH0pXHJcbiAgYWN0aW9uVXJsOiBzdHJpbmc7XHJcblxyXG4gIEBUcmVlQ2hpbGRyZW4oKVxyXG4gIGNoaWxkcmVuOiBDYXRlZ29yeVtdO1xyXG5cclxuICBAVHJlZVBhcmVudCgpXHJcbiAgcGFyZW50OiBDYXRlZ29yeTtcclxuXHJcbiAgQE9uZVRvTWFueSgoKSA9PiBQcm9kdWN0LCAocHJvZHVjdCkgPT4gcHJvZHVjdC5jYXRlZ29yeSlcclxuICBwcm9kdWN0czogUHJvZHVjdFtdO1xyXG5cclxuICBAT25lVG9NYW55KCgpID0+IFBvc3QsIChwb3N0OiBQb3N0KSA9PiBwb3N0LmNhdGVnb3J5KVxyXG4gIHBvc3RzOiBQb3N0W107XHJcblxyXG4gIEBPbmVUb01hbnkoKCkgPT4gTmV3cywgKG5ld3M6IE5ld3MpID0+IG5ld3MuY2F0ZWdvcnkpXHJcbiAgbmV3czogTmV3c1tdO1xyXG59XHJcbiJdfQ==