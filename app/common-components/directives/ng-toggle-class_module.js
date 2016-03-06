'use strict';

var ngToggleClassDirective = angular.module( 'ngToggleClass', [  ] );

ngToggleClassDirective.directive( 'ngToggleClass', function( $timeout )
{
	return {
		restrict: 'A',
		link: function ( scope, element, attr )
		{
			element.bind( 'click', function( event )
			{
				event.stopPropagation(  );
				element.toggleClass( attr.ngToggleClass );
			} );
		}
	}
} );