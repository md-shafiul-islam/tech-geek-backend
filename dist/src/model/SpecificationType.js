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
exports.SpecificationType = void 0;
const typeorm_1 = require("typeorm");
const SpecKey_1 = require("./SpecKey");
let SpecificationType = class SpecificationType {
    id;
    name;
    value;
    specKeys;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SpecificationType.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 105, default: '' }),
    __metadata("design:type", String)
], SpecificationType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 105, unique: true }),
    __metadata("design:type", String)
], SpecificationType.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SpecKey_1.SpecKey, (spc) => spc.specType),
    __metadata("design:type", Array)
], SpecificationType.prototype, "specKeys", void 0);
SpecificationType = __decorate([
    (0, typeorm_1.Entity)({ name: "specification_type" })
], SpecificationType);
exports.SpecificationType = SpecificationType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BlY2lmaWNhdGlvblR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWwvU3BlY2lmaWNhdGlvblR5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQTRFO0FBQzVFLHVDQUFvQztBQUdwQyxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtJQUU1QixFQUFFLENBQVM7SUFHWCxJQUFJLENBQVM7SUFHYixLQUFLLENBQVM7SUFHZCxRQUFRLENBQVk7Q0FDckIsQ0FBQTtBQVZDO0lBREMsSUFBQSxnQ0FBc0IsR0FBRTs7NkNBQ2Q7QUFHWDtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFDLEVBQUUsRUFBRSxDQUFDOzsrQ0FDdkI7QUFHYjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUcsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDOztnREFDekI7QUFHZDtJQURDLElBQUEsbUJBQVMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBTyxFQUFFLENBQUMsR0FBVyxFQUFDLEVBQUUsQ0FBQSxHQUFHLENBQUMsUUFBUSxDQUFDOzttREFDbEM7QUFYVCxpQkFBaUI7SUFEN0IsSUFBQSxnQkFBTSxFQUFDLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFLENBQUM7R0FDMUIsaUJBQWlCLENBWTdCO0FBWlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBFbnRpdHksIE9uZVRvTWFueSwgUHJpbWFyeUdlbmVyYXRlZENvbHVtbiB9IGZyb20gXCJ0eXBlb3JtXCI7XHJcbmltcG9ydCB7IFNwZWNLZXkgfSBmcm9tIFwiLi9TcGVjS2V5XCI7XHJcblxyXG5ARW50aXR5KHsgbmFtZTogXCJzcGVjaWZpY2F0aW9uX3R5cGVcIiB9KVxyXG5leHBvcnQgY2xhc3MgU3BlY2lmaWNhdGlvblR5cGUge1xyXG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcclxuICBpZDogbnVtYmVyO1xyXG5cclxuICBAQ29sdW1uKHsgbGVuZ3RoOiAxMDUsIGRlZmF1bHQ6JycgfSlcclxuICBuYW1lOiBzdHJpbmc7XHJcblxyXG4gIEBDb2x1bW4oeyBsZW5ndGg6IDEwNSwgIHVuaXF1ZTogdHJ1ZSB9KVxyXG4gIHZhbHVlOiBzdHJpbmc7XHJcblxyXG4gIEBPbmVUb01hbnkoKCkgPT4gU3BlY0tleSwgKHNwYzpTcGVjS2V5KT0+c3BjLnNwZWNUeXBlKVxyXG4gIHNwZWNLZXlzOiBTcGVjS2V5W107XHJcbn1cclxuIl19