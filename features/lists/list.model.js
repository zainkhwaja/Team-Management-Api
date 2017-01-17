var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var List = new Schema({

        name: String

    }, {
        timestamps: true
    }
);

module.exports = mongoose.model('List', List); ;