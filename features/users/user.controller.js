var User = require('./user.model.js');
var passport = require('passport');
var Verify = require('../../server/verify.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var auth = require('../../server/auth');

exports.listAll = function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Something went wrong. Please try again.',
                data: err
            });
        }
        res.status(200).json({
            success: true,
            message: 'All Users fetched successfully.',
            data: users
        });
    });
};

exports.register = function (req, res) {
    User.register(new User({
            username: req.body.username
        }),
        req.body.password,
        function (err, user) {
            if (err) {
                return res.status(500).json({
                    err: err
                });
            }
            if (req.body.firstname) {
                user.firstname = req.body.firstname;
            }
            if (req.body.lastname) {
                user.lastname = req.body.lastname;
            }
            user.save(function (err, user) {
                passport.authenticate('local')(req, res, function () {
                    return res.status(200).json({
                        message: 'User registered',
                        success: true,
                        data: null
                    });
                });
            });
        });
};

exports.login = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function (err) {

            log(err);
            if (err) {
                return res.status(500).json({
                    message: 'Could not log in user',
                    success: false,
                    data: err
                });
            }

            auth.getLoginData(user).then(
                function (data) {
                    console.log(data);
                    return res.status(200).json({
                        message: 'Login successful!',
                        success: true,
                        data: data
                    });
                },
                function (err) {
                    console.log(err);
                    return res.status(400).json({
                        message: 'Something went wrong while login.',
                        success: false,
                        data: null
                    });
                });
        });
    })(req, res, next);
};

exports.verifyUser = function (req, res) {
    log(req._user);
    User.findById(req._user._id, function (err, user) {
        if (err) {
            return res.status(500).json({
                message: 'Something went wrong while finding user',
                success: false,
                data: null
            });
        }
        auth.getLoginData(user).then(
            function (data) {
                log(data);
                return res.status(200).json({
                    message: 'User Data',
                    success: true,
                    data: data
                });
            },
            function (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Something went wrong while getting data ',
                    success: false,
                    data: null
                });
            }
        );
    });
};

exports.logout = function (req, res) {
    req.logout();
    res.status(200).json({
        message: 'logout',
        success: true,
        data: null
    });
};