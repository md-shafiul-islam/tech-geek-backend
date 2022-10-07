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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV3cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2UvbmV3cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDZEQUEwRDtBQUMxRCxpREFBaUQ7QUFDakQsd0RBQXFEO0FBQ3JELGdEQUE2QztBQUM3Qyx3Q0FBcUM7QUFDckMsZ0RBQThDO0FBRTlDLE1BQU0sV0FBVztJQUVQLGNBQWMsR0FBNEIsSUFBSSxDQUFDO0lBRS9DLGNBQWM7UUFDcEIsSUFBSSxJQUFJLENBQUMsY0FBYyxLQUFLLElBQUksRUFBRTtZQUNoQyxJQUFJLENBQUMsY0FBYyxHQUFHLDZCQUFhLENBQUMsYUFBYSxDQUFDLFdBQUksQ0FBQyxDQUFDO1NBQ3pEO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFRO1FBQ1osSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUk7WUFDRixNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsS0FBSyxFQUFFLENBQUM7WUFDakQsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osc0JBQVcsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDNUMsT0FBTyxDQUFDLENBQUM7U0FDVjtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLElBQW1CO1FBQzVCLElBQUksUUFBUSxHQUFnQixJQUFJLENBQUM7UUFFakMsSUFBRyxJQUFJLEVBQUM7WUFFTixNQUFNLEtBQUssR0FBUSxJQUFJLFdBQUksRUFBRSxDQUFDO1lBRTlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQzVCLEtBQUssQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBRXJCLE1BQU0sV0FBVyxHQUFJLDZCQUFhLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN2RCxNQUFNLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM1QixXQUFXLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMvQixJQUFJO2dCQUVGLE1BQU0sTUFBTSxHQUFrQixFQUFFLENBQUM7Z0JBQ2pDLE1BQU0sU0FBUyxHQUFjLEVBQUUsQ0FBQztnQkFFaEMsSUFBSSxDQUFDLE1BQU0sSUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQWtCLEVBQUMsRUFBRTtvQkFDakQsSUFBRyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBQzt3QkFDZCxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUN2Qjt5QkFBSTt3QkFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLDJCQUFZLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztxQkFDOUQ7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsTUFBTSxRQUFRLEdBQUcsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDeEQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFNUIsSUFBSSxDQUFDLFNBQVMsSUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQWEsRUFBQyxFQUFFO29CQUNsRCxJQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFDO3dCQUNiLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ3pCO3lCQUFJO3dCQUNILFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsbUJBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3FCQUM1RDtnQkFDSCxDQUFDLENBQUMsQ0FBQTtnQkFFRixNQUFNLE9BQU8sR0FBRyxNQUFNLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMxRCxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUUxQixRQUFRLEdBQUcsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFakQsTUFBTSxXQUFXLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzthQUN2QztZQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNkLHNCQUFXLENBQUMsS0FBSyxDQUFDLGtCQUFrQixFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM3QyxNQUFNLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQ3pDO29CQUFPO2dCQUNOLElBQUcsV0FBVyxDQUFDLFVBQVUsRUFBQztvQkFDeEIsTUFBTSxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7aUJBQzdCO2FBQ0Y7U0FDRjtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQVU7UUFDdEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUk7WUFDRixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN2RSxPQUFPLElBQUksQ0FBQztTQUNiO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixzQkFBVyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUM3QyxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNO1FBQ1YsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUk7WUFDRixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFDL0MsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osc0JBQVcsQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDMUMsT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLElBQW1CO1FBQzlCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBQSxvQkFBUyxFQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BCLElBQUk7Z0JBQ0YsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FDbEQsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUNmLElBQUksQ0FDTCxDQUFDO2dCQUVGLE9BQU8sVUFBVSxDQUFDO2FBQ25CO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2Qsc0JBQVcsQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ2hELE9BQU8sSUFBSSxDQUFDO2FBQ2I7U0FDRjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBVTtRQUNyQixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDdEIsSUFBSTtZQUNGLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM1RCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixzQkFBVyxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMxQyxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztDQUNGO0FBRVksUUFBQSxXQUFXLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcG9zaXRvcnksIFVwZGF0ZVJlc3VsdCB9IGZyb20gXCJ0eXBlb3JtXCI7XHJcbmltcG9ydCB7IEFwcERhdGFTb3VyY2UgfSBmcm9tIFwiLi4vZGF0YWJhc2UvQXBwRGF0YVNvdXJjZVwiO1xyXG5pbXBvcnQgeyBhcGlXcml0ZUxvZyB9IGZyb20gXCIuLi9sb2dnZXIvd3JpdGVMb2dcIjtcclxuaW1wb3J0IHsgSW1hZ2VHYWxsZXJ5IH0gZnJvbSBcIi4uL21vZGVsL0ltYWdlR2FsbGVyeVwiO1xyXG5pbXBvcnQgeyBNZXRhRGV0YSB9IGZyb20gXCIuLi9tb2RlbC9NZXRhRGF0YVwiO1xyXG5pbXBvcnQgeyBOZXdzIH0gZnJvbSBcIi4uL21vZGVsL05ld3NcIjtcclxuaW1wb3J0IHsgZXNJc0VtcHR5IH0gZnJvbSBcIi4uL3V0aWxzL2VzSGVscGVyXCI7XHJcblxyXG5jbGFzcyBOZXdzU2VydmljZSB7XHJcblxyXG4gIHByaXZhdGUgbmV3c1JlcG9zaXRvcnk6IFJlcG9zaXRvcnk8TmV3cz4gfCBudWxsID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBpbml0UmVwb3NpdG9yeSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLm5ld3NSZXBvc2l0b3J5ID09PSBudWxsKSB7XHJcbiAgICAgIHRoaXMubmV3c1JlcG9zaXRvcnkgPSBBcHBEYXRhU291cmNlLmdldFJlcG9zaXRvcnkoTmV3cyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRDb3VudCgpIHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGNvdW50ID0gYXdhaXQgdGhpcy5uZXdzUmVwb3NpdG9yeT8uY291bnQoKTtcclxuICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKFwiRXJyb3IgTmV3cyBDb3VudCBcIiwgZXJyKTtcclxuICAgICAgcmV0dXJuIDA7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBzYXZlKG5ld3M6IFBhcnRpYWw8TmV3cz4pIHtcclxuICAgIGxldCBzYXZlTmV3czogTmV3cyB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgIGlmKG5ld3Mpe1xyXG5cclxuICAgICAgY29uc3Qgbk5ld3M6TmV3cyA9IG5ldyBOZXdzKCk7XHJcblxyXG4gICAgICBPYmplY3QuYXNzaWduKG5OZXdzLCBuTmV3cyk7XHJcbiAgICAgIG5OZXdzLmltYWdlcyA9IFtdO1xyXG4gICAgICBuTmV3cy5tZXRhRGF0YXMgPSBbXTtcclxuICAgICAgXHJcbiAgICAgIGNvbnN0IHF1ZXJ5UnVubmVyID0gIEFwcERhdGFTb3VyY2UuY3JlYXRlUXVlcnlSdW5uZXIoKTtcclxuICAgICAgYXdhaXQgcXVlcnlSdW5uZXIuY29ubmVjdCgpO1xyXG4gICAgICBxdWVyeVJ1bm5lci5zdGFydFRyYW5zYWN0aW9uKCk7XHJcbiAgICAgIHRyeSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY29uc3QgaW1hZ2VzOkltYWdlR2FsbGVyeVtdID0gW107XHJcbiAgICAgICAgY29uc3QgbWV0YWRhdGFzOk1ldGFEZXRhW10gPSBbXTtcclxuXHJcbiAgICAgICAgbmV3cy5pbWFnZXMmJm5ld3MuaW1hZ2VzLm1hcCgoaW1hZ2U6SW1hZ2VHYWxsZXJ5KT0+e1xyXG4gICAgICAgICAgaWYoaW1hZ2UuaWQgPiAwKXtcclxuICAgICAgICAgICAgbk5ld3MuYWRkSW1hZ2UoaW1hZ2UpO1xyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIGltYWdlcy5wdXNoKHF1ZXJ5UnVubmVyLm1hbmFnZXIuY3JlYXRlKEltYWdlR2FsbGVyeSwgaW1hZ2UpKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgZGJJbWFnZXMgPSBhd2FpdCBxdWVyeVJ1bm5lci5tYW5hZ2VyLnNhdmUoaW1hZ2VzKTtcclxuICAgICAgICBuTmV3cy5hZGRBbGxJbWFnZShkYkltYWdlcyk7XHJcblxyXG4gICAgICAgIG5ld3MubWV0YURhdGFzJiZuZXdzLm1ldGFEYXRhcy5tYXAoKG1ldGE6TWV0YURldGEpPT57XHJcbiAgICAgICAgICBpZihtZXRhLmlkID4gMCl7XHJcbiAgICAgICAgICAgIG5OZXdzLmFkZE1ldGFEYXRhKG1ldGEpO1xyXG4gICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIG1ldGFkYXRhcy5wdXNoKHF1ZXJ5UnVubmVyLm1hbmFnZXIuY3JlYXRlKE1ldGFEZXRhLCBtZXRhKSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgY29uc3QgZGJNZXRhcyA9IGF3YWl0IHF1ZXJ5UnVubmVyLm1hbmFnZXIuc2F2ZShtZXRhZGF0YXMpO1xyXG4gICAgICAgIG5OZXdzLmFkZEFsbE1ldGEoZGJNZXRhcyk7XHJcbiAgICAgICBcclxuICAgICAgICBzYXZlTmV3cyA9IGF3YWl0IHF1ZXJ5UnVubmVyLm1hbmFnZXIuc2F2ZShuTmV3cyk7XHJcblxyXG4gICAgICAgIGF3YWl0IHF1ZXJ5UnVubmVyLmNvbW1pdFRyYW5zYWN0aW9uKCk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoYE5ld3MgU2F2ZSBFcnJvciBgLCBlcnJvcik7XHJcbiAgICAgICAgYXdhaXQgcXVlcnlSdW5uZXIucm9sbGJhY2tUcmFuc2FjdGlvbigpO1xyXG4gICAgICB9ZmluYWxseXtcclxuICAgICAgICBpZihxdWVyeVJ1bm5lci5pc1JlbGVhc2VkKXtcclxuICAgICAgICAgIGF3YWl0IHF1ZXJ5UnVubmVyLnJlbGVhc2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc2F2ZU5ld3M7XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRCeUlkKGlkOiBudW1iZXIpOiBQcm9taXNlPE5ld3MgfCBudWxsIHwgdW5kZWZpbmVkPiB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBuZXdzID0gYXdhaXQgdGhpcy5uZXdzUmVwb3NpdG9yeT8uZmluZE9uZSh7IHdoZXJlOiB7IGlkOiBpZCB9IH0pO1xyXG4gICAgICByZXR1cm4gbmV3cztcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkVycm9yIGdldE5ld3NCeUlEIFwiLCBlcnIpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIGdldEFsbCgpOiBQcm9taXNlPE5ld3NbXSB8IG51bGwgfCB1bmRlZmluZWQ+IHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IG5ld3MgPSBhd2FpdCB0aGlzLm5ld3NSZXBvc2l0b3J5Py5maW5kKCk7XHJcbiAgICAgIHJldHVybiBuZXdzO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGFwaVdyaXRlTG9nLmVycm9yKGBFcnJvciBBbGwgbmV3cyBgLCBlcnIpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGFzeW5jIHVwZGF0ZShuZXdzOiBQYXJ0aWFsPE5ld3M+KTogUHJvbWlzZTxVcGRhdGVSZXN1bHQgfCBudWxsIHwgdW5kZWZpbmVkPiB7XHJcbiAgICB0aGlzLmluaXRSZXBvc2l0b3J5KCk7XHJcbiAgICBpZiAoIWVzSXNFbXB0eShuZXdzKSkge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHVwZGF0ZW5ld3MgPSBhd2FpdCB0aGlzLm5ld3NSZXBvc2l0b3J5Py51cGRhdGUoXHJcbiAgICAgICAgICB7IGlkOiBuZXdzLmlkIH0sXHJcbiAgICAgICAgICBuZXdzXHJcbiAgICAgICAgKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHVwZGF0ZW5ld3M7XHJcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoYFVwZGF0ZSBuZXdzIEVycm9yLCBgLCBlcnJvcik7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbiAgYXN5bmMgZGVsZXRlKGlkOiBudW1iZXIpIHtcclxuICAgIHRoaXMuaW5pdFJlcG9zaXRvcnkoKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IG5ld3NzID0gYXdhaXQgdGhpcy5uZXdzUmVwb3NpdG9yeT8uZGVsZXRlKHsgaWQ6IGlkIH0pO1xyXG4gICAgICByZXR1cm4gbmV3c3M7XHJcbiAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJFcnJvciBBbGwgbmV3cyBcIiwgZXJyKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgbmV3c1NlcnZpY2UgPSBuZXcgTmV3c1NlcnZpY2UoKTtcclxuIl19