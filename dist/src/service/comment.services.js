"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentService = void 0;
const AppDataSource_1 = require("../database/AppDataSource");
const writeLog_1 = require("../logger/writeLog");
const Comment_1 = require("../model/Comment");
class CommentService {
    commentRepository;
    commentRepositoryTree;
    initRepository() {
        if (this.commentRepository === null) {
            this.commentRepository = AppDataSource_1.AppDataSource.getRepository(Comment_1.Comment);
        }
        if (this.commentRepositoryTree === null) {
            this.commentRepositoryTree = AppDataSource_1.AppDataSource.getTreeRepository(Comment_1.Comment);
        }
    }
    async getById(id) {
        try {
            const comment = this.commentRepository.findOne({ where: { id: id } });
            return comment;
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Comment not found ", error);
            return null;
        }
    }
    async save(comment) {
        try {
            let initComment = this.commentRepository.create(comment);
            const saveComment = this.commentRepository.save(initComment);
            return saveComment;
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Comment not found ", error);
            return null;
        }
    }
    async getCommentByProductAsTree(id) {
        try {
            const comments = await this.commentRepositoryTree.find({
                where: { product: { id } },
            });
            return comments;
        }
        catch (error) {
            writeLog_1.apiWriteLog.error("Product Comment not found ", error);
            return null;
        }
    }
}
exports.commentService = new CommentService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWVudC5zZXJ2aWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlL2NvbW1lbnQuc2VydmljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsNkRBQTBEO0FBQzFELGlEQUFpRDtBQUNqRCw4Q0FBMkM7QUFFM0MsTUFBTSxjQUFjO0lBQ1YsaUJBQWlCLENBQXNCO0lBQ3ZDLHFCQUFxQixDQUEwQjtJQUV2RCxjQUFjO1FBQ1osSUFBSSxJQUFJLENBQUMsaUJBQWlCLEtBQUssSUFBSSxFQUFFO1lBQ25DLElBQUksQ0FBQyxpQkFBaUIsR0FBRyw2QkFBYSxDQUFDLGFBQWEsQ0FBQyxpQkFBTyxDQUFDLENBQUM7U0FDL0Q7UUFFRCxJQUFJLElBQUksQ0FBQyxxQkFBcUIsS0FBSyxJQUFJLEVBQUU7WUFDdkMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLDZCQUFhLENBQUMsaUJBQWlCLENBQUMsaUJBQU8sQ0FBQyxDQUFDO1NBQ3ZFO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBVTtRQUN0QixJQUFJO1lBQ0YsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdEUsT0FBTyxPQUFPLENBQUM7U0FDaEI7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLHNCQUFXLENBQUMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQy9DLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFnQjtRQUN6QixJQUFJO1lBQ0YsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUN6RCxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzdELE9BQU8sV0FBVyxDQUFDO1NBQ3BCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxzQkFBVyxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMvQyxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxFQUFVO1FBQ3hDLElBQUk7WUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUM7Z0JBQ3JELEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO2FBQzNCLENBQUMsQ0FBQztZQUNILE9BQU8sUUFBUSxDQUFDO1NBQ2pCO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxzQkFBVyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2RCxPQUFPLElBQUksQ0FBQztTQUNiO0lBQ0gsQ0FBQztDQUNGO0FBRVksUUFBQSxjQUFjLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcG9zaXRvcnksIFRyZWVSZXBvc2l0b3J5IH0gZnJvbSBcInR5cGVvcm1cIjtcclxuaW1wb3J0IHsgQXBwRGF0YVNvdXJjZSB9IGZyb20gXCIuLi9kYXRhYmFzZS9BcHBEYXRhU291cmNlXCI7XHJcbmltcG9ydCB7IGFwaVdyaXRlTG9nIH0gZnJvbSBcIi4uL2xvZ2dlci93cml0ZUxvZ1wiO1xyXG5pbXBvcnQgeyBDb21tZW50IH0gZnJvbSBcIi4uL21vZGVsL0NvbW1lbnRcIjtcclxuXHJcbmNsYXNzIENvbW1lbnRTZXJ2aWNlIHtcclxuICBwcml2YXRlIGNvbW1lbnRSZXBvc2l0b3J5OiBSZXBvc2l0b3J5PENvbW1lbnQ+O1xyXG4gIHByaXZhdGUgY29tbWVudFJlcG9zaXRvcnlUcmVlOiBUcmVlUmVwb3NpdG9yeTxDb21tZW50PjtcclxuXHJcbiAgaW5pdFJlcG9zaXRvcnkoKSB7XHJcbiAgICBpZiAodGhpcy5jb21tZW50UmVwb3NpdG9yeSA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmNvbW1lbnRSZXBvc2l0b3J5ID0gQXBwRGF0YVNvdXJjZS5nZXRSZXBvc2l0b3J5KENvbW1lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmNvbW1lbnRSZXBvc2l0b3J5VHJlZSA9PT0gbnVsbCkge1xyXG4gICAgICB0aGlzLmNvbW1lbnRSZXBvc2l0b3J5VHJlZSA9IEFwcERhdGFTb3VyY2UuZ2V0VHJlZVJlcG9zaXRvcnkoQ29tbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBhc3luYyBnZXRCeUlkKGlkOiBudW1iZXIpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IGNvbW1lbnQgPSB0aGlzLmNvbW1lbnRSZXBvc2l0b3J5LmZpbmRPbmUoeyB3aGVyZTogeyBpZDogaWQgfSB9KTtcclxuICAgICAgcmV0dXJuIGNvbW1lbnQ7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkNvbW1lbnQgbm90IGZvdW5kIFwiLCBlcnJvcik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgc2F2ZShjb21tZW50OiBDb21tZW50KSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgaW5pdENvbW1lbnQgPSB0aGlzLmNvbW1lbnRSZXBvc2l0b3J5LmNyZWF0ZShjb21tZW50KTtcclxuICAgICAgY29uc3Qgc2F2ZUNvbW1lbnQgPSB0aGlzLmNvbW1lbnRSZXBvc2l0b3J5LnNhdmUoaW5pdENvbW1lbnQpO1xyXG4gICAgICByZXR1cm4gc2F2ZUNvbW1lbnQ7XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBhcGlXcml0ZUxvZy5lcnJvcihcIkNvbW1lbnQgbm90IGZvdW5kIFwiLCBlcnJvcik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXN5bmMgZ2V0Q29tbWVudEJ5UHJvZHVjdEFzVHJlZShpZDogbnVtYmVyKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBjb21tZW50cyA9IGF3YWl0IHRoaXMuY29tbWVudFJlcG9zaXRvcnlUcmVlLmZpbmQoe1xyXG4gICAgICAgIHdoZXJlOiB7IHByb2R1Y3Q6IHsgaWQgfSB9LFxyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuIGNvbW1lbnRzO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgYXBpV3JpdGVMb2cuZXJyb3IoXCJQcm9kdWN0IENvbW1lbnQgbm90IGZvdW5kIFwiLCBlcnJvcik7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNvbW1lbnRTZXJ2aWNlID0gbmV3IENvbW1lbnRTZXJ2aWNlKCk7XHJcbiJdfQ==