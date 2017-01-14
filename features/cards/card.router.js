var express = require('express');
var router = express.Router();
var cardCtrl = require('./card.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');


router.route('/')

    //GET cards
    .get(verify.user, cardCtrl.listAll)

    // POST Card
    .post(verify.user, cardCtrl.addCard)

    // DELETE Card
    .delete(verify.user, cardCtrl.deleteAllCards);


router.route('/:id')


    //GET Cards
    .get(verify.user, cardCtrl.getCard)

    // PUT Card
    .put(verify.user, cardCtrl.editCard)

    // DELETE Card
    .delete(verify.user, cardCtrl.deleteCard);


module.exports = router;