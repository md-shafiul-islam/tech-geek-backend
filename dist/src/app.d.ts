import "dotenv/config";
import "reflect-metadata";
import express, { Application } from "express";
import { DataSource } from "typeorm";
declare class App {
    port: number;
    host: string;
    env: string;
    dataSource: DataSource;
    app: Application;
    constructor();
    initializeErrorHandling(): void;
    initializeRoutes(): void;
    initializeMiddlewares(): void;
    getServer(): express.Application;
    private connectToDatabase;
    listen(): void;
}
export default App;
