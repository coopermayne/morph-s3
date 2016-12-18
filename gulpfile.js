'use strict';

var gulp        = require( 'gulp' );
var requireDir  = require( 'require-dir' );
var runSequence = require( 'run-sequence' );
var templateCache = require('gulp-angular-templatecache');

requireDir( './gulp/tasks', { recurse: true } );

gulp.task( 'default', function(  )
{
	runSequence(
		'clean',
		[
			'sass',
			'scripts',
			'jade',
			'images',
			'fonts'
		],
		'bower-files',
		'inject',
		'connect',
		'watch'
	);
} );


gulp.task('tmpc', function () {
  return gulp.src([ 'build-destination/**/*.html', '!build-destination/index.html' ])
    .pipe(templateCache())
    .pipe(gulp.dest('app/tmps'));
});

gulp.task( 'build', function(  )
{
	runSequence(
		'clean',
		[
			'build-images',
			'build-scripts',
			'build-css',
			'build-fonts'
		],
		'jade',
		'build-inject',
		'build-html',
		'connect'
	);
} );

gulp.task( 'publish', function(  )
{
	runSequence(
		'clean',
		[
			'build-images',
			'build-scripts',
			'build-css',
			'build-fonts'
		],
		'jade',
		'build-inject',
		'build-html',
		'launch'
	);
} );
