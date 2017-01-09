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


exports.addCard = function (res, req, next) {

    Card.create(req.body, function (err, card) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while adding Card',
                success: false,
                data: err
            });
        }
        return res.status(200).json({
            message: 'Card add successfully',
            success: true,
            data: card
        });
    })
};

exports.deleteAllCards = function (res, req, next) {

    Card.remove({}, function (err, cards) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while removing Card',
                success: false,
                data: err
            });
        }
        return res.status(200).json({
            message: 'Deleted all Cards',
            success: true,
            data: card
        });
    })
};

// functions for /:id

exports.getCard = function (req, res, next) {

    Card.findById(req.param.id, function (err, card) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while getting Card',
                success: false,
                data: err
            });
        }
        return res.status(200).json({
            message: 'Card got successfully',
            success: true,
            data: card
        });

    })

};

exports.deleteCard = function (res, req, next) {

    Card.findByIdAndRemove(req.param.id, function (err, card) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while deleting Card ',
                success: false,
                data: err
            });
        }
        return res.status(200).json({
            message: 'Card deleted successfully',
            success: true,
            data: card
        });
    })
};

exports.editCard = function () {

    Card.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, function (err, card) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while updating Card',
                success: false,
                data: err
            });
        }
        return res.status(200).json({
            message: 'Card updated successfully',
            success: true,
            data: card
        });
    })

};


