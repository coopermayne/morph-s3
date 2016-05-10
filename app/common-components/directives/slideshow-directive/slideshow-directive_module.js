'use strict';

var slideshowDirective = angular.module( 'slideshowDirective',
	[ 
		'mblDirective'
 	] );

slideshowDirective.directive( 'slideshowDirective', function(  )
{
	return {

		restrict: 'E',
		controller: 'SlideshowDirectiveController',
		scope:
		{ 
			slides: '=',
			frameRate: '=',
			thumb: '=',
			vid: '=',
			news: '='
		},
		templateUrl: 'common-components/directives/slideshow-directive/slideshow-directive_template.html'
		
	};
} );
