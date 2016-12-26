'use strict';

var AWS = require('aws-sdk');
var merge = require('merge-stream');
var gulp  = require( 'gulp' );
var path   = require( '../../paths.js' );
var awspublish = require('gulp-awspublish')

gulp.task('launch', function(){
	var publisher = awspublish.create({
		params: {
			Bucket: "noon.morphosis.com"
		},
		credentials: new AWS.SharedIniFileCredentials({profile: 'morph'})
	})

	var headers = {
		'Cache-Control': 'max-age=1, no-transform, public'
	};

	var gzip = gulp.src([
    'build-destination/**/*.js',
    'build-destination/**/*.html',
    'build-destination/**/*.css'
  ]).pipe(awspublish.gzip({ext: ''}));

	var plain = gulp.src([
    'build-destination/**/*',
    '!build-destination/**/*.js',
    '!build-destination/**/*.html',
    '!build-destination/**/*.css'
  ]);

	return merge(gzip, plain)
		.pipe(publisher.publish(headers))
		.pipe(publisher.sync())
		.pipe(awspublish.reporter());

})

gulp.task('launch-live', function(){
	var publisher = awspublish.create({
		params: {
			Bucket: "www.morphosis.com"
		},
		credentials: new AWS.SharedIniFileCredentials({profile: 'morph'})
	})

	var headers = {
		'Cache-Control': 'max-age=1, no-transform, public'
	};

	var gzip = gulp.src([
    'build-destination/**/*.js',
    'build-destination/**/*.html',
    'build-destination/**/*.css'
  ]).pipe(awspublish.gzip({ext: ''}));

	var plain = gulp.src([
    'build-destination/**/*',
    '!build-destination/**/*.js',
    '!build-destination/**/*.html',
    '!build-destination/**/*.css'
  ]);

	return merge(gzip, plain)
		.pipe(publisher.publish(headers))
		.pipe(publisher.sync())
		.pipe(awspublish.reporter());

})
