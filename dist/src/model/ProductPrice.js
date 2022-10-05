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
exports.ProductPrice = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("./Product");
let ProductPrice = class ProductPrice {
    id;
    title;
    type;
    price;
    discountPrice;
    isDiscounted;
    product;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductPrice.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductPrice.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProductPrice.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "price", type: "double", default: 0 }),
    __metadata("design:type", Number)
], ProductPrice.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "double", name: "discount_price", default: 0 }),
    __metadata("design:type", Number)
], ProductPrice.prototype, "discountPrice", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "discount_status", default: false }),
    __metadata("design:type", Boolean)
], ProductPrice.prototype, "isDiscounted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_1.Product, (product) => product.id),
    (0, typeorm_1.JoinColumn)({ name: "product" }),
    __metadata("design:type", Product_1.Product)
], ProductPrice.prototype, "product", void 0);
ProductPrice = __decorate([
    (0, typeorm_1.Entity)({ name: "product_price" })
], ProductPrice);
exports.ProductPrice = ProductPrice;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZHVjdFByaWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZGVsL1Byb2R1Y3RQcmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FNaUI7QUFFakIsdUNBQW9DO0FBR3BDLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQVk7SUFFdkIsRUFBRSxDQUFTO0lBR1gsS0FBSyxDQUFRO0lBR2IsSUFBSSxDQUFRO0lBR1osS0FBSyxDQUFTO0lBR2QsYUFBYSxDQUFTO0lBR3RCLFlBQVksQ0FBVTtJQUl0QixPQUFPLENBQVU7Q0FDbEIsQ0FBQTtBQXBCQztJQURDLElBQUEsZ0NBQXNCLEdBQUU7O3dDQUNkO0FBR1g7SUFEQyxJQUFBLGdCQUFNLEdBQUU7OzJDQUNJO0FBR2I7SUFEQyxJQUFBLGdCQUFNLEdBQUU7OzBDQUNHO0FBR1o7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFDLENBQUMsRUFBRSxDQUFDOzsyQ0FDdkM7QUFHZDtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLE9BQU8sRUFBQyxDQUFDLEVBQUUsQ0FBQzs7bURBQ3hDO0FBR3RCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBQyxLQUFLLEVBQUUsQ0FBQzs7a0RBQzdCO0FBSXRCO0lBRkMsSUFBQSxtQkFBUyxFQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFDakQsSUFBQSxvQkFBVSxFQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDOzhCQUN2QixpQkFBTzs2Q0FBQztBQXJCTixZQUFZO0lBRHhCLElBQUEsZ0JBQU0sRUFBQyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsQ0FBQztHQUNyQixZQUFZLENBc0J4QjtBQXRCWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29sdW1uLFxyXG4gIEVudGl0eSxcclxuICBKb2luQ29sdW1uLFxyXG4gIE1hbnlUb09uZSxcclxuICBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uLFxyXG59IGZyb20gXCJ0eXBlb3JtXCI7XHJcblxyXG5pbXBvcnQgeyBQcm9kdWN0IH0gZnJvbSBcIi4vUHJvZHVjdFwiO1xyXG5cclxuQEVudGl0eSh7IG5hbWU6IFwicHJvZHVjdF9wcmljZVwiIH0pXHJcbmV4cG9ydCBjbGFzcyBQcm9kdWN0UHJpY2Uge1xyXG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcclxuICBpZDogbnVtYmVyO1xyXG5cclxuICBAQ29sdW1uKClcclxuICB0aXRsZTpzdHJpbmc7XHJcblxyXG4gIEBDb2x1bW4oKVxyXG4gIHR5cGU6c3RyaW5nO1xyXG5cclxuICBAQ29sdW1uKHsgbmFtZTogXCJwcmljZVwiLCB0eXBlOiBcImRvdWJsZVwiLCBkZWZhdWx0OjAgfSlcclxuICBwcmljZTogbnVtYmVyO1xyXG5cclxuICBAQ29sdW1uKHsgdHlwZTogXCJkb3VibGVcIiwgbmFtZTogXCJkaXNjb3VudF9wcmljZVwiLCBkZWZhdWx0OjAgfSlcclxuICBkaXNjb3VudFByaWNlOiBudW1iZXI7XHJcblxyXG4gIEBDb2x1bW4oeyBuYW1lOiBcImRpc2NvdW50X3N0YXR1c1wiLCBkZWZhdWx0OmZhbHNlIH0pXHJcbiAgaXNEaXNjb3VudGVkOiBib29sZWFuO1xyXG5cclxuICBATWFueVRvT25lKCgpID0+IFByb2R1Y3QsIChwcm9kdWN0KSA9PiBwcm9kdWN0LmlkKVxyXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogXCJwcm9kdWN0XCIgfSlcclxuICBwcm9kdWN0OiBQcm9kdWN0O1xyXG59XHJcbiJdfQ==