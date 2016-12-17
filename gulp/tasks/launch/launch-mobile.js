'use strict';

var merge = require('merge-stream');
var gulp  = require( 'gulp' );
var path   = require( '../../paths.js' );
var awspublish = require('gulp-awspublish')

gulp.task('launch-mobile', function(){
	var publisher = awspublish.create({
		region: 'us-east-1',
		params: {
			Bucket: "m.morphosis.com"
		}
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
