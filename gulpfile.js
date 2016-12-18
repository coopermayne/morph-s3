'use strict';

var gulp        = require( 'gulp' );
var requireDir  = require( 'require-dir' );
var runSequence = require( 'run-sequence' );
var templateCache = require('gulp-angular-templatecache');

requireDir( './gulp/tasks', { recurse: true } );

gulp.task('templatecache', function () {
  return gulp.src([ 'build-destination/**/*.html', '!build-destination/index.html' ])
    .pipe(templateCache())
    .pipe(gulp.dest('app/templates'));
});

gulp.task( 'build', function(  )
{
	runSequence(
		'clean',
		[
			'build-scripts',
			'build-images',
			'build-css',
			'build-fonts'
		],
		'jade',
		'build-inject',
		'build-html'
	);
} );

gulp.task( 'buildc', function(  )
{
	runSequence(
		'build',
		'connect'
	);
} );

gulp.task( 'publish', function(  )
{
	runSequence(
		'build',
		'launch'
	);
} );

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

