import {TodoDAOMongo}  from './models/TodoDAOMongo';
import { Application } from 'express';
import makeApp from './app';
const todoDAOMongo = new TodoDAOMongo()
const app: Application = makeApp(todoDAOMongo)
const port: string | undefined = process.env.PORT || process.env.MY_PORT
app.listen(port ,() => {
    console.log(`Listening on port ${port}...`);
    todoDAOMongo.connectDB();
})