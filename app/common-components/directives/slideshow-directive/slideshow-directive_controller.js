'use strict';

var slideshowDirective = angular.module( 'slideshowDirective' );


slideshowDirective.controller( 'SlideshowDirectiveController', function( $rootScope, $scope, $state, $stateParams, $interval, screenSize, $timeout, $element )
{

	var counter = 0;

	$scope.stateParams = $stateParams;
	$scope.state = $state;

	// Check for desktop/mobile
	$scope.mobile = screenSize.on( 'xs, sm', function( match )
	{
		$scope.mobile = match;
	});

	$scope.$watch( 'slides', function( apiResponse )
	{

		if ( apiResponse !== undefined )
		{
			$scope.currentSlide = $scope.slides[ 0 ];

			if ( $scope.vid )
			{
				$timeout( function(  )
				{
					var videoElements = angular.element( $element )[ 0 ].getElementsByTagName( 'video' );

					console.log( videoElements );

					if ( videoElements.length )
					{
						for ( var i = 0; i < videoElements.length; i++ )
						{
							// Load next video when current video starts playing
							angular.element( videoElements[ i ] ).bind( 'playing', function(  )
							{
								var videoIndex = parseInt( angular.element( this ).attr( 'data-video-id' ) );

								if( videoIndex + 1 < videoElements.length )
								{
									videoElements[ videoIndex + 1 ].load(  );
								}
								else
								{
									videoElements[ 0 ].load(  );
								}
								console.log( 'playing video: ', videoIndex, 'loading video: ', videoIndex + 1 );
							} )

							// Switch to next video when current video finished playing
							angular.element( videoElements[ i ] ).bind( 'ended', function(  )
							{
								var videoIndex = parseInt( angular.element( this ).attr( 'data-video-id' ) );

								if ( videoIndex + 1 < videoElements.length )
								{					
									videoElements[ videoIndex + 1 ].play(  );
									$scope.currentSlide = $scope.slides[ videoIndex + 1 ];
									$scope.$apply(  );
								}
								else
								{
									videoElements[ 0 ].play(  );
									$scope.currentSlide = $scope.slides[ 0 ];
									$scope.$apply(  );
								}
								console.log( 'switching video' );
							} );
						}
					}
					
					videoElements[ 0 ].load(  );
					videoElements[ 0 ].play(  );
				}, 0 );
			}
			else
			{
				console.log( 'image slideshow' )
				var playSlideShow = $interval( function(  )
				{
					if ( counter < $scope.slides.length - 1 )
					{
						counter++;
					}
					else
					{
						counter = 0;
					}

					return $scope.currentSlide = $scope.slides[ counter ];

				}, $scope.frameRate || 2000 );
			}
		}
	} );

	// Control buttons
	$scope.setCurrentSlide = function( slide )
	{
		$interval.cancel( playSlideShow );

		$scope.currentSlide = slide;
	}


	// Reset counter on state change
	$rootScope.$on( '$stateChangeStart', function( event, unfoundState, fromState, fromParams )
	{ 
		return counter = -1;
	});

	console.log( 'SlideShowDirectiveController active!' );

} );
