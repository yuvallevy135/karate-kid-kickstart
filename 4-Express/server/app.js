const express = require('express');
const app = express();
const port = 5000
const todoRouter = require('./routers/todoRouter')
app.use(express.json())


app.use('/api/todo', todoRouter)
 

app.listen(port ,() => {
    console.log(`Listening on port ${port}...`);
})
