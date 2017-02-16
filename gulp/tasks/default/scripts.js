'use strict';

var gulp            = require( 'gulp' );
var gutil           = require( 'gulp-util' );
var connect         = require( 'gulp-connect' );
var cache           = require( 'gulp-cached' );
var merge           = require( 'merge-stream' );

var path            = require( '../../paths.js' );
var error           = require( '../../error-handler.js' );



gulp.task( 'scripts', function(  )
{
	return gulp.src( path.to.scripts.source )
		.pipe( cache( 'scripts' ) )
		.pipe( gulp.dest( path.to.destination ) );
} );
