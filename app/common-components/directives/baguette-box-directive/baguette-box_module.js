"use strict";

var ngBaguetteBox = angular.module( 'ngBaguette', [  ] );

ngBaguetteBox.directive( 'ngBaguette', function( $timeout )
{
	return {
		restrict: 'AC',
		link: function ( $scope, $elm )
		{
			$timeout( function(  )
			{
				baguetteBox.run( '.gallery',
				{
					noScrollBars: true,
					animation: 'fadeIn',
					captions: true
				} );
			}, 1000 );
		}
	};
} );
