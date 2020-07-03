var moment = require('moment');
const TimeLog = require("../models/timelog.model.js");
const { validTimeLogActionIds, TIME_LOG_ACTION_ID_CLOCK_IN } = require('../constants/action');

const validateCreateTimeLog = (req) => {
    return new Promise((resolve, reject) => {
        let result = {
            success: false,
            message: ''
        };

        if (!req.body) {
            reject({
                ...result,
                message: "Content can not be empty!"
            });
          }

          // validate timeLogActionId
          if (!validTimeLogActionIds.includes(req.body.timeLogActionId)) {
            reject({
                ...result,
                message: "Invalid time log action id!"
            });
          }

          // validate that the new time log action is not the same as the worker's latest time log action in DB
          // i.e, do not allow worker to clock in again without clocking out
          TimeLog.findLatestByWorkerId(req.params.workerId)
            .then(response => {
                data = response.result;
                console.log("latest timelog", data)
                if (data.length == 0 && req.body.timeLogActionId != TIME_LOG_ACTION_ID_CLOCK_IN) {
                    console.log("clock in first")
                    reject({
                        ...result,
                        message: "Invalid time log action id!"
                    });
                } else if (req.body.timeLogActionId == data.timeLogActionId) {
                    console.log("latest action is same as new action")
                    reject({
                        ...result,
                        message: "Invalid time log action id!"
                    });
                }

                resolve({
                    ...result,
                    success: true
                });
            })
            .catch(error => {
                console.log("controller::findLatestByWorkerId::error", error)
                reject({
                    ...result,
                    message: "Unable to validate request"
                });
            });
    })

}

// Find a single Customer with a customerId
exports.create = (req, res) => {
    console.log("TimeLogController::create")

    // validate request
    validateCreateTimeLog(req)
    .then(() => {
        console.log("TimeLogController::validation::success")
        // Create timelog
        const newTimeLog = new TimeLog({
            workerId: req.params.workerId,
            timeLogActionId: req.body.timeLogActionId,
            createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        })

        TimeLog.create(newTimeLog)
            .then(response => {
                res.send(response);
            })
            .catch(error => {
                res.status(500).send({
                    message: error.message || "An error occurred while creating timeLog"
                })
            });
    })
    .catch((error) => {
        console.log("TimeLogController::validation::error", error)
        res.status(400).send({
            message:error.message
        });
    });
};
