(function (global) {

    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // 'dist',
        'rxjs': 'lib/rxjs/',
        // 'rxjs/Subject': 'lib/rxjs/bundles',
        // 'rxjs/Rx': 'lib/rxjs/bundles',
        // 'rxjs/Observable': 'lib/rxjs/bundles',
        // 'rxjs/observable/PromiseObservable': 'lib/rxjs/bundles',
        // 'rxjs/observable/of': 'lib/rxjs/bundles',
        // 'rxjs/observable/forkJoin': 'lib/rxjs/bundles',
        // 'rxjs/observable/fromPromise': 'lib/rxjs/bundles',
        // 'rxjs/BehaviorSubject': 'lib/rxjs/bundles',
        // 'rxjs/operator/toPromise': 'lib/rxjs/bundles',
        // 'rxjs/add/operator/do': 'lib/rxjs/bundles',
        // 'rxjs/add/operator/delay': 'lib/rxjs/bundles',
        // 'rxjs/add/operator/map': 'lib/rxjs/bundles',
        // 'rxjs/add/operator/mergeMap': 'lib/rxjs/bundles',
        // 'rxjs/add/operator/mergeAll': 'lib/rxjs/bundles',
        // 'rxjs/add/operator/reduce': 'lib/rxjs/bundles',
        // 'rxjs/add/operator/toPromise': 'lib/rxjs/bundles',
        // 'rxjs/add/operator/every': 'lib/rxjs/bundles',
        // 'rxjs/add/observable/from': 'lib/rxjs/bundles',
        // 'rxjs/add/observable/forkJoin': 'lib/rxjs/bundles',
        // 'rxjs/add/observable/of': 'lib/rxjs/bundles',
        // 'rxjs/add/observable/throw': 'lib/rxjs/bundles',
        '@angular': 'lib/@angular',
        'primeui': 'lib/primeui',
        'primeng': 'lib/primeng',
        'es6-shim': 'lib/es6-shim/es6-shim.min.js',
        'zone': 'lib/zone.js/dist/zone.js',
        'reflect-metadata': 'lib/reflect-metadata/Reflect.js'
    };

    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'app': {main: 'main.js', defaultExtension: 'js'},
        'rxjs': {defaultExtension: 'js'},
        'primeui': {defaultExtension: 'js'},
        'primeng': {defaultExtension: 'js'},
        'es6-shim': {defaultExtension: 'js'},
        'zone': {defaultExtension: 'js'},
        'reflect-metadata': {defaultExtension: 'js'}
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