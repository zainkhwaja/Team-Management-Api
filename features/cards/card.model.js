var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var ContactHistory = require('../../subDocument/checkList')
var Comments = require('../../subDocument/comments')
var CheckList = require('../../subDocument/checkList')
var Result = require('../../subDocument/result')


var Card = new Schema({

        list: {
            type: Schema.Types.ObjectId,
            ref: 'List'
        },
        alertDate: Date,
        labelId: [String],
        owner: String,
        company: {
            type: Schema.Types.ObjectId,
            ref: 'Company'
        },
        contactHistory: [ContactHistory],
        saleChannel: String,
        attachment: {
            type: Schema.Types.ObjectId,
            ref: 'Attachment'
        },
        member: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        result: Result,
        checkList: [CheckList],
        checkItemCount: Number,
        comments: [Comments]

    }, {
        timestamps: true
    }
);

module.exports = mongoose.model('Card', Card);