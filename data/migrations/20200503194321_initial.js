
exports.up = async function(knex) {
  await knex.schema.createTable('projects', (table) => {
      
  })
};

exports.down = function(knex) {
  
};
