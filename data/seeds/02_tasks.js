exports.seed = async function(knex) {
  await knex('tasks').insert([
    {description: 'make blue prints', completed: false},
    {description: 'need software', completed: true},
    {description: 'need freezer', notes: 'need more ice', completed: true},
  ])
};
