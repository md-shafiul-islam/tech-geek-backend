"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const writeLog_1 = require("../logger/writeLog");
const User_1 = require("../model/User");
const esHelper_1 = require("../utils/esHelper");
class UserService {
    userRepository = null;
    initRepository() {
        if (this.userRepository === null) {
            this.userRepository = AppDataSource_1.AppDataSource.getRepository(User_1.User);
        }
    }
    async save(user) {
        this.initRepository();
        if (user) {
            try {
                const resp = await this.userRepository?.save(user);
                return resp;
            }
            catch (error) {
                writeLog_1.apiWriteLog.error("user Save Failed ");
            }
        }
        return null;
    }
    async getById(id) {
        this.initRepository();
        try {
            const user = await this.userRepository?.findOne({ where: { id: id } });
            return user;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error getuserByID ", err);
            return null;
        }
    }
    async getAll() {
        this.initRepository();
        try {
            const users = await this.userRepository?.find();
            return users;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error(`Error All user `, err);
            return null;
        }
    }
    async update(user) {
        this.initRepository();
        if (!(0, esHelper_1.esIsEmpty)(user)) {
            try {
                const updateuser = await this.userRepository?.update({ id: user.id }, user);
                return updateuser;
            }
            catch (error) {
                writeLog_1.apiWriteLog.error(`Update user Error, `, error);
                return null;
            }
        }
        return null;
    }
    async delete(id) {
        this.initRepository();
        try {
            const users = await this.userRepository?.delete({ id: id });
            return users;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error All user ", err);
            return null;
        }
    }
}
exports.userService = new UserService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2UvdXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDZEQUEwRDtBQUMxRCxpREFBaUQ7QUFDakQsd0NBQXFDO0FBQ3JDLGdEQUE4QztBQUU5QyxNQUFNLFdBQVc7SUFDUCxjQUFjLEdBQTRCLElBQUksQ0FBQztJQUUvQyxjQUFjO1FBQ3BCLElBQUksSUFBSSxDQUFDLGNBQWMsS0FBSyxJQUFJLEVBQUU7WUFDaEMsSUFBSSxDQUFDLGNBQWMsR0FBRyw2QkFBYSxDQUFDLGFBQWEsQ0FBQyxXQUFJLENBQUMsQ0FBQztTQUN6RDtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQW1CO1FBQzVCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLElBQUksRUFBRTtZQUNSLElBQUk7Z0JBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFbkQsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLHNCQUFXLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7YUFDeEM7U0FDRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBVTtRQUN0QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSTtZQUNGLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZFLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLHNCQUFXLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzdDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU07UUFDVixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSTtZQUNGLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUNoRCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixzQkFBVyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMxQyxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBbUI7UUFDOUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxJQUFBLG9CQUFTLEVBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEIsSUFBSTtnQkFDRixNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUNsRCxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLEVBQ2YsSUFBSSxDQUNMLENBQUM7Z0JBRUYsT0FBTyxVQUFVLENBQUM7YUFDbkI7WUFBQyxPQUFPLEtBQUssRUFBRTtnQkFDZCxzQkFBVyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDaEQsT0FBTyxJQUFJLENBQUM7YUFDYjtTQUNGO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFVO1FBQ3JCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJO1lBQ0YsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzVELE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLHNCQUFXLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0NBQ0Y7QUFFWSxRQUFBLFdBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVwb3NpdG9yeSwgVXBkYXRlUmVzdWx0IH0gZnJvbSBcInR5cGVvcm1cIjtcclxuaW1wb3J0IHsgQXBwRGF0YVNvdXJjZSB9IGZyb20gXCIuLi9kYXRhYmFzZS9BcHBEYXRhU291cmNlXCI7XHJcbmltcG9ydCB7IGFwaVdyaXRlTG9nIH0gZnJvbSBcIi4uL2xvZ2dlci93cml0ZUxvZ1wiO1xyXG5pbXBvcnQgeyBVc2VyIH0gZnJvbSBcIi4uL21vZGVsL1VzZXJcIjtcclxuaW1wb3J0IHsgZXNJc0VtcHR5IH0gZnJvbSBcIi4uL3V0aWxzL2VzSGVscGVyXCI7XHJcblxyXG5jbGFzcyBVc2VyU2VydmljZSB7XHJcbiAgcHJpdmF0ZSB1c2VyUmVwb3NpdG9yeTogUmVwb3NpdG9yeTxVc2VyPiB8IG51bGwgPSBudWxsO1xyXG5cclxuICBwcml2YXRlIGluaXRSZXBvc2l0b3J5KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMudXNlclJlcG9zaXRvcnkgPT09IG51bGwpIHtcclxuICAgICAgdGhpcy51c2VyUmVwb3NpdG9yeSA9IEFwcERhdGFTb3VyY2UuZ2V0UmVwb3NpdG9yeShVc2VyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHNhdmUodXNlcjogUGFydGlhbDxVc2VyPikge1xyXG4gICAgdGhpcy5pbml0UmVwb3NpdG9yeSgpO1xyXG4gICAgaWYgKHVzZXIpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXNwID0gYXdhaXQgdGhpcy51c2VyUmVwb3NpdG9yeT8uc2F2ZSh1c2VyKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3A7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJ1c2VyIFNhdmUgRmFpbGVkIFwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRCeUlkKGlkOiBudW1iZXIpOiBQcm9taXNlPFVzZXIgfCBudWxsIHwgdW5kZWZpbmVkPiB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy51c2VyUmVwb3NpdG9yeT8uZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBpZCB9IH0pO1xyXG4gICAgICByZXR1cm4gdXNlcjtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkVycm9yIGdldHVzZXJCeUlEIFwiLCBlcnIpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEFsbCgpOiBQcm9taXNlPFVzZXJbXSB8IG51bGwgfCB1bmRlZmluZWQ+IHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHVzZXJzID0gYXdhaXQgdGhpcy51c2VyUmVwb3NpdG9yeT8uZmluZCgpO1xyXG4gICAgICByZXR1cm4gdXNlcnM7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoYEVycm9yIEFsbCB1c2VyIGAsIGVycik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgdXBkYXRlKHVzZXI6IFBhcnRpYWw8VXNlcj4pOiBQcm9taXNlPFVwZGF0ZVJlc3VsdCB8IG51bGwgfCB1bmRlZmluZWQ+IHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIGlmICghZXNJc0VtcHR5KHVzZXIpKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgdXBkYXRldXNlciA9IGF3YWl0IHRoaXMudXNlclJlcG9zaXRvcnk/LnVwZGF0ZShcclxuICAgICAgICAgIHsgaWQ6IHVzZXIuaWQgfSxcclxuICAgICAgICAgIHVzZXJcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gdXBkYXRldXNlcjtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBhcGlXcml0ZUxvZy5lcnJvcihgVXBkYXRlIHVzZXIgRXJyb3IsIGAsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICBhc3luYyBkZWxldGUoaWQ6IG51bWJlcikge1xyXG4gICAgdGhpcy5pbml0UmVwb3NpdG9yeSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgdXNlcnMgPSBhd2FpdCB0aGlzLnVzZXJSZXBvc2l0b3J5Py5kZWxldGUoeyBpZDogaWQgfSk7XHJcbiAgICAgIHJldHVybiB1c2VycztcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkVycm9yIEFsbCB1c2VyIFwiLCBlcnIpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB1c2VyU2VydmljZSA9IG5ldyBVc2VyU2VydmljZSgpO1xyXG4iXX0=