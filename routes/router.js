var express = require('express');
var users = require('../features/users/user.router');
var attatchments = require('../features/attachments/attachment.router');
var boards = require('../features/boards/board.router');
var cards = require('../features/cards/card.router');
var companies = require('../features/companies/company.router');
var lists = require('../features/lists/list.router');

var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../server/verify');

module.exports = function (app, config, models) {
    var router = express.Router();

    router.use('/users', users);
    router.use('/attachments', attatchments);
    router.use('/boards', boards);
    router.use('/cards', cards);
    router.use('/companies', companies);
    router.use('/list', lists);


    app.use('/api', router);
};
