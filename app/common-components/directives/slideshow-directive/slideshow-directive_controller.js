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

			var slideshowAuto = $interval( function(  )
			{
				if ( counter < $scope.slides.length - 1 )
				{
					counter++;
				}
				else
				{
					counter = 0;
				}

				$scope.currentSlide = $scope.slides[counter];

				return $scope.currentSlide;

			}, 2000 );

		}

		$scope.setCurrentSlide = function( slide )
		{
			$interval.cancel(slideshowAuto);

			$scope.currentSlide = slide;
		}

	} );


	console.log( 'SlideShowDirectiveController active!' );

} );