var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Attachment = new Schema({

        name: String,
        src: String,
        time: {
            type: Date,
            default: Date.now()
        },
        type: String,
        notes: String

    }, {
        timestamps: true
    }
);

module.exports = mongoose.model('Attachment', Attachment);