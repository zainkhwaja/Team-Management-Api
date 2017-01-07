var express = require('express');
var router = express.Router();
var boardCtrl = require('./board.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');

//GET boards
router.get('/', verify.user, boardCtrl.listAll);

module.exports = router;