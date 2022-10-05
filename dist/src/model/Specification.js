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
exports.Specification = void 0;
const typeorm_1 = require("typeorm");
const Product_1 = require("./Product");
const SpecKey_1 = require("./SpecKey");
let Specification = class Specification {
    id;
    key;
    value;
    description;
    product;
    isFeature;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Specification.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SpecKey_1.SpecKey, (specKey) => specKey.id),
    (0, typeorm_1.JoinColumn)({ name: "spc_key" }),
    __metadata("design:type", SpecKey_1.SpecKey)
], Specification.prototype, "key", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "value", type: "mediumtext" }),
    __metadata("design:type", String)
], Specification.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "description", type: "mediumtext" }),
    __metadata("design:type", String)
], Specification.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Product_1.Product, (product) => product.specifications),
    (0, typeorm_1.JoinColumn)({ name: "product" }),
    __metadata("design:type", Product_1.Product)
], Specification.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_key_feature", default: false }),
    __metadata("design:type", Boolean)
], Specification.prototype, "isFeature", void 0);
Specification = __decorate([
    (0, typeorm_1.Entity)({ name: "specification" })
], Specification);
exports.Specification = Specification;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BlY2lmaWNhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbC9TcGVjaWZpY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUNBLHFDQU1pQjtBQUNqQix1Q0FBb0M7QUFDcEMsdUNBQW9DO0FBR3BDLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFFeEIsRUFBRSxDQUFTO0lBSVgsR0FBRyxDQUFVO0lBR2IsS0FBSyxDQUFTO0lBR2QsV0FBVyxDQUFTO0lBSXBCLE9BQU8sQ0FBVTtJQUdqQixTQUFTLENBQVM7Q0FDbkIsQ0FBQTtBQWxCQztJQURDLElBQUEsZ0NBQXNCLEdBQUU7O3lDQUNkO0FBSVg7SUFGQyxJQUFBLG1CQUFTLEVBQUMsR0FBRyxFQUFFLENBQUMsaUJBQU8sRUFBRSxDQUFDLE9BQWdCLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7SUFDMUQsSUFBQSxvQkFBVSxFQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDOzhCQUMzQixpQkFBTzswQ0FBQztBQUdiO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUMsWUFBWSxFQUFDLENBQUM7OzRDQUM1QjtBQUdkO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsSUFBSSxFQUFDLGFBQWEsRUFBRSxJQUFJLEVBQUMsWUFBWSxFQUFDLENBQUM7O2tEQUM1QjtBQUlwQjtJQUZDLElBQUEsbUJBQVMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBTyxFQUFFLENBQUMsT0FBZ0IsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztJQUN0RSxJQUFBLG9CQUFVLEVBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7OEJBQ3ZCLGlCQUFPOzhDQUFDO0FBR2pCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsSUFBSSxFQUFDLGdCQUFnQixFQUFFLE9BQU8sRUFBQyxLQUFLLEVBQUMsQ0FBQzs7Z0RBQzdCO0FBbkJQLGFBQWE7SUFEekIsSUFBQSxnQkFBTSxFQUFDLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxDQUFDO0dBQ3JCLGFBQWEsQ0FvQnpCO0FBcEJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmFuZG9tVVVJRCB9IGZyb20gXCJjcnlwdG9cIjtcclxuaW1wb3J0IHtcclxuICBDb2x1bW4sXHJcbiAgRW50aXR5LFxyXG4gIEpvaW5Db2x1bW4sXHJcbiAgTWFueVRvT25lLFxyXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXHJcbn0gZnJvbSBcInR5cGVvcm1cIjtcclxuaW1wb3J0IHsgUHJvZHVjdCB9IGZyb20gXCIuL1Byb2R1Y3RcIjtcclxuaW1wb3J0IHsgU3BlY0tleSB9IGZyb20gXCIuL1NwZWNLZXlcIjtcclxuXHJcbkBFbnRpdHkoeyBuYW1lOiBcInNwZWNpZmljYXRpb25cIiB9KVxyXG5leHBvcnQgY2xhc3MgU3BlY2lmaWNhdGlvbiB7XHJcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxyXG4gIGlkOiBudW1iZXI7XHJcblxyXG4gIEBNYW55VG9PbmUoKCkgPT4gU3BlY0tleSwgKHNwZWNLZXk6IFNwZWNLZXkpID0+IHNwZWNLZXkuaWQpXHJcbiAgQEpvaW5Db2x1bW4oeyBuYW1lOiBcInNwY19rZXlcIiB9KVxyXG4gIGtleTogU3BlY0tleTtcclxuXHJcbiAgQENvbHVtbih7bmFtZTpcInZhbHVlXCIsIHR5cGU6XCJtZWRpdW10ZXh0XCJ9KVxyXG4gIHZhbHVlOiBzdHJpbmc7XHJcblxyXG4gIEBDb2x1bW4oe25hbWU6XCJkZXNjcmlwdGlvblwiLCB0eXBlOlwibWVkaXVtdGV4dFwifSlcclxuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xyXG5cclxuICBATWFueVRvT25lKCgpID0+IFByb2R1Y3QsIChwcm9kdWN0OiBQcm9kdWN0KSA9PiBwcm9kdWN0LnNwZWNpZmljYXRpb25zKVxyXG4gIEBKb2luQ29sdW1uKHsgbmFtZTogXCJwcm9kdWN0XCIgfSlcclxuICBwcm9kdWN0OiBQcm9kdWN0O1xyXG5cclxuICBAQ29sdW1uKHtuYW1lOlwiaXNfa2V5X2ZlYXR1cmVcIiwgZGVmYXVsdDpmYWxzZX0pXHJcbiAgaXNGZWF0dXJlOmJvb2xlYW47XHJcbn1cclxuIl19