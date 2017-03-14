var express = require('express');
var router = express.Router();
var attachmentCtrl = require('./attachment.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');

//GET attachments
router.get('/', verify.user, attachmentCtrl.listAll);

// ADD attachment
router.post('/:cid',verify.user,attachmentCtrl.addAttachment);


module.exports = router;