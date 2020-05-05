const express = require('express')
const db = require('../data/config')

const router = express.Router()

router.post('/:id/tasks', async(req, res, next) => {
    try {
        const task = await db('tasks').insert(req.body) //created task
        const [id] = await db('project_task')
                .where('project_id', req.params.id)
                .first()
        res.json(task)
    }catch(err) {
        next(err)
    }
})

module.exports = router;