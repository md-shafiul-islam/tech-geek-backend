"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const writeLog_1 = require("../logger/writeLog");
const ImageGallery_1 = require("../model/ImageGallery");
const MetaData_1 = require("../model/MetaData");
const News_1 = require("../model/News");
const esHelper_1 = require("../utils/esHelper");
class NewsService {
    newsRepository = null;
    initRepository() {
        if (this.newsRepository === null) {
            this.newsRepository = AppDataSource_1.AppDataSource.getRepository(News_1.News);
        }
    }
    async getCount() {
        this.initRepository();
        try {
            const count = await this.newsRepository?.count();
            return count;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error News Count ", err);
            return 0;
        }
    }
    async save(news) {
        let saveNews = null;
        if (news) {
            const nNews = new News_1.News();
            Object.assign(nNews, nNews);
            nNews.images = [];
            nNews.metaDatas = [];
            const queryRunner = AppDataSource_1.AppDataSource.createQueryRunner();
            await queryRunner.connect();
            queryRunner.startTransaction();
            try {
                const images = [];
                const metadatas = [];
                news.images && news.images.map((image) => {
                    if (image.id > 0) {
                        nNews.addImage(image);
                    }
                    else {
                        images.push(queryRunner.manager.create(ImageGallery_1.ImageGallery, image));
                    }
                });
                const dbImages = await queryRunner.manager.save(images);
                nNews.addAllImage(dbImages);
                news.metaDatas && news.metaDatas.map((meta) => {
                    if (meta.id > 0) {
                        nNews.addMetaData(meta);
                    }
                    else {
                        metadatas.push(queryRunner.manager.create(MetaData_1.MetaDeta, meta));
                    }
                });
                const dbMetas = await queryRunner.manager.save(metadatas);
                nNews.addAllMeta(dbMetas);
                saveNews = await queryRunner.manager.save(nNews);
                await queryRunner.commitTransaction();
            }
            catch (error) {
                writeLog_1.apiWriteLog.error(`News Save Error `, error);
                await queryRunner.rollbackTransaction();
            }
            finally {
                if (queryRunner.isReleased) {
                    await queryRunner.release();
                }
            }
        }
        return saveNews;
    }
    async getById(id) {
        this.initRepository();
        try {
            const news = await this.newsRepository?.findOne({ where: { id: id } });
            return news;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error getNewsByID ", err);
            return null;
        }
    }
    async getAll() {
        this.initRepository();
        try {
            const news = await this.newsRepository?.find();
            return news;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error(`Error All news `, err);
            return null;
        }
    }
    async update(news) {
        this.initRepository();
        if (!(0, esHelper_1.esIsEmpty)(news)) {
            try {
                const updatenews = await this.newsRepository?.update({ id: news.id }, news);
                return updatenews;
            }
            catch (error) {
                writeLog_1.apiWriteLog.error(`Update news Error, `, error);
                return null;
            }
        }
        return null;
    }
    async delete(id) {
        this.initRepository();
        try {
            const newss = await this.newsRepository?.delete({ id: id });
            return newss;
        }
        catch (err) {
            writeLog_1.apiWriteLog.error("Error All news ", err);
            return null;
        }
    }
}
exports.newsService = new NewsService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2UvbmV3cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDZEQUEwRDtBQUMxRCxpREFBaUQ7QUFDakQsd0RBQXFEO0FBQ3JELGdEQUE2QztBQUM3Qyx3Q0FBcUM7QUFDckMsZ0RBQThDO0FBRTlDLE1BQU0sV0FBVztJQUVQLGNBQWMsR0FBNEIsSUFBSSxDQUFDO0lBRS9DLGNBQWM7UUFDcEIsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksRUFBRTtZQUNoQyxJQUFJLENBQUMsY0FBYyxHQUFHLDZCQUFhLENBQUMsYUFBYSxDQUFDLFdBQUksQ0FBQyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFRO1FBQ1osSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUk7WUFDRixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxFQUFFLENBQUM7WUFDakQsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osc0JBQVcsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDNUMsT0FBTyxDQUFDLENBQUM7U0FDVjtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQW1CO1FBQzVCLElBQUksUUFBUSxHQUFnQixJQUFJLENBQUM7UUFFakMsSUFBRyxJQUFJLEVBQUM7WUFFTixNQUFNLEtBQUssR0FBUSxJQUFJLFdBQUksRUFBRSxDQUFDO1lBRTlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzVCLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBRXJCLE1BQU0sV0FBVyxH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bSBcInR5cGVvcm1cIjtcclxuaW1wb3J0IHsgQXBwRGF0YVNvdXJjZSB9IGZyb20gXCIuLi9kYXRhYmFzZS9BcHBEYXRhU291cmNlXCI7XHJcbmltcG9ydCB7IGFwaVdyaXRlTG9nIH0gZnJvbSBcIi4uL2xvZ2dlci93cml0ZUxvZ1wiO1xyXG5pbXBvcnQgeyBJbWFnZUdhbGxlcnkgfSBmcm9tIFwiLi4vbW9kZWwvSW1hZ2VHYWxsZXJ5XCI7XHJcbmltcG9ydCB7IE1ldGFEZXRhIH0gZnJvbSBcIi4uL21vZGVsL01ldGFEYXRhXCI7XHJcbmltcG9ydCB7IE5ld3MgfSBmcm9tIFwiLi4vbW9kZWwvTmV3c1wiO1xyXG5pbXBvcnQgeyBlc0lzRW1wdHkgfSBmcm9tIFwiLi4vdXRpbHMvZXNIZWxwZXJcIjtcclxuXHJcbmNsYXNzIE5ld3NTZXJ2aWNlIHtcclxuXHJcbiAgcHJpdmF0ZSBuZXdzUmVwb3NpdG9yeTogUmVwb3NpdG9yeTxOZXdzPiB8IG51bGwgPSBudWxsO1xyXG5cclxuICBwcml2YXRlIGluaXRSZXBvc2l0b3J5KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMubmV3c1JlcG9zaXRvcnkgPT09IG51bGwpIHtcclxuICAgICAgdGhpcy5uZXdzUmVwb3NpdG9yeSA9IEFwcERhdGFTb3VyY2UuZ2V0UmVwb3NpdG9yeShOZXdzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGdldENvdW50KCkge1xyXG4gICAgdGhpcy5pbml0UmVwb3NpdG9yeSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgY291bnQgPSBhd2FpdCB0aGlzLm5ld3NSZXBvc2l0b3J5Py5jb3VudCgpO1xyXG4gICAgICByZXR1cm4gY291bnQ7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJFcnJvciBOZXdzIENvdW50IFwiLCBlcnIpO1xyXG4gICAgICByZXR1cm4gMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHNhdmUobmV3czogUGFydGlhbDxOZXdzPikge1xyXG4gICAgbGV0IHNhdmVOZXdzOiBOZXdzIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgaWYobmV3cyl7XHJcblxyXG4gICAgICBjb25zdCBuTmV3czpOZXdzID0gbmV3IE5ld3MoKTtcclxuXHJcbiAgICAgIE9iamVjdC5hc3NpZ24obk5ld3MsIG5OZXdzKTtcclxuICAgICAgbk5ld3MuaW1hZ2VzID0gW107XHJcbiAgICAgIG5OZXdzLm1ldGFEYXRhcyA9IFtdO1xyXG4gICAgICBcclxuICAgICAgY29uc3QgcXVlcnlSdW5uZXIgPSAgQXBwRGF0YVNvdXJjZS5jcmVhdGVRdWVyeVJ1bm5lcigpO1xyXG4gICAgICBhd2FpdCBxdWVyeVJ1bm5lci5jb25uZWN0KCk7XHJcbiAgICAgIHF1ZXJ5UnVubmVyLnN0YXJ0VHJhbnNhY3Rpb24oKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBcclxuICAgICAgICBjb25zdCBpbWFnZXM6SW1hZ2VHYWxsZXJ5W10gPSBbXTtcclxuICAgICAgICBjb25zdCBtZXRhZGF0YXM6TWV0YURldGFbXSA9IFtdO1xyXG5cclxuICAgICAgICBuZXdzLmltYWdlcyYmbmV3cy5pbWFnZXMubWFwKChpbWFnZSk9PntcclxuICAgICAgICAgIGlmKGltYWdlLmlkID4gMCl7XHJcbiAgICAgICAgICAgIG5OZXdzLmFkZEltYWdlKGltYWdlKTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBpbWFnZXMucHVzaChxdWVyeVJ1bm5lci5tYW5hZ2VyLmNyZWF0ZShJbWFnZUdhbGxlcnksIGltYWdlKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnN0IGRiSW1hZ2VzID0gYXdhaXQgcXVlcnlSdW5uZXIubWFuYWdlci5zYXZlKGltYWdlcyk7XHJcbiAgICAgICAgbk5ld3MuYWRkQWxsSW1hZ2UoZGJJbWFnZXMpO1xyXG5cclxuICAgICAgICBuZXdzLm1ldGFEYXRhcyYmbmV3cy5tZXRhRGF0YXMubWFwKChtZXRhKT0+e1xyXG4gICAgICAgICAgaWYobWV0YS5pZCA+IDApe1xyXG4gICAgICAgICAgICBuTmV3cy5hZGRNZXRhRGF0YShtZXRhKTtcclxuICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICBtZXRhZGF0YXMucHVzaChxdWVyeVJ1bm5lci5tYW5hZ2VyLmNyZWF0ZShNZXRhRGV0YSwgbWV0YSkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNvbnN0IGRiTWV0YXMgPSBhd2FpdCBxdWVyeVJ1bm5lci5tYW5hZ2VyLnNhdmUobWV0YWRhdGFzKTtcclxuICAgICAgICBuTmV3cy5hZGRBbGxNZXRhKGRiTWV0YXMpO1xyXG4gICAgICAgXHJcbiAgICAgICAgc2F2ZU5ld3MgPSBhd2FpdCBxdWVyeVJ1bm5lci5tYW5hZ2VyLnNhdmUobk5ld3MpO1xyXG5cclxuICAgICAgICBhd2FpdCBxdWVyeVJ1bm5lci5jb21taXRUcmFuc2FjdGlvbigpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGFwaVdyaXRlTG9nLmVycm9yKGBOZXdzIFNhdmUgRXJyb3IgYCwgZXJyb3IpO1xyXG4gICAgICAgIGF3YWl0IHF1ZXJ5UnVubmVyLnJvbGxiYWNrVHJhbnNhY3Rpb24oKTtcclxuICAgICAgfWZpbmFsbHl7XHJcbiAgICAgICAgaWYocXVlcnlSdW5uZXIuaXNSZWxlYXNlZCl7XHJcbiAgICAgICAgICBhd2FpdCBxdWVyeVJ1bm5lci5yZWxlYXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHNhdmVOZXdzO1xyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0QnlJZChpZDogbnVtYmVyKTogUHJvbWlzZTxOZXdzIHwgbnVsbCB8IHVuZGVmaW5lZD4ge1xyXG4gICAgdGhpcy5pbml0UmVwb3NpdG9yeSgpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgbmV3cyA9IGF3YWl0IHRoaXMubmV3c1JlcG9zaXRvcnk/LmZpbmRPbmUoeyB3aGVyZTogeyBpZDogaWQgfSB9KTtcclxuICAgICAgcmV0dXJuIG5ld3M7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJFcnJvciBnZXROZXdzQnlJRCBcIiwgZXJyKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRBbGwoKTogUHJvbWlzZTxOZXdzW10gfCBudWxsIHwgdW5kZWZpbmVkPiB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBuZXdzID0gYXdhaXQgdGhpcy5uZXdzUmVwb3NpdG9yeT8uZmluZCgpO1xyXG4gICAgICByZXR1cm4gbmV3cztcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihgRXJyb3IgQWxsIG5ld3MgYCwgZXJyKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyB1cGRhdGUobmV3czogUGFydGlhbDxOZXdzPik6IFByb21pc2U8VXBkYXRlUmVzdWx0IHwgbnVsbCB8IHVuZGVmaW5lZD4ge1xyXG4gICAgdGhpcy5pbml0UmVwb3NpdG9yeSgpO1xyXG4gICAgaWYgKCFlc0lzRW1wdHkobmV3cykpIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBjb25zdCB1cGRhdGVuZXdzID0gYXdhaXQgdGhpcy5uZXdzUmVwb3NpdG9yeT8udXBkYXRlKFxyXG4gICAgICAgICAgeyBpZDogbmV3cy5pZCB9LFxyXG4gICAgICAgICAgbmV3c1xyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIHJldHVybiB1cGRhdGVuZXdzO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGFwaVdyaXRlTG9nLmVycm9yKGBVcGRhdGUgbmV3cyBFcnJvciwgYCwgZXJyb3IpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIGFzeW5jIGRlbGV0ZShpZDogbnVtYmVyKSB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBuZXdzcyA9IGF3YWl0IHRoaXMubmV3c1JlcG9zaXRvcnk/LmRlbGV0ZSh7IGlkOiBpZCB9KTtcclxuICAgICAgcmV0dXJuIG5ld3NzO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiRXJyb3IgQWxsIG5ld3MgXCIsIGVycik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IG5ld3NTZXJ2aWNlID0gbmV3IE5ld3NTZXJ2aWNlKCk7XHJcbiJdfQ==