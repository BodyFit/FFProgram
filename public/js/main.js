require.config({

    // alias libraries paths
    paths: {
        'domReady': './libs/domready',
        'angular': './libs/CDN/angular',
        'angular-route': './libs/CDN/angular-route',
        // 'angular': 'http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.15/angular',
        // 'angular-route': 'http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.15/angular-route',
        'ui-bootstrap': './libs/ui-bootstrap-tpls-0.10.0'
        //'angular-ui': 'http://cdnjs.cloudflare.com/ajax/libs/angular-ui/0.4.0/angular-ui'
    },

    // angular does not support AMD out of the box, put it in a shim
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular'],
            exports: 'angular-route'
        },
        'ui-bootstrap': {
            deps: ['angular'],
            exports: 'ui-bootstrap'
        }
        // 'angular-ui': {
        //     deps: ['angular'],
        //     exports: 'angular-ui'
        // }
    },

    // kick start application
    deps: ['./bootstrap']
});
