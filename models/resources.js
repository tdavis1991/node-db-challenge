const db = require('../data/config')

function getResources() {
    return db("resources")
}

function getResourceById(id) {
    return db('project_resource as pr')
        .join('resources', 'resources.id', 'pr.resource_id')
        .join('projects', 'projects.id', 'pr.project_id')
        .where('pr.project_id', req.params.id)
        .select(
            'resources.id',
            'projects.name as projectName',
            'resources.name as resourceName',
            'resources.description as resourceDescription'
        )
}

function addResource(resource) {
    return db('resources').insert(resource)
        .then(resource => {
            return findTask(resource[0])
        })
}

function deleteResource(id) {
    return db('resources').where('id', id).del()
}

module.exports = {
    getResources,
    getResourceById,
    addResource,
    deleteResource,
}