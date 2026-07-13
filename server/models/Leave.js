const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema({

    employeeId: {
        type: String
    },

    employeeName: {
        type: String
    },

    email: {
        type: String
    },

    leaveType: {
        type: String
    },

    fromDate: {
        type: String
    },

    toDate: {
        type: String
    },

    totalDays: {
        type: Number
    },

    reason: {
        type: String
    },

    status: {
        type: String,
        default: "Pending"
    }

});

module.exports = mongoose.model("Leave", leaveSchema);