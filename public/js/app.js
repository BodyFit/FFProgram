define(['angular',
	'ui-bootstrap',
    './services/index',
    './directives/index',
    './controllers/index',
    './routes'
], function(ng) {
    'use strict';
    return ng.module('app', ['app.controllers', 'app.services', 'app.directives', 'app.routes', 'ui.bootstrap']);
});
