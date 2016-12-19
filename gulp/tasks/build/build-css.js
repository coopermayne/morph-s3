'use strict';

var gulp           = require( 'gulp' );
var gutil          = require( 'gulp-util' );
var connect        = require( 'gulp-connect' );
var cache          = require( 'gulp-cached' );

var runSequence    = require( 'run-sequence' );
var mainBowerFiles = require( 'main-bower-files' );

var sass           = require( 'gulp-sass' );
var prefix         = require( 'gulp-autoprefixer' );

var order          = require( 'gulp-order' );
var concat         = require( 'gulp-concat' );
var streamqueue    = require( 'streamqueue' );
var minifyCSS      = require( 'gulp-minify-css' );
var filter         = require( 'gulp-filter' );

var path           = require( '../../paths.js' );
var error          = require( '../../error-handler.js' );



gulp.task( 'build-css', function(  )
{
	return streamqueue( { objectMode: true },

		// select all css files
		gulp.src( path.to.css.source ),

		// Select all sass styles.
		gulp.src( path.to.sass.main )
		.pipe( sass(  ) )
		.on( 'error', error.handler )
		.pipe( prefix( 'last 2 versions', { cascade: true } ) )
		.on( 'error', error.handler ) )

	// Then concatenate and minify.

	.pipe( concat( path.to.main.css.file ) )
	.pipe( minifyCSS(  ) )
	.pipe( gulp.dest( path.to.destination ) );

} );
