'use strict';

var express = require('express');
var controller = require('./question.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
// router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/applyForHelp', auth.isAuthenticated(), controller.applyForHelp);
router.post('/acceptHelpFrom', auth.isAuthenticated(), controller.acceptHelpFrom);
router.post('/endHelp', auth.isAuthenticated(), controller.endHelp);

// I am using post so that we can restrict that only the own user can see
// his/hers own data
router.post('/myQuestions', auth.isAuthenticated(), controller.myQuestions);
router.post('/myHelps', auth.isAuthenticated(), controller.myHelps);

// TODO
// uncomment to be able to update questions
// router.put('/:id', auth.isAuthenticated(), controller.update);
// router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;