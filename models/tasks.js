const db = require('../data/config')

function getTask() {
    return db('tasks')
}

function findTask(id) {
    return db('project_task as pt')
    .join('tasks', 'tasks.id', '=', 'pt.task_id')
    .join('projects', 'projects.id', '=', 'pt.project_id')
    .where('pt.project_id', id)
    .select(
        'tasks.id',
        'projects.name as Project_name',
        'tasks.description as Task_description',
        'pt.project_id as projectId'
    )
}

function addTask(task) {
    return db('tasks').insert(task)
        .then(task => {
            return findTask(task[0])
        })
}

function deleteTask(id) {
    return db('tasks').where('id', id).del()
}


module.exports = {
    findTask,
    addTask,
    getTask,
    deleteTask
}