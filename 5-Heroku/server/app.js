const express = require('express');
const todoRouter = require('./routers/todoRouter')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const connectDB = require('./database/connectionMogoose');
const checkCookie = require('./middlewares/checkCookie')
require('dotenv').config();
const app = express();
const port = process.env.PORT || process.env.MY_PORT

connectDB();
app.use(express.static('public'));

app.use(express.json())

app.use(cookieParser())
app.use(checkCookie)
app.use('/todos', todoRouter)
 
app.listen(port ,() => {
    console.log(`Listening on port ${port}...`);
})
