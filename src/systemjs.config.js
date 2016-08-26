(function (global) {

    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        'rxjs': 'lib/rxjs/',
        '@angular': 'lib/@angular',
        'primeui': 'lib/primeui',
        'primeng': 'lib/primeng',
        'es6-shim': 'lib/es6-shim/es6-shim.min.js',
        'zone': 'lib/zone.js/dist/zone.js',
        'reflect-metadata': 'lib/reflect-metadata/Reflect.js',
        'ng2-charts': 'lib/ng2-charts/',
        'chart.js': 'lib/chart.js'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': {main: 'main.js', defaultExtension: 'js'},
        'rxjs': {defaultExtension: 'js'},
        'primeui': {defaultExtension: 'js'},
        'primeng': {defaultExtension: 'js'},
        'es6-shim': {defaultExtension: 'js'},
        'zone': {defaultExtension: 'js'},
        'reflect-metadata': {defaultExtension: 'js'},
        'ng2-charts': {defaultExtension: 'js'},
        'chart.js': {defaultExtension: 'js'}
    };

    var packageNames = [
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/forms',
        '@angular/http',
        '@angular/platform-browser',
        '@angular/platform-browser-dynamic',
        '@angular/router',
        '@angular/router-deprecated',
        '@angular/testing',
        '@angular/upgrade'
    ];

    // add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
    packageNames.forEach(function (pkgName) {
        var name = pkgName.substring(9);
        var index = 'bundles/' + name + '.umd.min.js';
        packages[pkgName] = {main: index , defaultExtension: 'js'};
    });

    var config = {
        map: map,
        packages: packages
    };

    // filterSystemConfig - index.html's chance to modify config before we register it.
    if (global.filterSystemConfig) {
        global.filterSystemConfig(config);
    }

    System.config(config);

})(this);