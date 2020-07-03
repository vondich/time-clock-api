const db = require("./db.js");

// constructor
const TimeLog = function(timeLog) {
  this.workerId = timeLog.workerId;
  this.timeLogActionId = timeLog.timeLogActionId;
  this.createdAt = timeLog.createdAt
};


TimeLog.create = (newTimeLog) => {
  return new Promise((resolve, reject) => {
    console.log("TimeLogModel::create")
    db.raw(`INSERT INTO TimeLogs (workerId, timeLogActionId, createdAt) VALUES
        (?, ?, ?)`,
        [newTimeLog.workerId, newTimeLog.timeLogActionId, newTimeLog.createdAt]
    ).then(response => {
      console.log('success', response)
      resolve({
        id: response.id,
        ...newTimeLog
      })
    })
    .catch(error => {
      console.log('ERROR', error)
      reject({error})
    })
  })
};

TimeLog.findLatestByWorkerId = (workerId, result) => {
  return new Promise((resolve, reject) => {
    db.raw(`SELECT * FROM TimeLogs WHERE workerId = ? ORDER BY createdAt DESC LIMIT 1`, [workerId]).
      then(response => {
        console.log('findLatestByWorkerId::success', response);
        result = {};
        if (response.length) {
          result = response[0];
        }

        resolve({result})
      })
      .catch(err => {
        console.log('findLatestByWorkerId::ERROR', err)
        reject({err})
      });
  })
};

module.exports = TimeLog;