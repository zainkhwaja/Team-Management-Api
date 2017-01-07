var express = require('express');
var router = express.Router();
var listCtrl = require('./list.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');

//GET lists
router.get('/', verify.user, listCtrl.listAll);


module.exports = router;