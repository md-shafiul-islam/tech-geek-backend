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
exports.Rating = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("./Product");
const RatingItem_1 = require("./RatingItem");
const User_1 = require("./User");
let Rating = class Rating {
    id;
    publicId;
    author;
    product;
    approveUser;
    tagLine;
    totalRating;
    rateMaxScore;
    rateMinScore;
    rateAvrScore;
    rateItemsCount;
    ratingItems;
    avgRatProduct;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Rating.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "public_id", unique: true, length: 60 }),
    (0, typeorm_1.Generated)("uuid"),
    __metadata("design:type", String)
], Rating.prototype, "publicId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: "author" }),
    __metadata("design:type", User_1.User)
], Rating.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_1.Product, (product) => product.ratings),
    (0, typeorm_1.JoinColumn)({ name: "product" }),
    __metadata("design:type", Product_1.Product)
], Rating.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id),
    (0, typeorm_1.JoinColumn)({ name: "approve_user" }),
    __metadata("design:type", User_1.User)
], Rating.prototype, "approveUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "tag_line", nullable: true }),
    __metadata("design:type", String)
], Rating.prototype, "tagLine", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "total_rating" }),
    __metadata("design:type", Number)
], Rating.prototype, "totalRating", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "rate_max_score" }),
    __metadata("design:type", Number)
], Rating.prototype, "rateMaxScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "rate_min_score" }),
    __metadata("design:type", Number)
], Rating.prototype, "rateMinScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "rate_avr_score" }),
    __metadata("design:type", Number)
], Rating.prototype, "rateAvrScore", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "rate_items_count" }),
    __metadata("design:type", Number)
], Rating.prototype, "rateItemsCount", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RatingItem_1.RatingItem, (ratingItem) => ratingItem.rating),
    __metadata("design:type", Array)
], Rating.prototype, "ratingItems", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Product_1.Product, (product) => product.avgRating),
    (0, typeorm_1.JoinColumn)({ name: "avg_product_rate" }),
    __metadata("design:type", Product_1.Product)
], Rating.prototype, "avgRatProduct", void 0);
Rating = __decorate([
    (0, typeorm_1.Entity)("rating")
], Rating);
exports.Rating = Rating;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmF0aW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZGVsL1JhdGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FTaUI7QUFDakIsdUNBQW9DO0FBQ3BDLDZDQUEwQztBQUMxQyxpQ0FBOEI7QUFHOUIsSUFBYSxNQUFNLEdBQW5CLE1BQWEsTUFBTTtJQUVqQixFQUFFLENBQVM7SUFJWCxRQUFRLENBQVM7SUFJakIsTUFBTSxDQUFPO0lBSWIsT0FBTyxDQUFVO0lBSWpCLFdBQVcsQ0FBTztJQUdsQixPQUFPLENBQVM7SUFHaEIsV0FBVyxDQUFTO0lBR3BCLFlBQVksQ0FBUztJQUdyQixZQUFZLENBQVM7SUFHckIsWUFBWSxDQUFTO0lBR3JCLGNBQWMsQ0FBUztJQUd2QixXQUFXLENBQWU7SUFJMUIsYUFBYSxDQUFTO0NBQ3ZCLENBQUE7QUExQ0M7SUFEQyxJQUFBLGdDQUFzQixHQUFFOztrQ0FDZDtBQUlYO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBQyxFQUFFLEVBQUUsQ0FBQztJQUN0RCxJQUFBLG1CQUFTLEVBQUMsTUFBTSxDQUFDOzt3Q0FDRDtBQUlqQjtJQUZDLElBQUEsbUJBQVMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxXQUFJLEVBQUUsQ0FBQyxJQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7SUFDbEUsSUFBQSxvQkFBVSxFQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxDQUFDOzhCQUN2QixXQUFJO3NDQUFDO0FBSWI7SUFGQyxJQUFBLG1CQUFTLEVBQUMsR0FBRyxFQUFFLENBQUMsaUJBQU8sRUFBRSxDQUFDLE9BQWdCLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDL0QsSUFBQSxvQkFBVSxFQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDOzhCQUN2QixpQkFBTzt1Q0FBQztBQUlqQjtJQUZDLElBQUEsbUJBQVMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxXQUFJLEVBQUUsQ0FBQyxJQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDOUMsSUFBQSxvQkFBVSxFQUFDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxDQUFDOzhCQUN4QixXQUFJOzJDQUFDO0FBR2xCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsSUFBSSxFQUFFLENBQUM7O3VDQUM1QjtBQUdoQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsQ0FBQzs7MkNBQ2I7QUFHcEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQzs7NENBQ2Q7QUFHckI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQzs7NENBQ2Q7QUFHckI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQzs7NENBQ2Q7QUFHckI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQzs7OENBQ2Q7QUFHdkI7SUFEQyxJQUFBLG1CQUFTLEVBQUMsR0FBRyxFQUFFLENBQUMsdUJBQVUsRUFBRSxDQUFDLFVBQXNCLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7OzJDQUNqRDtBQUkxQjtJQUZDLElBQUEsa0JBQVEsRUFBQyxHQUFFLEVBQUUsQ0FBQSxpQkFBTyxFQUFFLENBQUMsT0FBZSxFQUFDLEVBQUUsQ0FBQSxPQUFPLENBQUMsU0FBUyxDQUFDO0lBQzNELElBQUEsb0JBQVUsRUFBQyxFQUFDLElBQUksRUFBQyxrQkFBa0IsRUFBQyxDQUFDOzhCQUN4QixpQkFBTzs2Q0FBQztBQTNDWCxNQUFNO0lBRGxCLElBQUEsZ0JBQU0sRUFBQyxRQUFRLENBQUM7R0FDSixNQUFNLENBNENsQjtBQTVDWSx3QkFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29sdW1uLFxyXG4gIEVudGl0eSxcclxuICBHZW5lcmF0ZWQsXHJcbiAgSm9pbkNvbHVtbixcclxuICBNYW55VG9PbmUsXHJcbiAgT25lVG9NYW55LFxyXG4gIE9uZVRvT25lLFxyXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXHJcbn0gZnJvbSBcInR5cGVvcm1cIjtcclxuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuL1Byb2R1Y3RcIjtcclxuaW1wb3J0IHsgUmF0aW5nSXRlbSB9IGZyb20gXCIuL1JhdGluZ0l0ZW1cIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuL1VzZXJcIjtcclxuXHJcbkBFbnRpdHkoXCJyYXRpbmdcIilcclxuZXhwb3J0IGNsYXNzIFJhdGluZyB7XHJcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxyXG4gIGlkOiBudW1iZXI7XHJcblxyXG4gIEBDb2x1bW4oeyBuYW1lOiBcInB1YmxpY19pZFwiLCB1bmlxdWU6IHRydWUsIGxlbmd0aDo2MCB9KVxyXG4gIEBHZW5lcmF0ZWQoXCJ1dWlkXCIpXHJcbiAgcHVibGljSWQ6IHN0cmluZztcclxuXHJcbiAgQE1hbnlUb09uZSgoKSA9PiBVc2VyLCAodXNlcjogVXNlcikgPT4gdXNlci5pZCwgeyBudWxsYWJsZTogdHJ1ZSB9KVxyXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogXCJhdXRob3JcIiB9KVxyXG4gIGF1dGhvcjogVXNlcjtcclxuXHJcbiAgQE1hbnlUb09uZSgoKSA9PiBQcm9kdWN0LCAocHJvZHVjdDogUHJvZHVjdCkgPT4gcHJvZHVjdC5yYXRpbmdzKVxyXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogXCJwcm9kdWN0XCIgfSlcclxuICBwcm9kdWN0OiBQcm9kdWN0O1xyXG5cclxuICBATWFueVRvT25lKCgpID0+IFVzZXIsICh1c2VyOiBVc2VyKSA9PiB1c2VyLmlkKVxyXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogXCJhcHByb3ZlX3VzZXJcIiB9KVxyXG4gIGFwcHJvdmVVc2VyOiBVc2VyO1xyXG5cclxuICBAQ29sdW1uKHsgbmFtZTogXCJ0YWdfbGluZVwiLCBudWxsYWJsZTp0cnVlIH0pXHJcbiAgdGFnTGluZTogc3RyaW5nO1xyXG5cclxuICBAQ29sdW1uKHsgbmFtZTogXCJ0b3RhbF9yYXRpbmdcIiB9KVxyXG4gIHRvdGFsUmF0aW5nOiBudW1iZXI7XHJcblxyXG4gIEBDb2x1bW4oeyBuYW1lOiBcInJhdGVfbWF4X3Njb3JlXCIgfSlcclxuICByYXRlTWF4U2NvcmU6IG51bWJlcjtcclxuXHJcbiAgQENvbHVtbih7IG5hbWU6IFwicmF0ZV9taW5fc2NvcmVcIiB9KVxyXG4gIHJhdGVNaW5TY29yZTogbnVtYmVyO1xyXG5cclxuICBAQ29sdW1uKHsgbmFtZTogXCJyYXRlX2F2cl9zY29yZVwiIH0pXHJcbiAgcmF0ZUF2clNjb3JlOiBudW1iZXI7XHJcblxyXG4gIEBDb2x1bW4oeyBuYW1lOiBcInJhdGVfaXRlbXNfY291bnRcIiB9KVxyXG4gIHJhdGVJdGVtc0NvdW50OiBudW1iZXI7XHJcblxyXG4gIEBPbmVUb01hbnkoKCkgPT4gUmF0aW5nSXRlbSwgKHJhdGluZ0l0ZW06IFJhdGluZ0l0ZW0pID0+IHJhdGluZ0l0ZW0ucmF0aW5nKVxyXG4gIHJhdGluZ0l0ZW1zOiBSYXRpbmdJdGVtW107XHJcblxyXG4gIEBPbmVUb09uZSgoKT0+UHJvZHVjdCwgKHByb2R1Y3Q6UHJvZHVjdCk9PnByb2R1Y3QuYXZnUmF0aW5nKVxyXG4gIEBKb2luQ29sdW1uKHtuYW1lOlwiYXZnX3Byb2R1Y3RfcmF0ZVwifSlcclxuICBhdmdSYXRQcm9kdWN0OlByb2R1Y3Q7XHJcbn1cclxuIl19