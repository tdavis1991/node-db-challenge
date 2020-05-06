
exports.up = async function(knex) {
  await knex.schema.createTable('projects', (table) => {
      table.increments('id')
      table.text('name').notNull()
      table.text('description')
      table.boolean('completed').default(false)
  })

  await knex.schema.createTable('tasks', (table) => {
      table.increments('id')
      table.text('description').notNull()
      table.text('notes')
      table.boolean('completed').default(false)
      table.integer('project_id')
            .references('id')
            .inTable('projects')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
            .notNull()
  })

  await knex.schema.createTable('resources', (table) => {
      table.increments('id')
      table.text('name').notNull()
      table.text('description')
      table.integer('project_id')
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
        .notNull()
  })

  await knex.schema.createTable('project_task', (table) => {
      table.integer('project_id')
            .references('id')
            .inTable('projects')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
      table.integer('task_id')
            .references('id')
            .inTable('tasks')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
      table.primary(['project_id', 'task_id'])
  })

  await knex.schema.createTable('project_resource', (table) => {
    table.integer('project_id')
          .references('id')
          .inTable('projects')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
    table.integer('resource_id')
          .references('id')
          .inTable('resources')
          .onDelete('CASCADE')
          .onUpdate('CASCADE')
    table.primary(['project_id', 'resource_id'])
    })
};


exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('project_task')
    await knex.schema.dropTableIfExists('project_resource')
    await knex.schema.dropTableIfExists('resources')
    await knex.schema.dropTableIfExists('tasks')
    await knex.schema.dropTableIfExists('projects')
};
