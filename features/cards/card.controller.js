var Card = require('./card.model.js');
var passport = require('passport');
var Verify = require('../../server/verify.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var auth = require('../../server/auth');

exports.listAll = function (req, res, next) {
    Card.find({}, function (err, cards) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again.',
                data: err
            });
        }
        res.status(200).json({
            success: true,
            message: 'All cards fetched successfully.',
            data: cards
        });
    });
};