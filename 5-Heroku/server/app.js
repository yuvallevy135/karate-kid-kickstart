const express = require('express');
const todoRouter = require('./routers/todoRouter')
const cors = require('cors')
const connectDB = require('./database/connectionMogoose');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT

connectDB();
const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
})

db.on('error', (err) => {
    console.log(err);
})

app.use(express.json())

app.use(cors())

app.use('/api/todo', todoRouter)
 
app.listen(port ,() => {
    console.log(`Listening on port ${port}...`);
})
