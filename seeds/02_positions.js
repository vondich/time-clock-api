
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Positions').del()
    .then(function () {
      // Inserts seed entries
      return knex('Positions').insert([
        {id: 1, name: 'Barista'},
      ]);
    });
};
