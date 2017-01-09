var Company = require('./company.model.js');
var passport = require('passport');
var Verify = require('../../server/verify.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var auth = require('../../server/auth');

exports.listAll = function (req, res, next) {
    Company.find({}, function (err, companies) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again.',
                data: err
            });
        }
        res.status(200).json({
            success: true,
            message: 'All companies fetched successfully.',
            data: companies
        });
    });
};

exports.addCompany = function (res, req, next) {

    Company.create(req.body, function (err, company) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while adding Company',
                success: false,
                data: err
            });
        }
        return res.status(200).json({
            message: 'Company add successfully',
            success: true,
            data: company
        });
    })

};

exports.deleteAllCompanys = function (res, req, next) {

    Company.remove({}, function (err, companies) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while removing Company',
                success: false,
                data: err
            });
        }
        return res.status(200).json({
            message: 'Deleted all Companys',
            success: true,
            data: companies
        });
    })
};

// functions for /:id

exports.getCompany = function (req, res, next) {

    Company.findById(req.param.id, function (err, company) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while getting Company',
                success: false,
                data: err
            });
        }
        return res.status(200).json({
            message: 'Company got successfully',
            success: true,
            data: company
        });

    })

};

exports.deleteCompany = function (res, req, next) {

    Company.findByIdAndRemove(req.param.id, function (err, company) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while deleting Company ',
                success: false,
                data: err
            });
        }
        return res.status(200).json({
            message: 'Company deleted successfully',
            success: true,
            data: company
        });
    })
};

exports.editCompany = function () {

    Company.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    }, function (err, company) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while updating Company',
                success: false,
                data: err
            });
        }
        return res.status(200).json({
            message: 'Company updated successfully',
            success: true,
            data: company
        });
    })

};



