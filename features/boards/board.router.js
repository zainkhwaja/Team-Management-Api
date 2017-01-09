var express = require('express');
var router = express.Router();
var boardCtrl = require('./board.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');

router.route('/')


//GET boards
    .get(verify.user, boardCtrl.listAll)

// POST board
    .post(verify.user,boardCtrl.addBoard)

// DELETE board
    .delete(verify.user,boardCtrl.deleteAllBoards);



router.route('/:id')


    //GET boards
    .get(verify.user, boardCtrl.getBoard)

    // PUT board
    .put(verify.user,boardCtrl.editBoard)

    // DELETE board
    .delete(verify.user,boardCtrl.deleteBoard);




module.exports = router;