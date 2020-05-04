exports.seed = async function(knex) {
  await knex('resources').insert([
    {name: 'steel'},
    {name: 'computer', description: 'fast computer'},
    {name: 'water'}
  ])
};
