const express = require('express')
const db = require('../data/config')
const projects = require('../models/projects')

const router = express.Router()

router.get('/',(req, res, next) => {
  projects.find()
  .then(project => {
      res.status(200).json(project)
  }).catch(err => {
      next(err)
  }) 
})

router.get('/:id', (req, res, next) => {
    projects.findById(req.params.id)
    .then(project => {
        if(project) {
            res.status(200).json(project)
        }else {
            res.status(404).json({
                message: 'Project does not exist'
            })
        }
    }).catch(err => {
        next(err)
    })
})

router.get('/:id/tasks', async(req, res, next) => {
    try {
        const tasks = await db('project_task as pt')
            .join('tasks', 'tasks.id', 'pt.task_id')
            .join('projects', 'projects.id', 'pt.project_id')
            .where('pt.project_id', req.params.id)
            .select(
                'tasks.id',
                'projects.name as projectName',
                'tasks.description as taskDescription'
            )

        res.json([...tasks])
    }catch(err) {
        next(err)
    }
})

router.post('/', async(req, res, next) => {
    try {
        const [id]  = await db('projects').insert(req.body)
        const project = await db('projects').where({ id }).first()

        res.json(project)
    }catch(err) {
        next(err)
    }
})

router.put('/:id', async(req, res, next) => {
    try {
        const {id} = req.params

        await db('projects').where({ id }).update(req.body)
        const project = await (await db('projects').where({ id })).first()

        res.status(200).json(project)
    }catch(err) {
        next(err)
    }
})

router.delete('/:id', (req, res, next) => {

})

module.exports = router;