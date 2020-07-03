
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('Workers', function (table){
        table.bigIncrements()
        table.bigInteger('userId').unsigned().notNullable();
        table.integer('positionId').unsigned().notNullable();

        table.foreign('userId').references('id').inTable('Users')
        table.foreign('positionId').references('id').inTable('Positions')
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Workers')
};
