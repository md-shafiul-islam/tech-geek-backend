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
exports.RateKey = void 0;
const typeorm_1 = require("typeorm");
let RateKey = class RateKey {
    id;
    name;
    value;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RateKey.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "name" }),
    __metadata("design:type", String)
], RateKey.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "value" }),
    __metadata("design:type", String)
], RateKey.prototype, "value", void 0);
RateKey = __decorate([
    (0, typeorm_1.Entity)({ name: "rate_key" })
], RateKey);
exports.RateKey = RateKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmF0ZUtleS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbC9SYXRlS2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFpRTtBQUdqRSxJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFPO0lBR2hCLEVBQUUsQ0FBUTtJQUdWLElBQUksQ0FBUTtJQUdaLEtBQUssQ0FBUTtDQUNoQixDQUFBO0FBUEc7SUFEQyxJQUFBLGdDQUFzQixHQUFFOzttQ0FDZjtBQUdWO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsSUFBSSxFQUFDLE1BQU0sRUFBQyxDQUFDOztxQ0FDVjtBQUdaO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxDQUFDOztzQ0FDVjtBQVRKLE9BQU87SUFEbkIsSUFBQSxnQkFBTSxFQUFDLEVBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxDQUFDO0dBQ2IsT0FBTyxDQVVuQjtBQVZZLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBFbnRpdHksIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4gfSBmcm9tIFwidHlwZW9ybVwiO1xyXG5cclxuQEVudGl0eSh7bmFtZTpcInJhdGVfa2V5XCJ9KVxyXG5leHBvcnQgY2xhc3MgUmF0ZUtleXtcclxuXHJcbiAgICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXHJcbiAgICBpZDpudW1iZXI7XHJcblxyXG4gICAgQENvbHVtbih7bmFtZTpcIm5hbWVcIn0pXHJcbiAgICBuYW1lOnN0cmluZztcclxuXHJcbiAgICBAQ29sdW1uKHtuYW1lOlwidmFsdWVcIn0pXHJcbiAgICB2YWx1ZTpzdHJpbmc7XHJcbn0iXX0=