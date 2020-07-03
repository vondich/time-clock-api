
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('TimeLogActions').del()
    .then(function () {
      // Inserts seed entries
      return knex('TimeLogActions').insert([
        {id: 1, name: 'Clock In'},
        {id: 2, name: 'Clock Out'},
      ]);
    });
};
