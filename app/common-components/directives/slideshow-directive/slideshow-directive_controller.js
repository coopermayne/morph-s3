'use strict';

var slideshowDirective = angular.module( 'slideshowDirective' );


slideshowDirective.controller( 'SlideshowDirectiveController', function( $rootScope, $scope, $state, $stateParams, screenSize, $attrs, $element )
{

	$scope.$watch( 'slides', function( newValue )
	{
	    if ( newValue !== undefined )
	    {
	        console.log( 'slides loaded: ' + $scope.slides );
	    }
	} );

	console.log( 'SlideShowDirectiveController active!' );

} );