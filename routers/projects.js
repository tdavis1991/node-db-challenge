const express = require('express')
const db = require('../data/config')
const projects = require('../models/projects')
const task = require('../models/tasks')
const resource = require('../models/resources')

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

//get tasks to project
router.get('/:id/tasks', async(req, res, next) => {
    try {
        const tasks = await db('tasks')
        .where('tasks.project_id', req.params.id)
        .join('projects as p', 'p.id', '=', 'tasks.project_id')
        .select(
            'p.id',
            'p.name as projectName',
            'p.description as projectDescription',
            'tasks.description as taskDescription',
            'tasks.completed as completed'
        )

        res.json(tasks)
    }catch(err) {
        next(err)
    }
})

//get resources to project
router.get('/:id/resources', async(req, res, next) => {
    try {
        const resources = await db('resources')
        .where('resources.project_id', req.params.id)
        .join('projects as p', 'p.id', '=', ' resources.project_id')
        .select(
            'p.id',
            'p.name as projectName',
            'resources.name as resourceName'
        )

        res.json(resources)
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

//add task to project
router.post('/:id/task', (req, res, next) => {
    const id = req.params.id
    const payload = {...req.body, project_id: id}

    
    task.addTask(payload)
        .then(task => {
            res.status(200).json(task)
        }).catch(err => {
            next(err)
        })
})

//add resource to project
router.post('/:id/resource', (req, res, next) => {
    const id = req.params.id
    const payload = {...req.body, project_id: id}

    
    resource.addResource(payload)
        .then(resource => {
            res.status(200).json(resource)
        }).catch(err => {
            next(err)
        })
})

module.exports = router;