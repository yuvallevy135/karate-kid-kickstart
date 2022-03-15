import { AppDriver } from "../drivers/AppDriver";
import { TodoDAOMongoDriverTest } from "../drivers/TodoDAOMongoDriverTest";
import { Application } from "express";
import makeApp from "../../app";
import { Server } from "http";
import { generatePort } from "./mockData";
export class TestKit {
    appDriver: AppDriver;
    mongoDriver: TodoDAOMongoDriverTest;
    server: Server = new Server();
    constructor() {
        this.appDriver = new AppDriver("http://localhost:5000/api/todos/");
        this.mongoDriver = new TodoDAOMongoDriverTest();
    }
    beforeEach = async () => {
        const port: number | undefined = generatePort();
        this.appDriver = new AppDriver(
            `${process.env.HOST}:${port}/api/todos/`
        );
        this.mongoDriver = new TodoDAOMongoDriverTest();
        const app: Application = makeApp(this.mongoDriver);
        this.server = await app.listen(port);
        await this.mongoDriver.connect();
    };

    afterEach = async () => {
        await this.mongoDriver.disconnect();
        await this.server.close();
    };

    beforeAndAfter = () => {
        beforeEach(() => this.beforeEach());
        afterEach(() => this.afterEach());
    };
}
