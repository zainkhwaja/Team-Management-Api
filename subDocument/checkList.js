var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CheckList = new Schema({

    name: String,
    checkItemChecked: Number,
    checkItems: [
        {
            name: String,
            check: {
                type: Boolean,
                default: false
            }
        }
    ]
    
}, {
    timestamps: true
});
module.exports = CheckList;
