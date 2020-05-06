const express = require('express')
const db = require('../data/config')

const router = express.Router()

const resources = require('../models/resources')

router.get('/', (req, res, next) => {
    resources.getResources()
        .then(resource => {
            res.status(200).json(resource)
        }).catch(err => {
            next(err)
        })
})

router.get('/:id', (req, res, next) => {
    resources.getResourceById(req.params.id)
    .then(task => {
        res.status(200).json(task)
    }).catch(err => {
        next(err)
    })
})

router.post('/', (req, res, next) => {
    const payload = req.body
    resources.addResource(payload)
        .then(resource => {
            res.status(200).json(resource)
        }).catch(err => {
            next(err)
        })
})

router.delete('/:id', (req, res, next) => {
    resources.deleteResource(req.params.id)
        .then(resource => {
            res.status(201).json({
                message: 'Resource was deleted'
            }).catch(err => {
                next(err)
            })
        })
})

module.exports = router;