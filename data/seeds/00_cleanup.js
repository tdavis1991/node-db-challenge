
exports.seed = async function(knex) {
    await knex('project_task').truncate()
    await knex('project_resource').truncate()
    await knex('resources').truncate()
    await knex('tasks').truncate()
    await knex('projects').truncate()
};
