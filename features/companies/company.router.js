var express = require('express');
var router = express.Router();
var companyCtrl = require('./company.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');

//GET companies
router.get('/', verify.user, companyCtrl.listAll);

module.exports = router;