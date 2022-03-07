import { IDataBaseConnection } from './../../interfaces/IDataBaseConnection';
import mongoose from 'mongoose';
import {MongoMemoryServer} from 'mongodb-memory-server';
import { TodoDAODataAPI } from '../../models/TodoDAODataAPI';
export class TodoDAOMongoDriverTest extends TodoDAODataAPI implements IDataBaseConnection {
    mongoServer: any
    constructor() {
        super()
    }
    connectDB = async ():  Promise<void> => {
        this.mongoServer = await MongoMemoryServer.create();
        const uri = this.mongoServer.getUri();  
        await mongoose.connect(uri);
    }

    disconnectDB = async (): Promise<void> => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await this.mongoServer.stop();
    }
}
