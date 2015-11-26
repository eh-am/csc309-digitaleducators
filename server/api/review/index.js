'use strict';

var express = require('express');
var controller = require('./review.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

router.get('/user/:id', auth.isAuthenticated(), controller.showUserReviews);
router.get('/statistics/:id', auth.isAuthenticated(), controller.showUserStatistics);

module.exports = router;