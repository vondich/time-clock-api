
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('Users', function (table){
        table.bigIncrements()
        table.string('name').notNullable();
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Users')
};
