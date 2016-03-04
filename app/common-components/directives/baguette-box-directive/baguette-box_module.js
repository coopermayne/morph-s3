"use strict";

var ngBaguetteBox = angular.module( 'ngBaguette', [  ] );

ngBaguetteBox.directive( 'ngBaguette', function( $timeout )
{
	return {
		restrict: 'AC',
		link: function ( $scope, $elm )
		{
			console.log( 'ngBaguette here!' );

			$timeout( function(  )
			{
				baguetteBox.run( '.gallery' );
			}, 2000 );
		}
	};
} );
