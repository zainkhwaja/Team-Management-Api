var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var XRegExp = require('xregexp');
var unicodeWord = XRegExp('^\\pL+$|^[a-zA-Z\\s]*$|^$');

var User = new Schema({
        username: {
            type: String,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^[a-z]+([\.\-]?[a-z0-9]+)+([\.\-]?[a-z0-9]+)?$/.test(v);
                },
                message: '{VALUE} is not a valid username!'
            }


        },
        password: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^.{8,}$/.test(v);
                },
                message: '{VALUE} should have 8 or move than 8 characters!'
            }
        },
        OauthId: String,
        OauthToken: String,
        firstname: {
            type: String,
            default: '',
            validate: {
                validator: function (v) {

                    return unicodeWord.test(v);
                },
                message: '{VALUE} is not a valid firstname!'
            }
        },
        email: String,
        lastname: {
            type: String,
            default: '',
            validate: {
                validator: function (v) {

                    return unicodeWord.test(v);
                },
                message: '{VALUE} is not a valid firstname!'
            }
        },
        admin: {
            type: Boolean,
            default: false
        },
        resetToken: {
            type: String,
            default: ''
        },
        typeOfAcc: String,
        expiresIn: Date
    }, {
        timestamps: true
    }
);

User.methods.getName = function () {
    return (this.firstname + ' ' + this.lastname);
};

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);