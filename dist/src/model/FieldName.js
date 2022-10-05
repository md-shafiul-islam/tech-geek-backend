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
exports.FieldName = void 0;
const typeorm_1 = require("typeorm");
const InputFormTemplate_1 = require("./InputFormTemplate");
let FieldName = class FieldName {
    id;
    fieldName;
    title;
    inputFormTemplate;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FieldName.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "field_name" }),
    __metadata("design:type", String)
], FieldName.prototype, "fieldName", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => InputFormTemplate_1.InputFormTemplate, (template) => template.id),
    (0, typeorm_1.JoinColumn)({ name: "in_temp" }),
    __metadata("design:type", InputFormTemplate_1.InputFormTemplate)
], FieldName.prototype, "inputFormTemplate", void 0);
FieldName = __decorate([
    (0, typeorm_1.Entity)({ name: "field_name" })
], FieldName);
exports.FieldName = FieldName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmllbGROYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZGVsL0ZpZWxkTmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBd0Y7QUFDeEYsMkRBQXdEO0FBR3hELElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVM7SUFFcEIsRUFBRSxDQUFTO0lBR1gsU0FBUyxDQUFTO0lBRWxCLEtBQUssQ0FBUztJQUlkLGlCQUFpQixDQUFvQjtDQUN0QyxDQUFBO0FBVkM7SUFEQyxJQUFBLGdDQUFzQixHQUFFOztxQ0FDZDtBQUdYO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxDQUFDOzs0Q0FDYjtBQU1sQjtJQUZDLElBQUEsbUJBQVMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxxQ0FBaUIsRUFBRSxDQUFDLFFBQTJCLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7SUFDaEYsSUFBQSxvQkFBVSxFQUFDLEVBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxDQUFDOzhCQUNWLHFDQUFpQjtvREFBQztBQVgxQixTQUFTO0lBRHJCLElBQUEsZ0JBQU0sRUFBQyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUUsQ0FBQztHQUNsQixTQUFTLENBWXJCO0FBWlksOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb2x1bW4sIEVudGl0eSwgSm9pbkNvbHVtbiwgTWFueVRvT25lLCBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uIH0gZnJvbSBcInR5cGVvcm1cIjtcclxuaW1wb3J0IHsgSW5wdXRGb3JtVGVtcGxhdGUgfSBmcm9tIFwiLi9JbnB1dEZvcm1UZW1wbGF0ZVwiO1xyXG5cclxuQEVudGl0eSh7IG5hbWU6IFwiZmllbGRfbmFtZVwiIH0pXHJcbmV4cG9ydCBjbGFzcyBGaWVsZE5hbWUge1xyXG4gIEBQcmltYXJ5R2VuZXJhdGVkQ29sdW1uKClcclxuICBpZDogbnVtYmVyO1xyXG5cclxuICBAQ29sdW1uKHsgbmFtZTogXCJmaWVsZF9uYW1lXCIgfSlcclxuICBmaWVsZE5hbWU6IHN0cmluZztcclxuXHJcbiAgdGl0bGU6IHN0cmluZztcclxuXHJcbiAgQE1hbnlUb09uZSgoKSA9PiBJbnB1dEZvcm1UZW1wbGF0ZSwgKHRlbXBsYXRlOiBJbnB1dEZvcm1UZW1wbGF0ZSkgPT4gdGVtcGxhdGUuaWQpXHJcbiAgQEpvaW5Db2x1bW4oe25hbWU6XCJpbl90ZW1wXCJ9KVxyXG4gIGlucHV0Rm9ybVRlbXBsYXRlOiBJbnB1dEZvcm1UZW1wbGF0ZTtcclxufVxyXG4iXX0=