import { connect, connection } from "mongoose";
import { IDataBaseConnection } from "../interfaces/interfaces";
import { TodoDAODataAPI } from "./TodoDAODataAPI";

export class TodoDAOMongo
    extends TodoDAODataAPI
    implements IDataBaseConnection
{
    connect = async (): Promise<void> => {
        await connect(process.env.MONGO_URL || "");
        console.log("Connected to MongoDB");
        return;
    };

    disconnect = (): void => {
        connection.close();
    };
}
