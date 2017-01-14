var Card = require('./card.model.js');
var passport = require('passport');
var Verify = require('../../server/verify.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var auth = require('../../server/auth');
var List = require('../lists/list.model');
var Board = require('../boards/board.model');


exports.listAll = function (req, res, next) {
    Card.find({})
        .populate('list')
        .exec(function (err, cards) {
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


exports.addCard = function (req, res, next) {
    log(req.body);
    var card = new Card(req.body);
    Board.find({}, function (err, boards) {

        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while adding card ',
                success: false,
                data: err
            });
        }
        for (var board in boards) {
            if (boards[board]._id = req.body.board) {
                card.board = boards[board]._id;

            }

        }

        List.find({}, function (err, lists) {

                if (err) {
                    return res.status(500).json({
                        message: 'Something went wrong while adding card',
                        success: false,
                        data: err
                    });
                }
                for (var list in lists) {
                    if (lists[list]._id = req.body.list) {
                        log("---List found ----")
                        card.list = lists[list]._id;

                    }

                }

                log(card);
                card.save();
                return res.status(200).json({
                    message: 'Card added succesfully',
                    success: true,
                    data: card
                });
            }
        );


    });

    // card.save();


};

exports.deleteAllCards = function (req, res, next) {

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
            data: null
        });
    })
};

// functions for /:id

exports.getCard = function (req, res, next) {

    Card.findById(req.param.id)
        .populate('list')
        .populate('board')
        .exec(function (err, card) {
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

exports.deleteCard = function (req, res, next) {

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

exports.editCard = function (req, res, next) {

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




