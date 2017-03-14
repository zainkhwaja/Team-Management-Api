var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Company = new Schema({

        name: {
            type: String,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^[a-z]+([\.\-]?[a-z0-9]+)+([\.\-]?[a-z0-9]+)?$/.test(v);
                },
                message: '{VALUE} is not a valid company name!'
            }

        },
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