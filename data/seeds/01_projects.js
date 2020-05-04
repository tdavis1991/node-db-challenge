
exports.seed = async function(knex) {
  await knex('projects').insert([
    {name: 'Building a ship', completed: true},
    {name: 'Making a game', description: 'Need software', completed: false},
    {name: 'Making ice', description: 'need water', completed: true},
  ])
};
