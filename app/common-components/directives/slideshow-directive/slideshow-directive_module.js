'use strict';

var slideshowDirective = angular.module( 'slideshowDirective',
	[ ] );

slideshowDirective.directive( 'slideshowDirective', function(  )
{
	return {

		restrict: 'E',
		controller: 'SlideshowDirectiveController',
		scope:
		{ 
			slides: '=',
			section: '=',
			frameRate: '=',
			thumb: '=',
			vid: '=',
			news: '='
		},
		templateUrl: 'common-components/directives/slideshow-directive/slideshow-directive_template.html'
		
	};
} );
