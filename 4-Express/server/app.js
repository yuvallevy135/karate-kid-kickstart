const express = require('express');
const todoRouter = require('./routers/todoRouter')
const cors = require('cors')
const app = express();
const port = 5000

app.use(express.json())

app.use(cors())

app.use('/api/todo', todoRouter)
 
app.listen(port ,() => {
    console.log(`Listening on port ${port}...`);
})
