var Board = require('./board.model.js');
var passport = require('passport');
var Verify = require('../../server/verify.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var auth = require('../../server/auth');


// Routes for /

exports.listAll = function (req, res, next) {
    Board.find({}, function (err, boards) {
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

exports.addBoard = function (res, req, next) {

    Board.create(req.body, function (err, board) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while adding board',
                success: false,
                data: err
            });
        }
        return res.status(200).json({
            message: 'Board add successfully',
            success: true,
            data: board
        });
    })

};

exports.deleteAllBoards = function (res, req, next) {

    Board.remove({}, function (err, boards) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while removing board',
                success: false,
                data: err
            });
        }
        return res.status(200).json({
            message: 'Deleted all boards',
            success: true,
            data: boards
        });
    })
};

// functions for /:id

exports.getBoard = function (req,res,next) {

    Board.findById(req.param.id, function (err, board) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while getting board',
                success: false,
                data: err
            });
        }
        return res.status(200).json({
            message: 'Board got successfully',
            success: true,
            data: board
        });

    })

};

exports.deleteBoard = function (res,req,next) {

    Board.findByIdAndRemove(req.param.id,function (err,board) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while deleting board ',
                success: false,
                data: err
            });
        }
        return res.status(200).json({
            message: 'board deleted successfully',
            success: true,
            data: board
        });
    })
};

exports.editBoard = function () {

    Board.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    },function (err,board) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while updating Board',
                success: false,
                data: err
            });
        }
        return res.status(200).json({
            message: 'Board updated successfully',
            success: true,
            data: board
        });
    })

};


