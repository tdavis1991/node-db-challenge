const express = require('express')
const db = require('../data/config')

const router = express.Router()

const tasks = require('../models/tasks')

router.get('/', (req, res, next) => {
    tasks.getTask()
        .then(task => {
            res.status(200).json(task)
            console.log(task)
        }).catch(err => {
            next(err)
        })
})

router.get('/:id', (req, res, next) => {
    tasks.findTask(req.params.id)
    .then(task => {
        res.status(200).json(task)
    }).catch(err => {
        next(err)
    })
})

router.post('/', (req, res, next) => {
    const payload = req.body
    tasks.addTask(payload)
        .then(task => {
            res.status(200).json(task)
        }).catch(err => {
            next(err)
        })
})

router.delete('/:id', (req, res, next) => {
    tasks.deleteTask(req.params.id)
        .then(task => {
            res.status(201).json({
                message: 'Task was deleted'
            }).catch(err => {
                next(err)
            })
        })
})

module.exports = router;