"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const writeLog_1 = require("../logger/writeLog");
const ImageGallery_1 = require("../model/ImageGallery");
const MetaData_1 = require("../model/MetaData");
const Post_1 = require("../model/Post");
const esHelper_1 = require("../utils/esHelper");
class PostService {
    postRepository = null;
    initRepository() {
        if (this.postRepository === null) {
            this.postRepository = AppDataSource_1.AppDataSource.getRepository(Post_1.Post);
        }
    }
    async getCount() {
        this.initRepository();
        try {
            const count = await this.postRepository?.count();
            return count;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error Post Count ", err);
            return 0;
        }
    }
    async save(post) {
        let resp = null;
        if (post) {
            const queryRunner = AppDataSource_1.AppDataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                const metaDetas = [];
                const images = [];
                const nPost = new Post_1.Post();
                Object.assign(nPost, post);
                nPost.images = [];
                nPost.metaDatas = [];
                post.metaDatas &&
                    post.metaDatas.forEach(async (metaData, idx) => {
                        if (metaData.id > 0) {
                            nPost.addMeta(metaData);
                        }
                        else {
                            metaDetas.push(queryRunner.manager.create(MetaData_1.MetaDeta, metaData));
                        }
                    });
                const dbMetas = await queryRunner.manager.save(metaDetas);
                nPost.addAllMetaData(dbMetas);
                post.images &&
                    post.images.forEach(async (image, idx) => {
                        if (image.id > 0) {
                            nPost.addImage(image);
                        }
                        else {
                            images.push(queryRunner.manager.create(ImageGallery_1.ImageGallery, image));
                        }
                    });
                const dbImages = await queryRunner.manager.save(ImageGallery_1.ImageGallery, images);
                nPost.addAllImage(dbImages);
                writeLog_1.apiWriteLog.info(`Post image Size ${nPost.images.length}`);
                writeLog_1.apiWriteLog.info(`Post metaDatas Size ${nPost.metaDatas.length}`);
                const initPost = queryRunner.manager.create(Post_1.Post, nPost);
                resp = await queryRunner.manager.save(initPost);
                await queryRunner.commitTransaction();
            }
            catch (error) {
                queryRunner.rollbackTransaction();
            }
            finally {
                if (queryRunner.isReleased) {
                    await queryRunner.release();
                }
            }
        }
        return resp;
    }
    async getById(id) {
        this.initRepository();
        try {
            const post = await this.postRepository?.findOne({ where: { id: id } });
            return post;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error getpostByID ", err);
            return null;
        }
    }
    async getAll() {
        this.initRepository();
        try {
            const post = await this.postRepository?.find();
            return post;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error(`Error All post `, err);
            return null;
        }
    }
    async update(post) {
        this.initRepository();
        if (!(0, esHelper_1.esIsEmpty)(post)) {
            try {
                const updatepost = await this.postRepository?.update({ id: post.id }, post);
                return updatepost;
            }
            catch (error) {
                writeLog_1.apiWriteLog.error(`Update post Error, `, error);
                return null;
            }
        }
        return null;
    }
    async delete(id) {
        this.initRepository();
        try {
            const posts = await this.postRepository?.delete({ id: id });
            return posts;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error All post ", err);
            return null;
        }
    }
}
exports.postService = new PostService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2UvcG9zdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDZEQUEwRDtBQUMxRCxpREFBaUQ7QUFDakQsd0RBQXFEO0FBQ3JELGdEQUE2QztBQUM3Qyx3Q0FBcUM7QUFDckMsZ0RBQThDO0FBRTlDLE1BQU0sV0FBVztJQUNQLGNBQWMsR0FBNEIsSUFBSSxDQUFDO0lBRS9DLGNBQWM7UUFDcEIsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksRUFBRTtZQUNoQyxJQUFJLENBQUMsY0FBYyxHQUFHLDZCQUFhLENBQUMsYUFBYSxDQUFDLFdBQUksQ0FBQyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFRO1FBQ1osSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUk7WUFDRixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxFQUFFLENBQUM7WUFDakQsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osc0JBQVcsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDNUMsT0FBTyxDQUFDLENBQUM7U0FDVjtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQVU7UUFDbkIsSUFBSSxJQUFJLEdBQWdCLElBQUksQ0FBQztRQUM3QixJQUFJLElBQUksRUFBRTtZQUNSLE1BQU0sV0FBVyxHQUFHLDZCQUFhLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN0RCxNQUFNLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUU1QixNQUFNLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3JDLElBQUk7Z0JBQ0YsTUFBTSxTQUFTLEdBQWUsRUFBRSxDQUFDO2dCQUNqQyxNQUFNLE1BQU0s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O1NBQ2Q7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLHNCQUFXLENBQUMsS0FBSyxDQUFDLGlCQUFpQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzFDLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0NBQ0Y7QUFFWSxRQUFBLFdBQVcsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVwb3NpdG9yeSwgVXBkYXRlUmVzdWx0IH0gZnJvbSBcInR5cGVvcm1cIjtcclxuaW1wb3J0IHsgQXBwRGF0YVNvdXJjZSB9IGZyb20gXCIuLi9kYXRhYmFzZS9BcHBEYXRhU291cmNlXCI7XHJcbmltcG9ydCB7IGFwaVdyaXRlTG9nIH0gZnJvbSBcIi4uL2xvZ2dlci93cml0ZUxvZ1wiO1xyXG5pbXBvcnQgeyBJbWFnZUdhbGxlcnkgfSBmcm9tIFwiLi4vbW9kZWwvSW1hZ2VHYWxsZXJ5XCI7XHJcbmltcG9ydCB7IE1ldGFEZXRhIH0gZnJvbSBcIi4uL21vZGVsL01ldGFEYXRhXCI7XHJcbmltcG9ydCB7IFBvc3QgfSBmcm9tIFwiLi4vbW9kZWwvUG9zdFwiO1xyXG5pbXBvcnQgeyBlc0lzRW1wdHkgfSBmcm9tIFwiLi4vdXRpbHMvZXNIZWxwZXJcIjtcclxuXHJcbmNsYXNzIFBvc3RTZXJ2aWNlIHtcclxuICBwcml2YXRlIHBvc3RSZXBvc2l0b3J5OiBSZXBvc2l0b3J5PFBvc3Q+IHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgaW5pdFJlcG9zaXRvcnkoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5wb3N0UmVwb3NpdG9yeSA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLnBvc3RSZXBvc2l0b3J5ID0gQXBwRGF0YVNvdXJjZS5nZXRSZXBvc2l0b3J5KFBvc3QpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0Q291bnQoKSB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBjb3VudCA9IGF3YWl0IHRoaXMucG9zdFJlcG9zaXRvcnk/LmNvdW50KCk7XHJcbiAgICAgIHJldHVybiBjb3VudDtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkVycm9yIFBvc3QgQ291bnQgXCIsIGVycik7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2F2ZShwb3N0OiBQb3N0KSB7XHJcbiAgICBsZXQgcmVzcDogUG9zdCB8IG51bGwgPSBudWxsO1xyXG4gICAgaWYgKHBvc3QpIHtcclxuICAgICAgY29uc3QgcXVlcnlSdW5uZXIgPSBBcHBEYXRhU291cmNlLmNyZWF0ZVF1ZXJ5UnVubmVyKCk7XHJcbiAgICAgIGF3YWl0IHF1ZXJ5UnVubmVyLmNvbm5lY3QoKTtcclxuXHJcbiAgICAgIGF3YWl0IHF1ZXJ5UnVubmVyLnN0YXJ0VHJhbnNhY3Rpb24oKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBtZXRhRGV0YXM6IE1ldGFEZXRhW10gPSBbXTtcclxuICAgICAgICBjb25zdCBpbWFnZXM6IEltYWdlR2FsbGVyeVtdID0gW107XHJcblxyXG4gICAgICAgIGNvbnN0IG5Qb3N0OiBQb3N0ID0gbmV3IFBvc3QoKTtcclxuICAgICAgICBPYmplY3QuYXNzaWduKG5Qb3N0LCBwb3N0KTtcclxuICAgICAgICBuUG9zdC5pbWFnZXMgPSBbXTtcclxuICAgICAgICBuUG9zdC5tZXRhRGF0YXMgPSBbXTtcclxuXHJcbiAgICAgICAgcG9zdC5tZXRhRGF0YXMgJiZcclxuICAgICAgICAgIHBvc3QubWV0YURhdGFzLmZvckVhY2goYXN5bmMgKG1ldGFEYXRhLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1ldGFEYXRhLmlkID4gMCkge1xyXG4gICAgICAgICAgICAgIG5Qb3N0LmFkZE1ldGEobWV0YURhdGEpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIG1ldGFEZXRhcy5wdXNoKHF1ZXJ5UnVubmVyLm1hbmFnZXIuY3JlYXRlKE1ldGFEZXRhLCBtZXRhRGF0YSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZGJNZXRhcyA9IGF3YWl0IHF1ZXJ5UnVubmVyLm1hbmFnZXIuc2F2ZShtZXRhRGV0YXMpO1xyXG4gICAgICAgIG5Qb3N0LmFkZEFsbE1ldGFEYXRhKGRiTWV0YXMpO1xyXG5cclxuICAgICAgICBwb3N0LmltYWdlcyAmJlxyXG4gICAgICAgICAgcG9zdC5pbWFnZXMuZm9yRWFjaChhc3luYyAoaW1hZ2UsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaW1hZ2UuaWQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgblBvc3QuYWRkSW1hZ2UoaW1hZ2UpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIGltYWdlcy5wdXNoKHF1ZXJ5UnVubmVyLm1hbmFnZXIuY3JlYXRlKEltYWdlR2FsbGVyeSwgaW1hZ2UpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgZGJJbWFnZXMgPSBhd2FpdCBxdWVyeVJ1bm5lci5tYW5hZ2VyLnNhdmUoSW1hZ2VHYWxsZXJ5LCBpbWFnZXMpO1xyXG4gICAgICAgIG5Qb3N0LmFkZEFsbEltYWdlKGRiSW1hZ2VzKTtcclxuXHJcbiAgICAgICAgYXBpV3JpdGVMb2cuaW5mbyhgUG9zdCBpbWFnZSBTaXplICR7blBvc3QuaW1hZ2VzLmxlbmd0aH1gKTtcclxuICAgICAgICBhcGlXcml0ZUxvZy5pbmZvKGBQb3N0IG1ldGFEYXRhcyBTaXplICR7blBvc3QubWV0YURhdGFzLmxlbmd0aH1gKTtcclxuXHJcbiAgICAgICAgY29uc3QgaW5pdFBvc3QgPSBxdWVyeVJ1bm5lci5tYW5hZ2VyLmNyZWF0ZShQb3N0LCBuUG9zdCk7XHJcbiAgICAgICAgcmVzcCA9IGF3YWl0IHF1ZXJ5UnVubmVyLm1hbmFnZXIuc2F2ZShpbml0UG9zdCk7XHJcblxyXG4gICAgICAgIGF3YWl0IHF1ZXJ5UnVubmVyLmNvbW1pdFRyYW5zYWN0aW9uKCk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgcXVlcnlSdW5uZXIucm9sbGJhY2tUcmFuc2FjdGlvbigpO1xyXG4gICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIGlmIChxdWVyeVJ1bm5lci5pc1JlbGVhc2VkKSB7XHJcbiAgICAgICAgICBhd2FpdCBxdWVyeVJ1bm5lci5yZWxlYXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcDtcclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEJ5SWQoaWQ6IG51bWJlcik6IFByb21pc2U8UG9zdCB8IG51bGwgfCB1bmRlZmluZWQ+IHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHBvc3QgPSBhd2FpdCB0aGlzLnBvc3RSZXBvc2l0b3J5Py5maW5kT25lKHsgd2hlcmU6IHsgaWQ6IGlkIH0gfSk7XHJcbiAgICAgIHJldHVybiBwb3N0O1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiRXJyb3IgZ2V0cG9zdEJ5SUQgXCIsIGVycik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QWxsKCk6IFByb21pc2U8UG9zdFtdIHwgbnVsbCB8IHVuZGVmaW5lZD4ge1xyXG4gICAgdGhpcy5pbml0UmVwb3NpdG9yeSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcG9zdCA9IGF3YWl0IHRoaXMucG9zdFJlcG9zaXRvcnk/LmZpbmQoKTtcclxuICAgICAgcmV0dXJuIHBvc3Q7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoYEVycm9yIEFsbCBwb3N0IGAsIGVycik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgdXBkYXRlKHBvc3Q6IFBhcnRpYWw8UG9zdD4pOiBQcm9taXNlPFVwZGF0ZVJlc3VsdCB8IG51bGwgfCB1bmRlZmluZWQ+IHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIGlmICghZXNJc0VtcHR5KHBvc3QpKSB7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgdXBkYXRlcG9zdCA9IGF3YWl0IHRoaXMucG9zdFJlcG9zaXRvcnk/LnVwZGF0ZShcclxuICAgICAgICAgIHsgaWQ6IHBvc3QuaWQgfSxcclxuICAgICAgICAgIHBvc3RcclxuICAgICAgICApO1xyXG5cclxuICAgICAgICByZXR1cm4gdXBkYXRlcG9zdDtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBhcGlXcml0ZUxvZy5lcnJvcihgVXBkYXRlIHBvc3QgRXJyb3IsIGAsIGVycm9yKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuICBhc3luYyBkZWxldGUoaWQ6IG51bWJlcikge1xyXG4gICAgdGhpcy5pbml0UmVwb3NpdG9yeSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcG9zdHMgPSBhd2FpdCB0aGlzLnBvc3RSZXBvc2l0b3J5Py5kZWxldGUoeyBpZDogaWQgfSk7XHJcbiAgICAgIHJldHVybiBwb3N0cztcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkVycm9yIEFsbCBwb3N0IFwiLCBlcnIpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBwb3N0U2VydmljZSA9IG5ldyBQb3N0U2VydmljZSgpO1xyXG4iXX0=