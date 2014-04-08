define(['angular',
	'./services/index',
	'./directives/index',
    './controllers/index'], function(ng) {
    'use strict';
    return ng.module('app', ['app.controllers', 'app.services', 'app.directives']);
});