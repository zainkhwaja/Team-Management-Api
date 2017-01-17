var Card = require('./card.model.js');
var passport = require('passport');
var Verify = require('../../server/verify.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var auth = require('../../server/auth');
var List = require('../lists/list.model');
var Board = require('../boards/board.model');
var Company = require('../companies/company.model');

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

    var temp = {
        email: req.body.email,
        name: req.body.name,
        comapny: req.body.company,
        number: req.body.number,
        description: req.body.description,
        board: req.body.board,
        list: req.body.list
    };
    var card = new Card(temp);
    log(card);
    Board.findById(req.body.board, function (err, board) {

        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while adding card ',
                success: false,
                data: err
            });
        }
        board.cards.push(card._id);
        board.save();
        card.save();
        return res.status(200).json({
            message: 'Card added succesfully',
            success: true,
            data: card
        });
    });


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

    log(req.body);

    Company.find({}, function (err, companies) {
        var flag = false;
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while deleting Card ',
                success: false,
                data: err
            });
        }
        if (req.body.company._id) {
            for (var company in companies) {
                if (companies[company]._id == req.body.comapny._id) {
                    flag = true;
                }

            }
        }


        if (!flag) {

            var company = {
                name: req.body.company.name
            };

            var newCompany = new Company(company);
            log(newCompany);
            newCompany.save();
            req.body.company = newCompany._doc._id ;


        }

        log(req.body);


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

    });


};




