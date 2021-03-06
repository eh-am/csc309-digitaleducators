'use strict';

var express = require('express');
var controller = require('./review.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

router.get('/user/:id', auth.isAuthenticated(), controller.showUserReviews);
router.get('/statistics/all', auth.isAuthenticated(), controller.showStatistics);
router.get('/statistics/:id', auth.isAuthenticated(), controller.showUserStatistics);

module.exports = router;