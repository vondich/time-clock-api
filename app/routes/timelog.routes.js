module.exports = app => {
    const timeLog = require("../controllers/timeLog.controller.js")

    // Retrieve a single Worker with workerId
    app.post("/workers/:workerId/time-logs", timeLog.create);
  };