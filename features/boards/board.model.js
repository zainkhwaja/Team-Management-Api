var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var List = require('../lists/list.model.js');
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var Board = new Schema({

        name: String,
        cards: [{
            type: Schema.Types.ObjectId,
            ref: 'Card'
        }],
        labelId: [String],
        lists: [{
            type: Schema.Types.ObjectId,
            ref: 'List'
        }]

    }, {
        timestamps: true
    }
);
Board.plugin(deepPopulate);
module.exports = mongoose.model('Board', Board);