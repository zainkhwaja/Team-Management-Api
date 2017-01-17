var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Company = new Schema({

        name: String,
        desc: String,
        web: String,
        city: String,
        country: String,
        sector: String,
        accountType: Number,
        contactPerson: {
            name: String,
            title: String,
            email: String,
            telephone: String,
            mobile: String,
            twitter: String,
            linkedIn: String
        },
        financialDetail: {
            companyTitle: String,
            billingAddress: String,
            taxNo: String,
            taxOffice: String,
            billContactPerson: {
                name: String,
                email: String,
                telephone: String
            }
        }

    }, {
        timestamps: true
    }
);

Company.methods.getName = function () {
    return (this.firstname + ' ' + this.lastname);
};


module.exports = mongoose.model('Company', Company);