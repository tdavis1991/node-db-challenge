exports.seed = async function(knex) {
  await knex('resources').insert([
    {name: 'steel', project_id: 1},
    {name: 'computer', description: 'fast computer', project_id: 2},
    {name: 'water', project_id: 3}
  ])
};
