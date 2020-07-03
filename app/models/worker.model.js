const db = require("./db.js");

// constructor
const Worker = function(worker) {
  this.id = worker.id;
  this.name = worker.name;
  this.positionName = worker.positionName
};


Worker.findById = (id, result) => {
  console.log("WorkerModel::findById")
  db.raw(`SELECT Workers.*, Users.name, Users.id as userId, Positions.name as positionName FROM Workers
      LEFT JOIN Users ON Workers.userId=Users.id
      LEFT JOIN Positions ON Workers.positionId=Positions.id
      WHERE Workers.id = ?`,
      [id]
  ).then(function (resp) {
    console.log("Worker.findById::success", resp)
    if (resp.length) {
      result(null, resp[0])
    }

    result({ kind: "not_found" }, null);
  })
  .catch(function (resp) {
    console.log('Worker.findById::error', resp)
    result(resp, null);
  })
};

module.exports = Worker;