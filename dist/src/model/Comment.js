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
exports.Comment = void 0;
const typeorm_1 = require("typeorm");
const News_1 = require("./News");
const Post_1 = require("./Post");
const Product_1 = require("./Product");
const User_1 = require("./User");
let Comment = class Comment {
    id;
    content;
    author;
    approveUser;
    product;
    news;
    post;
    children;
    parent;
    createDate;
    updateDate;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "content", type: "text" }),
    __metadata("design:type", String)
], Comment.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id),
    (0, typeorm_1.JoinColumn)({ name: "author", referencedColumnName: "id" }),
    __metadata("design:type", User_1.User)
], Comment.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, (user) => user.id),
    (0, typeorm_1.JoinColumn)({ name: "approve_user", referencedColumnName: "id" }),
    __metadata("design:type", User_1.User)
], Comment.prototype, "approveUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_1.Product, (product) => product.id),
    (0, typeorm_1.JoinColumn)({ name: "product", referencedColumnName: "id" }),
    __metadata("design:type", Product_1.Product)
], Comment.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => News_1.News, (news) => news.id),
    (0, typeorm_1.JoinColumn)({ name: "news", referencedColumnName: "id" }),
    __metadata("design:type", News_1.News)
], Comment.prototype, "news", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Post_1.Post, (post) => post.id),
    (0, typeorm_1.JoinColumn)({ name: "post", referencedColumnName: "id" }),
    __metadata("design:type", Post_1.Post)
], Comment.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.TreeChildren)(),
    __metadata("design:type", Array)
], Comment.prototype, "children", void 0);
__decorate([
    (0, typeorm_1.TreeParent)(),
    __metadata("design:type", Comment)
], Comment.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "create_date" }),
    __metadata("design:type", Date)
], Comment.prototype, "createDate", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "update_date" }),
    __metadata("design:type", Date)
], Comment.prototype, "updateDate", void 0);
Comment = __decorate([
    (0, typeorm_1.Entity)({ name: "comment" }),
    (0, typeorm_1.Tree)("closure-table", {
        closureTableName: "comment_closure",
        ancestorColumnName: (column) => "parent" + column.propertyName,
        descendantColumnName: (column) => "children" + column.propertyName,
    })
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbC9Db21tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQVdpQjtBQUNqQixpQ0FBOEI7QUFDOUIsaUNBQThCO0FBQzlCLHVDQUFvQztBQUNwQyxpQ0FBOEI7QUFROUIsSUFBYSxPQUFPLEdBQXBCLE1BQWEsT0FBTztJQUVsQixFQUFFLENBQVM7SUFHWCxPQUFPLENBQVM7SUFJaEIsTUFBTSxDQUFPO0lBSWIsV0FBVyxDQUFPO0lBSWxCLE9BQU8sQ0FBVTtJQUlqQixJQUFJLENBQU87SUFJWCxJQUFJLENBQU87SUFHWCxRQUFRLENBQVk7SUFHcEIsTUFBTSxDQUFVO0lBR2hCLFVBQVUsQ0FBTztJQUdqQixVQUFVLENBQU87Q0FDbEIsQ0FBQTtBQXBDQztJQURDLElBQUEsZ0NBQXNCLEdBQUU7O21DQUNkO0FBR1g7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsQ0FBQzs7d0NBQzFCO0FBSWhCO0lBRkMsSUFBQSxtQkFBUyxFQUFDLEdBQUcsRUFBRSxDQUFDLFdBQUksRUFBRSxDQUFDLElBQVUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUM5QyxJQUFBLG9CQUFVLEVBQUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLElBQUksRUFBRSxDQUFDOzhCQUNuRCxXQUFJO3VDQUFDO0FBSWI7SUFGQyxJQUFBLG1CQUFTLEVBQUMsR0FBRyxFQUFFLENBQUMsV0FBSSxFQUFFLENBQUMsSUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzlDLElBQUEsb0JBQVUsRUFBQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUM7OEJBQ3BELFdBQUk7NENBQUM7QUFJbEI7SUFGQyxJQUFBLG1CQUFTLEVBQUMsR0FBRyxFQUFFLENBQUMsaUJBQU8sRUFBRSxDQUFDLE9BQWdCLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFDMUQsSUFBQSxvQkFBVSxFQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQzs4QkFDbkQsaUJBQU87d0NBQUM7QUFJakI7SUFGQyxJQUFBLG1CQUFTLEVBQUMsR0FBRyxFQUFFLENBQUMsV0FBSSxFQUFFLENBQUMsSUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQzlDLElBQUEsb0JBQVUsRUFBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLENBQUM7OEJBQ25ELFdBQUk7cUNBQUM7QUFJWDtJQUZDLElBQUEsbUJBQVMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxXQUFJLEVBQUUsQ0FBQyxJQUFVLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDOUMsSUFBQSxvQkFBVSxFQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQzs4QkFDbkQsV0FBSTtxQ0FBQztBQUdYO0lBREMsSUFBQSxzQkFBWSxHQUFFOzt5Q0FDSztBQUdwQjtJQURDLElBQUEsb0JBQVUsR0FBRTs4QkFDTCxPQUFPO3VDQUFDO0FBR2hCO0lBREMsSUFBQSwwQkFBZ0IsRUFBQyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQzs4QkFDOUIsSUFBSTsyQ0FBQztBQUdqQjtJQURDLElBQUEsMEJBQWdCLEVBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUM7OEJBQzlCLElBQUk7MkNBQUM7QUFyQ04sT0FBTztJQU5uQixJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDM0IsSUFBQSxjQUFJLEVBQUMsZUFBZSxFQUFFO1FBQ3JCLGdCQUFnQixFQUFFLGlCQUFpQjtRQUNuQyxrQkFBa0IsRUFBRSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxZQUFZO1FBQzlELG9CQUFvQixFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFlBQVk7S0FDbkUsQ0FBQztHQUNXLE9BQU8sQ0FzQ25CO0FBdENZLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgQ3JlYXRlRGF0ZUNvbHVtbixcclxuICBFbnRpdHksXHJcbiAgSm9pbkNvbHVtbixcclxuICBNYW55VG9PbmUsXHJcbiAgUHJpbWFyeUdlbmVyYXRlZENvbHVtbixcclxuICBUcmVlLFxyXG4gIFRyZWVDaGlsZHJlbixcclxuICBUcmVlUGFyZW50LFxyXG4gIFVwZGF0ZURhdGVDb2x1bW4sXHJcbn0gZnJvbSBcInR5cGVvcm1cIjtcclxuaW1wb3J0IHsgTmV3cyB9IGZyb20gXCIuL05ld3NcIjtcclxuaW1wb3J0IHsgUG9zdCB9IGZyb20gXCIuL1Bvc3RcIjtcclxuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuL1Byb2R1Y3RcIjtcclxuaW1wb3J0IHsgVXNlciB9IGZyb20gXCIuL1VzZXJcIjtcclxuXHJcbkBFbnRpdHkoeyBuYW1lOiBcImNvbW1lbnRcIiB9KVxyXG5AVHJlZShcImNsb3N1cmUtdGFibGVcIiwge1xyXG4gIGNsb3N1cmVUYWJsZU5hbWU6IFwiY29tbWVudF9jbG9zdXJlXCIsXHJcbiAgYW5jZXN0b3JDb2x1bW5OYW1lOiAoY29sdW1uKSA9PiBcInBhcmVudFwiICsgY29sdW1uLnByb3BlcnR5TmFtZSxcclxuICBkZXNjZW5kYW50Q29sdW1uTmFtZTogKGNvbHVtbikgPT4gXCJjaGlsZHJlblwiICsgY29sdW1uLnByb3BlcnR5TmFtZSxcclxufSlcclxuZXhwb3J0IGNsYXNzIENvbW1lbnQge1xyXG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcclxuICBpZDogbnVtYmVyO1xyXG5cclxuICBAQ29sdW1uKHsgbmFtZTogXCJjb250ZW50XCIsIHR5cGU6IFwidGV4dFwiIH0pXHJcbiAgY29udGVudDogc3RyaW5nO1xyXG5cclxuICBATWFueVRvT25lKCgpID0+IFVzZXIsICh1c2VyOiBVc2VyKSA9PiB1c2VyLmlkKVxyXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogXCJhdXRob3JcIiwgcmVmZXJlbmNlZENvbHVtbk5hbWU6IFwiaWRcIiB9KVxyXG4gIGF1dGhvcjogVXNlcjtcclxuXHJcbiAgQE1hbnlUb09uZSgoKSA9PiBVc2VyLCAodXNlcjogVXNlcikgPT4gdXNlci5pZClcclxuICBASm9pbkNvbHVtbih7IG5hbWU6IFwiYXBwcm92ZV91c2VyXCIsIHJlZmVyZW5jZWRDb2x1bW5OYW1lOiBcImlkXCIgfSlcclxuICBhcHByb3ZlVXNlcjogVXNlcjtcclxuXHJcbiAgQE1hbnlUb09uZSgoKSA9PiBQcm9kdWN0LCAocHJvZHVjdDogUHJvZHVjdCkgPT4gcHJvZHVjdC5pZClcclxuICBASm9pbkNvbHVtbih7IG5hbWU6IFwicHJvZHVjdFwiLCByZWZlcmVuY2VkQ29sdW1uTmFtZTogXCJpZFwiIH0pXHJcbiAgcHJvZHVjdDogUHJvZHVjdDtcclxuXHJcbiAgQE1hbnlUb09uZSgoKSA9PiBOZXdzLCAobmV3czogTmV3cykgPT4gbmV3cy5pZClcclxuICBASm9pbkNvbHVtbih7IG5hbWU6IFwibmV3c1wiLCByZWZlcmVuY2VkQ29sdW1uTmFtZTogXCJpZFwiIH0pXHJcbiAgbmV3czogTmV3cztcclxuXHJcbiAgQE1hbnlUb09uZSgoKSA9PiBQb3N0LCAocG9zdDogUG9zdCkgPT4gcG9zdC5pZClcclxuICBASm9pbkNvbHVtbih7IG5hbWU6IFwicG9zdFwiLCByZWZlcmVuY2VkQ29sdW1uTmFtZTogXCJpZFwiIH0pXHJcbiAgcG9zdDogUG9zdDtcclxuXHJcbiAgQFRyZWVDaGlsZHJlbigpXHJcbiAgY2hpbGRyZW46IENvbW1lbnRbXTtcclxuXHJcbiAgQFRyZWVQYXJlbnQoKVxyXG4gIHBhcmVudDogQ29tbWVudDtcclxuXHJcbiAgQENyZWF0ZURhdGVDb2x1bW4oeyBuYW1lOiBcImNyZWF0ZV9kYXRlXCIgfSlcclxuICBjcmVhdGVEYXRlOiBEYXRlO1xyXG5cclxuICBAVXBkYXRlRGF0ZUNvbHVtbih7IG5hbWU6IFwidXBkYXRlX2RhdGVcIiB9KVxyXG4gIHVwZGF0ZURhdGU6IERhdGU7XHJcbn1cclxuIl19