"use strict";

var mblDirective = angular.module( 'mblDirective', [  ] );

mblDirective.directive( 'mblDirective', function( $timeout )
{
	return {
		restrict: 'AC',
		link: function ( $scope, $elm )
		{
			console.log( 'mblDirective active!' );

			$timeout(function()
			{

				var images = $elm[0].querySelectorAll('[data-mbl]')
				var imageload = mbl(images, { sequential: true, mode: 'background' });

				imageload.start();
			})

		}
	};
} );
