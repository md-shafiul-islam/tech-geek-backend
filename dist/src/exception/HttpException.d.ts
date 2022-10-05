export declare class HttpException extends Error {
    status: number;
    message: string;
    constructor(staus: number, message: string);
}
