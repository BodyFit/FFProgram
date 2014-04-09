require.config({

    // alias libraries paths
    paths: {
        'domReady': './libs/domready',
        'angular': 'http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.15/angular',
        'angular-route': 'http://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.15/angular-route',
    },

    // angular does not support AMD out of the box, put it in a shim
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular'],
            exports: 'angular-route'
        }
    },

    // kick start application
    deps: ['./bootstrap']
});
