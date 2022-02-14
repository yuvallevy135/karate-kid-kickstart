const express = require('express');
const router = express.Router();



router.get('/:id',(req, res) => {
    const id = req.params.id
    console.log({"id": id});
    res.send({"id": id});
})

// get all todos.
router.get('/allTodos')

router.post('/', (req, res) => {
    res.send(req.body);
})

router.delete('/:id')

router.put('/id')

module.exports = router