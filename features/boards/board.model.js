var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Board = new Schema({

        name: String,
        cards: [{
            type: Schema.Types.ObjectId,
            ref: 'Cards'
        }],
        labelId: [String]

    }, {
        timestamps: true
    }
);

module.exports = mongoose.model('Board', Board);