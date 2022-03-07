
export interface IDataBaseConnection {
    connectDB: () => Promise<void>
    disconnectDB: () => Promise<void>
}