'use strict';

var express = require('express');
var controller = require('./question.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.post('/applyForHelp', auth.isAuthenticated(), controller.applyForHelp);

// I am using post so that we can restrict that only the own user can see
// his/hers own data
router.post('/myQuestions', auth.isAuthenticated(), controller.myQuestions);
// TODO
// uncomment to be able to update questions
// router.put('/:id', auth.isAuthenticated(), controller.update);
// router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;