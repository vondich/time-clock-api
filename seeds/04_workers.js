
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Workers').del()
    .then(function () {
      // Inserts seed entries
      return knex('Workers').insert([
        {id: 1, userId: 1, positionId: 1},
      ]);
    });
};
