'use strict';

var gulp        = require( 'gulp' );
var requireDir  = require( 'require-dir' );
var runSequence = require( 'run-sequence' );

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

gulp.task( 'publish-mobile', function(  )
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
		'launch-mobile'
	);
} );
