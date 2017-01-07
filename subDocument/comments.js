var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Comment = new Schema({

        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        message: String,
        time: Date

    }, {
        timestamps: true
    });