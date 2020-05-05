const express = require('express')
const helmet  = require('helmet')

const projectRouter = require('./routers/projects')

const server = express()
const port = 4000

server.use(helmet())
server.use(express.json())

server.use('/projects', projectRouter)



server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: 'Something went wrong'
    })
})

server.listen(port, () => {
    console.log(`Listening to http://localhost:${port}`)
})