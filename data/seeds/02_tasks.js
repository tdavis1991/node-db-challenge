exports.seed = async function(knex) {
  await knex('tasks').insert([
    {description: 'make blue prints', completed: false, project_id: 1},
    {description: 'need software', completed: true, project_id: 2},
    {description: 'need freezer', notes: 'need more ice', completed: true, project_id: 3},
  ])
};
