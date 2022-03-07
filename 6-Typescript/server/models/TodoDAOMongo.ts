import {Schema, model, Model, connect, connection} from 'mongoose'
// import {ITodo} from '../interfaces/ITodo'
// import {ITodoService} from '../interfaces/ITodoService'
import {IDataBaseConnection} from '../interfaces/IDataBaseConnection'
import dotenv from 'dotenv'
import { TodoDAODataAPI } from './TodoDAODataAPI'
dotenv.config()

export class TodoDAOMongo extends TodoDAODataAPI implements IDataBaseConnection {
    constructor() {
        super()
    }
    
    connectDB = async (): Promise<void> => {
        try {
            await connect(process.env.MONGO_URL || '')
            console.log('Connected to MongoDB');
            return
        } catch (err: any) {
            throw new Error(err)
        }
    }

    disconnectDB = async (): Promise<void> => {
        await connection.close();
    }
}