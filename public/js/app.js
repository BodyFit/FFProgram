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

// TODO: Take a look at https://github.com/mcasimir/mobile-angular-ui