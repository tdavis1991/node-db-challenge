const db = require('../data/config')

function find() {
    console.log("models")
    return db('projects')
}

function findById(id) {
    return db('projects')
        .where('id', id)
        .first()
}

function addProject(project) {
    return db('projects').insert(project)
        .then(ids => {
            return findById(ids[0])
        })
}

function deleteProject(id) {
    return db('projects').where('id', id).del()
}

module.exports = {
    find,
    findById,
    addProject,
    deleteProject,
}