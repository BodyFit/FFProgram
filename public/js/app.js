define(['angular',
	'./services/index',
    './controllers/index'], function(ng) {
    'use strict';
    return ng.module('app', ['app.controllers', 'app.services']);
});