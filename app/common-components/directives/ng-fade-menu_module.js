'use strict';

var fadeMenuDirective = angular.module('ngFadeMenu', [ ] );

fadeMenuDirective.directive( 'ngFadeMenu', function( $timeout, screenSize ) 
{
	return {
		restrict: 'A',
		link: function( scope, element, attr )
		{
			scope.mobile = screenSize.on( 'xs, sm', function( match ){
				scope.mobile = match;
			});

			scope.$watch( 'scope.mobile' );

			if ( !scope.mobile )
			{	
				var timeoutPromise;
				// resetFadeTimeout();
				element.parent(  ).parent(  ).parent(  ).parent(  ).parent(  ).bind( 'mousemove', function( e )
				{
					resetFadeTimeout(  );
				} );

				scope.$watch( 'stateName', function( newValue, oldValue )
				{
					resetFadeTimeout(  );
				} );

				scope.$watch( 'stateParams.section', function( newValue, oldValue )
				{
					resetFadeTimeout(  );
				} );

				function resetFadeTimeout(  )
				{
					element.removeClass( 'hidden' );
					$timeout.cancel( timeoutPromise );
					if ( scope.stateName === "root" || ( scope.stateName === "root.section-state" && scope.stateParams.section !== "news" && scope.stateParams.section !== "search" ) )
					{
						timeoutPromise = $timeout( function ( e )
						{
							element.addClass( 'hidden' );
						}, 3000 );
					}
				}
			}

			
		}
	}
});