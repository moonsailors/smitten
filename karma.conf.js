module.exports = function(config){
  config.set({
     // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "./",

    // testing frameworks to use
    frameworks: [
      'jasmine',
      'mocha',
      'chai'
    ],

    // list of files to exclude
    exclude: [
      'karma.conf.js'
    ],

    files: [
      // angular source
      'build/lib/rxjs/bundles/Rx.umd.min.js',
      'build/lib/@angular/common/bundles/common.umd.min.js',
      'build/lib/@angular/compiler/bundles/compiler.umd.min.js',
      'build/lib/@angular/core/bundles/core.umd.min.js',
      'build/lib/@angular/forms/bundles/forms.umd.min.js',
      'build/lib/@angular/http/bundles/http.umd.min.js',
      'build/lib/@angular/platform-browser/bundles/platform-browser.umd.min.js',
      'build/lib/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
      'build/lib/@angular/router/bundles/router.umd.min.js',
      'build/lib/bootstrap/dist/js/bootstrap.min.js',
      "build/lib/es6-shim/es6-shim.min.js",
      // app code
      'build/app/**/*.js',
      //server code
      'server/**/*.js',
      'index.js',
      // test files
      'test/*.js'
    ],

    // test results reporter to use
    reporters: [
      'nyan',
      'unicorn'
    ],

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers. PhantomJS will load up in the background
    browsers: [
      'Chrome'
    ],

    // if true, Karma exits after running the tests.
    singleRun: true,
    // any additional plugins needed for testing
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-nyan-reporter',
      'karma-unicorn-reporter'
    ]
  })
};