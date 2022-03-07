import { AppDriver } from '../drivers/AppDriver';
import axios from 'axios'
import {TodoDAOMongoDriverTest} from '../drivers/TodoDAOMongoDriverTest'
import { Application } from 'express';
import makeApp from '../../app';
import dotenv from 'dotenv'
export class TestKit {
    appDriver: AppDriver
    mongoDriver: TodoDAOMongoDriverTest
    server: any
    constructor() {
        this.appDriver = new AppDriver(axios, 'http://localhost:5000/api/todos/')
        this.mongoDriver = new TodoDAOMongoDriverTest()
    }
    beforeEach = async () => {
        const port: number | undefined = Math.ceil((Math.random() * 10000 + 1000))        
        this.appDriver = new AppDriver(axios, `http://localhost:${port}/api/todos/`)
        this.mongoDriver = new TodoDAOMongoDriverTest()
        dotenv.config();
        const app: Application = makeApp(this.mongoDriver)
        this.server = await app.listen(port)
        await this.mongoDriver.connectDB();
    };
    
    afterEach = async () => {
        await this.mongoDriver.disconnectDB()
        await this.server.close()
    };

    beforeAndAfter = () => {
        beforeEach(() => this.beforeEach())
        afterEach(() => this.afterEach())
    }
}