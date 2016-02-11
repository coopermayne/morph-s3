'use strict';

var slideshowDirective = angular.module( 'slideshowDirective' );


slideshowDirective.controller( 'SlideshowDirectiveController', function( $rootScope, $scope, $state, $stateParams, $interval )
{

	var counter = 0;

	$scope.stateParams = $stateParams;

	$scope.$watch( 'slides', function( newValue )
	{

		if ( newValue !== undefined )
		{

			$interval( function(  )
			{
				if ( counter < $scope.slides.length - 1 )
				{
					counter++;
				}
				else
				{
					counter = 0;
				}
			}, 5000 );

		}

		$scope.getCurrentSlide = function(  )
		{
			return $scope.slides[counter];
		}

		$scope.$watch( counter );

	} );


	console.log( 'SlideShowDirectiveController active!' );

} );