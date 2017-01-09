var List = require('./list.model.js');
var passport = require('passport');
var Verify = require('../../server/verify.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var auth = require('../../server/auth');

exports.listAll = function (req, res, next) {
    List.find({}, function (err, lists) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again.',
                data: err
            });
        }
        res.status(200).json({
            success: true,
            message: 'All Lists fetched successfully.',
            data: lists
        });
    });
};


exports.addList = function (res, req, next) {

    List.create(req.body, function (err, List) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while adding List',
                success: false,
                data: err
            });
        }
        return res.status(200).json({
            message: 'List add successfully',
            success: true,
            data: List
        });
    })

};

exports.deleteAllLists = function (res, req, next) {

    List.remove({}, function (err, Lists) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while removing List',
                success: false,
                data: err
            });
        }
        return res.status(200).json({
            message: 'Deleted all Lists',
            success: true,
            data: Lists
        });
    })
};

// functions for /:id

exports.getList = function (req,res,next) {

    List.findById(req.param.id, function (err, List) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while getting List',
                success: false,
                data: err
            });
        }
        return res.status(200).json({
            message: 'List got successfully',
            success: true,
            data: List
        });

    })

};

exports.deleteList = function (res,req,next) {

    List.findByIdAndRemove(req.param.id,function (err,List) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while deleting List ',
                success: false,
                data: err
            });
        }
        return res.status(200).json({
            message: 'List deleted successfully',
            success: true,
            data: List
        });
    })
};

exports.editList = function () {

    List.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    },function (err,List) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while updating List',
                success: false,
                data: err
            });
        }
        return res.status(200).json({
            message: 'List updated successfully',
            success: true,
            data: List
        });
    })

};



