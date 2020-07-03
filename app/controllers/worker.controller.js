const Worker = require("../models/worker.model.js");

// Find a single Customer with a customerId
exports.findById = (req, res) => {
    console.log("WorkerController::findById")
    Worker.findById(req.params.workerId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Worker does not exist.`
            });
          } else {
            res.status(500).send({
              message: "An error occurred while retrieving worker with id " + req.params.workerId
            });
          }
        } else res.send(data);
      });
};