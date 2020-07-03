module.exports = app => {
    const workers = require("../controllers/worker.controller.js")

    // Retrieve a single Worker with workerId
    app.get("/workers/:workerId", workers.findById);
  };