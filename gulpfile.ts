"use strict";

const gulp = require("gulp");
const del = require("del");
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");
const tslint = require('gulp-tslint');
const injectModules = require('gulp-inject-modules');
const mocha = require('gulp-mocha');
const Builder = require('systemjs-builder');

/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
    return del(["build"], cb);
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src("src/**/*.ts")
        .pipe(tslint({
            formatter: "verbose"
        }))
        .pipe(tslint.report());
});

/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compile", ["tslint"], () => {
    let tsResult = gulp.src("src/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));
    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("build"));
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", () => {
    return gulp.src(["src/**/*", "!**/*.ts"])
        .pipe(gulp.dest("build"))
        .pipe(injectModules());
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
    return gulp.src([
            'es6-shim/es6-shim.min.js',
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'reflect-metadata/Reflect.js',
            'rxjs/**',
            'zone.js/dist/**',
            '@angular/common/bundles/common.umd.min.js',
            '@angular/compiler/bundles/compiler.umd.min.js',
            '@angular/core/bundles/core.umd.min.js',
            '@angular/forms/bundles/forms.umd.min.js',
            '@angular/http/bundles/http.umd.min.js',
            '@angular/platform-browser/bundles/platform-browser.umd.min.js',
            '@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
            '@angular/router/bundles/router.umd.min.js',
            'socket.io-client/socket.io.js',
            'primeng/**',
            'primeui/**',
            'ng2-charts/**',
            'chart.js/**'
        ], {cwd: "node_modules/**"}) /* Glob required here. */
        .pipe(gulp.dest("build/lib"));
});

gulp.task("test", () => {
    gulp.src('test/*.js', {read:false})
        .pipe(mocha({reporter: 'nyan'}))
        .once('end', () => process.exit());
});

gulp.task('bundle', ['compile', 'resources', 'libs'], () => {
    var builder = new Builder('build/', 'build/systemjs.config.js');

    /*
       the parameters of the below buildStatic() method are:
           - your transcompiled application boot file (the one wich would contain the bootstrap(MyApp, [PROVIDERS]) function - in my case 'dist/app/boot.js'
           - the output (file into which it would output the bundled code)
           - options {}
    */
    return builder
        .buildStatic('app/main.js', 'build/bundle.js', { minify: false, sourceMaps: true})
        .then(function() {
            console.log('Build complete');
        })
        .catch(function(err) {
            console.log('Build error');
            console.log(err);
        });
});

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
    gulp.watch(["src/**/*.ts"], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
    gulp.watch(["src/**/*.html", "src/**/*.css"], ['resources']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
});

/**
 * Build the project.
 */

gulp.task("build", ['bundle'], () => {
    console.log("Building the project ...");
});