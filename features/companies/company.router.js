var express = require('express');
var router = express.Router();
var companyCtrl = require('./company.controller.js');
var log = require('tracer').console({format: "{{message}}  - {{file}}:{{line}}"}).log;
var verify = require('../../server/verify');

router.route('/')

    //GET companies
    .get(verify.user, companyCtrl.listAll)


    // POST Company
    .post(verify.user, companyCtrl.addCompany)

    // DELETE Company
    .delete(verify.user, companyCtrl.deleteAllCompanys);


router.route('/:id')


    //GET Companys
    .get(verify.user, companyCtrl.getCompany)

    // PUT Company
    .put(verify.user, companyCtrl.editCompany)

    // DELETE Company
    .delete(verify.user, companyCtrl.deleteCompany);


module.exports = router;