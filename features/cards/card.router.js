var express = require('express');
var router = express.Router();
var cardCtrl = require('./card.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');

//GET cards
router.get('/', verify.user, cardCtrl.listAll);

module.exports = router;