
exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('TimeLogs', function (table){
        table.bigIncrements()
        table.bigInteger('workerId').unsigned().notNullable();
        table.integer('timeLogActionId').unsigned().notNullable();
        table.datetime('createdAt').defaultTo(knex.fn.now())

        table.foreign('workerId').references('id').inTable('Workers')
        table.foreign('timeLogActionId').references('id').inTable('TimeLogActions')
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('timelogs')
};
