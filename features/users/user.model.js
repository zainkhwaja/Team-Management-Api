var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
        username: String,
        password: String,
        OauthId: String,
        OauthToken: String,
        firstname: {
            type: String,
            default: ''
        },
        email: String,
        lastname: {
            type: String,
            default: ''
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