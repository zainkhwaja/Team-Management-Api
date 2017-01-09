var express = require('express');
var router = express.Router();
var listCtrl = require('./list.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');

router.route('/')

    //GET lists
    .get(verify.user, listCtrl.listAll)

    // POST List
    .post(verify.user, listCtrl.addList)

    // DELETE List
    .delete(verify.user, listCtrl.deleteAllLists);


router.route('/:id')


    //GET Lists
    .get(verify.user, listCtrl.getList)

    // PUT List
    .put(verify.user, listCtrl.editList)

    // DELETE List
    .delete(verify.user, listCtrl.deleteList);


module.exports = router;