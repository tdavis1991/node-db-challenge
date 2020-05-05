const express = require('express')
const db = require('../data/config')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        res.json(await db('projects'))
    }catch(err) {
        next(err)
    }
})

router.get('/:id', async(req, res, next) => {
    try {
        const project = await db('projects')
        .where("id", req.params.id)
        .first()

        if(!project) {
            return res.status(404).json({
                message: 'Project not found'
            })
        }

        res.json(project)
    }catch(err) {
        next(err)
    }
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

router.get('/:id/resources', async(req, res, next) => {
    try {
        const tasks = await db('project_resource as pr')
            .join('resources', 'resources.id', 'pr.resource_id')
            .join('projects', 'projects.id', 'pr.project_id')
            .where('pr.project_id', req.params.id)
            .select(
                'resources.id',
                'projects.name as projectName',
                'resources.name as resourceName',
                'resources.description as resourceDescription'
            )

        res.json(tasks)
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

router.delete('/:id', async(req, res, next) => {
    try {
        const { id } = req.params

        await db('projects').where({ id }).del()

        res.status(204).json({
            message: 'Project deleted'
        }).end()
    }catch(err) {
        next(err)
    }
    
})

module.exports = router;