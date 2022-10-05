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
exports.InputFormTemplate = void 0;
const typeorm_1 = require("typeorm");
let InputFormTemplate = class InputFormTemplate {
    id;
    name;
    url;
    fields;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InputFormTemplate.prototype, "id", void 0);
InputFormTemplate = __decorate([
    (0, typeorm_1.Entity)({ name: "input_template" })
], InputFormTemplate);
exports.InputFormTemplate = InputFormTemplate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5wdXRGb3JtVGVtcGxhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWwvSW5wdXRGb3JtVGVtcGxhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXlEO0FBSXpELElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBRTVCLEVBQUUsQ0FBUztJQUVYLElBQUksQ0FBUztJQUViLEdBQUcsQ0FBUztJQUVaLE1BQU0sQ0FBYztDQUNyQixDQUFBO0FBUEM7SUFEQyxJQUFBLGdDQUFzQixHQUFFOzs2Q0FDZDtBQUZBLGlCQUFpQjtJQUQ3QixJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQztHQUN0QixpQkFBaUIsQ0FTN0I7QUFUWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHksIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4gfSBmcm9tIFwidHlwZW9ybVwiO1xyXG5pbXBvcnQgeyBGaWVsZE5hbWUgfSBmcm9tIFwiLi9GaWVsZE5hbWVcIjtcclxuXHJcbkBFbnRpdHkoeyBuYW1lOiBcImlucHV0X3RlbXBsYXRlXCIgfSlcclxuZXhwb3J0IGNsYXNzIElucHV0Rm9ybVRlbXBsYXRlIHtcclxuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXHJcbiAgaWQ6IG51bWJlcjtcclxuXHJcbiAgbmFtZTogc3RyaW5nO1xyXG5cclxuICB1cmw6IHN0cmluZztcclxuXHJcbiAgZmllbGRzOiBGaWVsZE5hbWVbXTtcclxufVxyXG4iXX0=