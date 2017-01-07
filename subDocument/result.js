var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Result = new Schema({

        result: Number,
        resultDefination: String,
        success: {
            pricing: String,
            notes: String
        },
        negative: {
            reason: Number,
            notes: String,
            autoLead: Date
        },
        hold: {
            notes: String,
            autoLead: Date
        }
    }, {
        timestamps: true
    });
module.exports = Result;
