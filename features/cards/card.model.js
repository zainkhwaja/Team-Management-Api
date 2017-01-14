var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ContactHistory = require('../../subDocument/checkList');
var Comments = require('../../subDocument/comments');
var CheckList = require('../../subDocument/checkList');
var Result = require('../../subDocument/result');
var List = require('../lists/list.model.js');

var Card = new Schema({

        board: {
            type: Schema.Types.ObjectId,
            ref: 'Board'
        },
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
        attachments: [{
            type: Schema.Types.ObjectId,
            ref: 'Attachment'
        }],
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