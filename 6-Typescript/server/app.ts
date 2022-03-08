import { TodoDAOMongo } from "./models/TodoDAOMongo";
import express, { Application } from "express";
import { todoRouter } from "./routers/todoRouter";
import cookieParser from "cookie-parser";
import { checkCookie } from "./middlewares/checkCookie";
require("dotenv").config();

export default function (db: TodoDAOMongo) {
    const app: Application = express();
    app.use(express.static("public"));
    app.use(express.json());
    app.use(cookieParser());
    app.use(checkCookie);
    app.use("/api/todos", todoRouter(db));

    return app;
}
