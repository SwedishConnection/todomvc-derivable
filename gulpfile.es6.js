import gulp from 'gulp';
import runSequence from 'run-sequence';
import del from 'del';
import concat from 'gulp-concat';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import {log as logger} from 'gulp-util';

const dependencies = Object
    .getOwnPropertyNames(
        require('./package.json').dependencies
    )
    .filter( x => {
        return x !== 'todomvc-app-css';
    });


gulp.task('clean', () => {
    del(
        ['dist/*']
    )
    .then(
        (paths) => {
            logger(
                `Deleted files and folders [${paths}]`
            );
        }
    );
});

gulp.task('entry', () => {
    return gulp
        .src(
            ['index.html']
        )
        .pipe(
            gulp.dest('dist')
        );
});

gulp.task('styles', () => {
    return gulp
        .src(
            [ 'node_modules/todomvc-common/base.css', 'node_modules/todomvc-app-css/index.css' ]
        )
        .pipe(
            concat('vendor.css')
        )
        .pipe(
            gulp.dest('dist')
        );
});

gulp.task('vendor', () => {

    let b = browserify({
        debug: true
    });

    dependencies
        .forEach( x => {
            b.require(x);
        });

    return b
        .transform(
            babelify,
            { presets: [ 'es2015' ] }
        )
        .bundle()
        .pipe(
            source('vendor.js')
        )
        .pipe(
            gulp.dest('dist')
        );
});

gulp.task('bundle', () => {
    let b = browserify({
        entries: './js/Derivable.jsx',
        extensions: ['.jsx'],
        debug: true
    });

    dependencies
        .forEach( x => {
            b.external(x);
        });

    return b
        .transform(
            babelify,
            { presets: [ 'es2015', 'react' ] }
        )
        .bundle()
        .pipe(
            source('bundle.js')
        )
        .pipe(
            gulp.dest('dist')
        );
});

gulp.task('default', (cb) => {
    runSequence(
        'clean',
        ['entry', 'styles', 'vendor', 'bundle']
    );
});