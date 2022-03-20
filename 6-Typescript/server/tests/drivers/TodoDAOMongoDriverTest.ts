import { IDataBaseConnection } from "./../../interfaces/interfaces";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { TodoDAODataAPI } from "../../models/TodoDAODataAPI";
export class TodoDAOMongoDriverTest
    extends TodoDAODataAPI
    implements IDataBaseConnection
{
    mongoServer: MongoMemoryServer = new MongoMemoryServer();
    connect = async (): Promise<void> => {
        this.mongoServer = await MongoMemoryServer.create();
        const uri = this.mongoServer.getUri();
        await mongoose.connect(uri);
    };

    disconnect = async (): Promise<void> => {
        await mongoose.connection.dropDatabase();
        mongoose.connection.close();
        this.mongoServer.stop();
    };
}
