'use strict';

var slideshowDirective = angular.module( 'slideshowDirective' );


slideshowDirective.controller( 'SlideshowDirectiveController', function( $rootScope, $scope, $state, $stateParams, $interval )
{

	var counter = -1;

	$scope.stateParams = $stateParams;
	$scope.state = $state;

	$scope.$watch( 'slides', function( apiResponse )
	{

		if ( apiResponse !== undefined )
		{

			var slideshowAuto = $interval( function(  )
			{
				if ( counter < $scope.slides.length - 1 )
				{
					counter++;
				}
				else
				{
					counter = -1;
				}


				return $scope.currentSlide = $scope.slides[counter];

			}, $scope.frameRate || 2000 );

		}

		// Control buttons
		$scope.setCurrentSlide = function( slide )
		{
			$interval.cancel( slideshowAuto );

			$scope.currentSlide = slide;
		}


		// Reset counter on state change
		$rootScope.$on( '$stateChangeStart', 
			function( event, unfoundState, fromState, fromParams )
		{ 
			return counter = -1;
		});

	} );


	console.log( 'SlideShowDirectiveController active!' );

} );