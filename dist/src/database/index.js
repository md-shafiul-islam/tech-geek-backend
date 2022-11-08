"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnectionOption = void 0;
const dbConnectionOption = () => {
    // console.log("__dirname, ", __dirname + "/../model/*{.js,.ts}");
    return {
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "njha9dd3mal0ma8g",
        password: "01725^*^)@(S",
        database: "tech_geek",
        logging: false,
        synchronize: true,
        entities: [__dirname + "/../model/*{.js,.ts}"],
    };
};
exports.dbConnectionOption = dbConnectionOption;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGF0YWJhc2UvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRU8sTUFBTSxrQkFBa0IsR0FBRyxHQUFxQixFQUFFO0lBQ3ZELGtFQUFrRTtJQUNsRSxPQUFPO1FBQ0wsSUFBSSxFQUFFLE9BQU87UUFDYixJQUFJLEVBQUUsV0FBVztRQUNqQixJQUFJLEVBQUUsSUFBSTtRQUNWLFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsUUFBUSxFQUFFLGNBQWM7UUFDeEIsUUFBUSxFQUFFLFdBQVc7UUFDckIsT0FBTyxFQUFFLEtBQUs7UUFDZCxXQUFXLEVBQUUsSUFBSTtRQUNqQixRQUFRLEVBQUUsQ0FBQyxTQUFTLEdBQUcsc0JBQXNCLENBQUM7S0FDL0MsQ0FBQztBQUNKLENBQUMsQ0FBQztBQWJXLFFBQUEsa0JBQWtCLHNCQWE3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERhdGFTb3VyY2VPcHRpb25zIH0gZnJvbSBcInR5cGVvcm1cIjtcclxuXHJcbmV4cG9ydCBjb25zdCBkYkNvbm5lY3Rpb25PcHRpb24gPSAoKTpEYXRhU291cmNlT3B0aW9ucyA9PiB7XHJcbiAgLy8gY29uc29sZS5sb2coXCJfX2Rpcm5hbWUsIFwiLCBfX2Rpcm5hbWUgKyBcIi8uLi9tb2RlbC8qey5qcywudHN9XCIpO1xyXG4gIHJldHVybiB7XHJcbiAgICB0eXBlOiBcIm15c3FsXCIsXHJcbiAgICBob3N0OiBcImxvY2FsaG9zdFwiLFxyXG4gICAgcG9ydDogMzMwNixcclxuICAgIHVzZXJuYW1lOiBcIm5qaGE5ZGQzbWFsMG1hOGdcIixcclxuICAgIHBhc3N3b3JkOiBcIjAxNzI1XipeKUAoU1wiLFxyXG4gICAgZGF0YWJhc2U6IFwidGVjaF9nZWVrXCIsXHJcbiAgICBsb2dnaW5nOiBmYWxzZSxcclxuICAgIHN5bmNocm9uaXplOiB0cnVlLFxyXG4gICAgZW50aXRpZXM6IFtfX2Rpcm5hbWUgKyBcIi8uLi9tb2RlbC8qey5qcywudHN9XCJdLFxyXG4gIH07XHJcbn07XHJcblxyXG5cclxuIl19