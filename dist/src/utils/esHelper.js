"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.esGetNumber = exports.esIsEmpty = void 0;
const isNumber = require("is-number");
/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
const esIsEmpty = (value) => {
    if (value === null) {
        return true;
    }
    else if (typeof value !== "number" && value === "") {
        return true;
    }
    else if (typeof value === "undefined" || value === undefined) {
        return true;
    }
    else if (value !== null &&
        typeof value === "object" &&
        !Object.keys(value).length) {
        return true;
    }
    else {
        return false;
    }
};
exports.esIsEmpty = esIsEmpty;
const esGetNumber = (value) => {
    let num = 0;
    if (!(0, exports.esIsEmpty)(value)) {
        num = Number(value);
        num = isNumber(num) ? num : 0;
    }
    return num;
};
exports.esGetNumber = esGetNumber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXNIZWxwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvZXNIZWxwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBRXRDOzs7OztHQUtHO0FBQ0ksTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUErQixFQUFXLEVBQUU7SUFDcEUsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFO1FBQ2xCLE9BQU8sSUFBSSxDQUFDO0tBQ2I7U0FBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxLQUFLLEtBQUssRUFBRSxFQUFFO1FBQ3BELE9BQU8sSUFBSSxDQUFDO0tBQ2I7U0FBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFdBQVcsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1FBQzlELE9BQU8sSUFBSSxDQUFDO0tBQ2I7U0FBTSxJQUNMLEtBQUssS0FBSyxJQUFJO1FBQ2QsT0FBTyxLQUFLLEtBQUssUUFBUTtRQUN6QixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxFQUMxQjtRQUNBLE9BQU8sSUFBSSxDQUFDO0tBQ2I7U0FBTTtRQUNMLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7QUFDSCxDQUFDLENBQUM7QUFoQlcsUUFBQSxTQUFTLGFBZ0JwQjtBQUVLLE1BQU0sV0FBVyxHQUFHLENBQUMsS0FBcUMsRUFBVSxFQUFFO0lBQzNFLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNaLElBQUksQ0FBQyxJQUFBLGlCQUFTLEVBQUMsS0FBSyxDQUFDLEVBQUU7UUFDckIsR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQixHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMvQjtJQUVELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyxDQUFDO0FBUlcsUUFBQSxXQUFXLGVBUXRCIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgaXNOdW1iZXIgPSByZXF1aXJlKFwiaXMtbnVtYmVyXCIpO1xyXG5cclxuLyoqXHJcbiAqIEBtZXRob2QgaXNFbXB0eVxyXG4gKiBAcGFyYW0ge1N0cmluZyB8IE51bWJlciB8IE9iamVjdH0gdmFsdWVcclxuICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgJiBmYWxzZVxyXG4gKiBAZGVzY3JpcHRpb24gdGhpcyB2YWx1ZSBpcyBFbXB0eSBDaGVja1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGVzSXNFbXB0eSA9ICh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgb2JqZWN0KTogYm9vbGVhbiA9PiB7XHJcbiAgaWYgKHZhbHVlID09PSBudWxsKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJudW1iZXJcIiAmJiB2YWx1ZSA9PT0gXCJcIikge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIgfHwgdmFsdWUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmIChcclxuICAgIHZhbHVlICE9PSBudWxsICYmXHJcbiAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcclxuICAgICFPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBlc0dldE51bWJlciA9ICh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgb2JqZWN0IHwgYW55KTogbnVtYmVyID0+IHtcclxuICBsZXQgbnVtID0gMDtcclxuICBpZiAoIWVzSXNFbXB0eSh2YWx1ZSkpIHtcclxuICAgIG51bSA9IE51bWJlcih2YWx1ZSk7XHJcbiAgICBudW0gPSBpc051bWJlcihudW0pID8gbnVtIDogMDtcclxuICB9XHJcblxyXG4gIHJldHVybiBudW07XHJcbn07XHJcbiJdfQ==