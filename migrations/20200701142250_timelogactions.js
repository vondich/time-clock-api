
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('TimeLogActions', function (table){
        table.increments()
        table.string('name').notNullable();
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('TimeLogActions')
};
