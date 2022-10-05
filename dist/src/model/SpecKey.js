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
exports.SpecKey = void 0;
const typeorm_1 = require("typeorm");
const Specification_1 = require("./Specification");
const SpecificationType_1 = require("./SpecificationType");
let SpecKey = class SpecKey {
    id;
    name;
    value;
    type;
    specType;
    specifications;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SpecKey.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], SpecKey.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 105, unique: true }),
    __metadata("design:type", String)
], SpecKey.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SpecKey.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => SpecificationType_1.SpecificationType, (spcType) => spcType.id),
    (0, typeorm_1.JoinColumn)({ name: "spec_type" }),
    __metadata("design:type", SpecificationType_1.SpecificationType)
], SpecKey.prototype, "specType", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Specification_1.Specification, (spc) => spc.key),
    __metadata("design:type", Array)
], SpecKey.prototype, "specifications", void 0);
SpecKey = __decorate([
    (0, typeorm_1.Entity)({ name: "spec_key" })
], SpecKey);
exports.SpecKey = SpecKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BlY0tleS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbC9TcGVjS2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFtRztBQUNuRyxtREFBZ0Q7QUFDaEQsMkRBQXdEO0FBR3hELElBQWEsT0FBTyxHQUFwQixNQUFhLE9BQU87SUFFbEIsRUFBRSxDQUFTO0lBR1gsSUFBSSxDQUFTO0lBR2IsS0FBSyxDQUFTO0lBR2QsSUFBSSxDQUFRO0lBSVosUUFBUSxDQUFvQjtJQUc1QixjQUFjLENBQWtCO0NBQ2pDLENBQUE7QUFqQkM7SUFEQyxJQUFBLGdDQUFzQixHQUFFOzttQ0FDZDtBQUdYO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBQyxDQUFDOztxQ0FDVjtBQUdiO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7O3NDQUN4QjtBQUdkO0lBREMsSUFBQSxnQkFBTSxHQUFFOztxQ0FDRztBQUlaO0lBRkMsSUFBQSxtQkFBUyxFQUFDLEdBQUcsRUFBRSxDQUFDLHFDQUFpQixFQUFFLENBQUMsT0FBMEIsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUM5RSxJQUFBLG9CQUFVLEVBQUMsRUFBQyxJQUFJLEVBQUMsV0FBVyxFQUFDLENBQUM7OEJBQ3JCLHFDQUFpQjt5Q0FBQztBQUc1QjtJQURDLElBQUEsbUJBQVMsRUFBQyxHQUFHLEVBQUUsQ0FBQyw2QkFBYSxFQUFFLENBQUMsR0FBa0IsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQzs7K0NBQ2hDO0FBbEJyQixPQUFPO0lBRG5CLElBQUEsZ0JBQU0sRUFBQyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQztHQUNoQixPQUFPLENBbUJuQjtBQW5CWSwwQkFBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbHVtbiwgRW50aXR5LCBKb2luQ29sdW1uLCBNYW55VG9PbmUsIE9uZVRvTWFueSwgUHJpbWFyeUdlbmVyYXRlZENvbHVtbiB9IGZyb20gXCJ0eXBlb3JtXCI7XHJcbmltcG9ydCB7IFNwZWNpZmljYXRpb24gfSBmcm9tIFwiLi9TcGVjaWZpY2F0aW9uXCI7XHJcbmltcG9ydCB7IFNwZWNpZmljYXRpb25UeXBlIH0gZnJvbSBcIi4vU3BlY2lmaWNhdGlvblR5cGVcIjtcclxuXHJcbkBFbnRpdHkoeyBuYW1lOiBcInNwZWNfa2V5XCIgfSlcclxuZXhwb3J0IGNsYXNzIFNwZWNLZXkge1xyXG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcclxuICBpZDogbnVtYmVyO1xyXG5cclxuICBAQ29sdW1uKHsgbGVuZ3RoOiAxMDB9KVxyXG4gIG5hbWU6IHN0cmluZztcclxuXHJcbiAgQENvbHVtbih7IGxlbmd0aDogMTA1LCB1bmlxdWU6IHRydWUgfSlcclxuICB2YWx1ZTogc3RyaW5nO1xyXG5cclxuICBAQ29sdW1uKClcclxuICB0eXBlOm51bWJlcjtcclxuXHJcbiAgQE1hbnlUb09uZSgoKSA9PiBTcGVjaWZpY2F0aW9uVHlwZSwgKHNwY1R5cGU6IFNwZWNpZmljYXRpb25UeXBlKSA9PiBzcGNUeXBlLmlkKVxyXG4gIEBKb2luQ29sdW1uKHtuYW1lOlwic3BlY190eXBlXCJ9KVxyXG4gIHNwZWNUeXBlOiBTcGVjaWZpY2F0aW9uVHlwZTtcclxuXHJcbiAgQE9uZVRvTWFueSgoKSA9PiBTcGVjaWZpY2F0aW9uLCAoc3BjOiBTcGVjaWZpY2F0aW9uKSA9PiBzcGMua2V5KVxyXG4gIHNwZWNpZmljYXRpb25zOiBTcGVjaWZpY2F0aW9uW107XHJcbn1cclxuIl19