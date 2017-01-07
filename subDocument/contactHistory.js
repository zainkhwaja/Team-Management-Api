var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactHisotry = new Schema({

    time : Date ,
    type : String ,
    notes : String ,
    nextContactDate : Date 

});