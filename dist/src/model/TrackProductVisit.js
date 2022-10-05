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
exports.TrackProductVisit = void 0;
const typeorm_1 = require("typeorm");
let TrackProductVisit = class TrackProductVisit {
    id;
    name;
    pId;
    visits;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TrackProductVisit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], TrackProductVisit.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "product" }),
    __metadata("design:type", Number)
], TrackProductVisit.prototype, "pId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "visits" }),
    __metadata("design:type", Number)
], TrackProductVisit.prototype, "visits", void 0);
TrackProductVisit = __decorate([
    (0, typeorm_1.Entity)({ name: "track_product_visit" })
], TrackProductVisit);
exports.TrackProductVisit = TrackProductVisit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhY2tQcm9kdWN0VmlzaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWwvVHJhY2tQcm9kdWN0VmlzaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWlFO0FBR2pFLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWlCO0lBRTVCLEVBQUUsQ0FBUztJQUdYLElBQUksQ0FBUztJQUdiLEdBQUcsQ0FBUztJQUdaLE1BQU0sQ0FBUztDQUNoQixDQUFBO0FBVkM7SUFEQyxJQUFBLGdDQUFzQixHQUFFOzs2Q0FDZDtBQUdYO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDOzsrQ0FDWDtBQUdiO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDOzs4Q0FDaEI7QUFHWjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQzs7aURBQ1o7QUFYSixpQkFBaUI7SUFEN0IsSUFBQSxnQkFBTSxFQUFDLEVBQUUsSUFBSSxFQUFFLHFCQUFxQixFQUFFLENBQUM7R0FDM0IsaUJBQWlCLENBWTdCO0FBWlksOENBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sdW1uLCBFbnRpdHksIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4gfSBmcm9tIFwidHlwZW9ybVwiO1xyXG5cclxuQEVudGl0eSh7IG5hbWU6IFwidHJhY2tfcHJvZHVjdF92aXNpdFwiIH0pXHJcbmV4cG9ydCBjbGFzcyBUcmFja1Byb2R1Y3RWaXNpdCB7XHJcbiAgQFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4oKVxyXG4gIGlkOiBudW1iZXI7XHJcblxyXG4gIEBDb2x1bW4oeyBsZW5ndGg6IDEwMCB9KVxyXG4gIG5hbWU6IHN0cmluZztcclxuXHJcbiAgQENvbHVtbih7IG5hbWU6IFwicHJvZHVjdFwiIH0pXHJcbiAgcElkOiBudW1iZXI7XHJcblxyXG4gIEBDb2x1bW4oeyBuYW1lOiBcInZpc2l0c1wiIH0pXHJcbiAgdmlzaXRzOiBudW1iZXI7XHJcbn1cclxuIl19