'use strict';

var gulp     = require( 'gulp' );
var connect  = require( 'gulp-connect' );
var cache    = require( 'gulp-cached' );

var sass     = require( 'gulp-sass' );
var prefix   = require( 'gulp-autoprefixer' );

var scsslint = require( 'gulp-scss-lint' );
var csscomb  = require( 'gulp-csscomb' );

var path     = require( '../../paths.js' );
var error    = require( '../../error-handler.js' );

var streamqueue = require('streamqueue');



gulp.task( 'csscomb', function (  )
{
	return gulp.src( path.to.sass.source )
		.pipe( cache( 'csscomb' ) )
		.pipe( csscomb(  ) )
		.on( 'error', error.handler )
		.pipe( gulp.dest( './app' ) );
} );

gulp.task( 'scss-lint', [ 'csscomb' ], function(  )
{
	return gulp.src( path.to.sass.source )
		.pipe( scsslint( { config: 'scss-linting-config.yml' } ) )
		.on( 'error', error.handler );
} );

gulp.task( 'sass', [ 'scss-lint' ], function(  )
{
		// select all vendor/css files
		gulp.src( path.to.css.source )
		.pipe( gulp.dest( path.to.sass.destination ) )

		return gulp.src( path.to.sass.main )
		.pipe( sass(  ) )
		.on( 'error', error.handler )
		.pipe( prefix( 'last 2 versions', { cascade: true } ) )
		.on( 'error', error.handler )

		.pipe( gulp.dest( path.to.sass.destination ) )
		.pipe( connect.reload(  ) )
} );

