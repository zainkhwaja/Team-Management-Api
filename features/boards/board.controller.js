var Board = require('./board.model.js');
var List = require('../lists/list.model.js');
var passport = require('passport');
var Verify = require('../../server/verify.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var auth = require('../../server/auth');
var mongoose = require('mongoose');
var Card = require('../cards/card.model');

// Routes for /

exports.listAll = function (req, res, next) {
    Board.find({})
        .populate('lists')
        .deepPopulate('cards')
        .exec(
            function (err, boards) {
                if (err) {
                    
                    return res.status(500).json({
                        success: false,
                        message: 'Something went wrong. Please try again.',
                        data: err
                    });
                }
                res.status(200).json({
                    success: true,
                    message: 'All boards fetched successfully.',
                    data: boards
                });
            });
};

exports.addBoard = function (req, res, next) {
    log(req.body);
    var Obj = {
        name: req.body.name || '',
        labelId: req.body.labelId || []
    };

    var board = new Board(Obj);
    List.find({}, function (err, lists) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while adding board',
                success: false,
                data: err
            });
        }
        for (var i = 0; i < lists.length; i++) {
            for (var j = 0; j < req.body.lists.length; j++) {
                if (lists[i]._id == req.body.lists[j]) {
                    log('if');
                    log(lists[i]._id);
                    log(req.body.lists[j]);
                    board.lists.push(lists[i]._id);
                }
                else {
                    log('Élse');
                    log(lists[i]._id);
                    log(req.body.lists[j]);
                }
            }
        }

       Card.find({},function (err,cards) {
           for (var i = 0; i < cards.length; i++) {
               for (var j = 0; j < req.body.cards.length; j++) {
                   if (cards[i]._id == req.body.cards[j]) {
                       log('if');
                       board.cards.push(cards[i]._id);
                   }
                   else {
                       log('Élse');
                       log(lists[i]._id);
                       log(req.body.lists[j]);
                   }
               }
           }


           log(board);

           board.save();
           res.status(200).json({
               message: 'Board updated successfully',
               success: true,
               data: board
           });
       });

    });


    log(board);


};

exports.deleteAllBoards = function (req, res, next) {

    Board.remove({}, function (err, boards) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while removing board',
                success: false,
                data: err
            });
        }
        res.status(200).json({
            message: 'Deleted all boards',
            success: true,
            data: boards
        });
    })
};

// functions for /:id

exports.getBoard = function (req, res, next) {
log(req.params.id);
    var id =  new mongoose.Types.ObjectId(req.params.id);
    Board.findById(id, function (err, board) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while getting board',
                success: false,
                data: err
            });
        }
        log(board);
        res.status(200).json({
            message: 'Board got successfully',
            success: true,
            data: board
        });

    })

};

exports.deleteBoard = function (req, res, next) {

    Board.findByIdAndRemove(req.param.id, function (err, board) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while deleting board ',
                success: false,
                data: err
            });
        }
        res.status(200).json({
            message: 'board deleted successfully',
            success: true,
            data: board
        });
    })
};

exports.editBoard = function (req, res, next) {

    Board.findById(req.params.id, function (err, board) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while updating Board',
                success: false,
                data: err
            });
        }
        board.name = req.body.name || board.name;
        board.cards = req.body.cards || board.cards;
        board.labelId = req.body.labelId || board.labelId;
        board.lists = req.body.lists || board.lists;
        board.save();
        res.status(200).json({
            message: 'Board updated successfully',
            success: true,
            data: board
        });
    })

};


