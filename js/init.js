requirejs.config({
    baseUrl: 'js',
    paths  : {
        'web'     : 'app/web',
        'webFrag' : 'app/webFrag'
    }
});

requirejs(['app/main']);