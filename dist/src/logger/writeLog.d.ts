declare class WriteLog {
    private logFileStatus;
    info(msg: string, obj?: any): void;
    warn(msg: string, obj?: any): void;
    error(msg: string, obj?: any): void;
    private logWriteToFile;
}
export declare const apiWriteLog: WriteLog;
export {};
