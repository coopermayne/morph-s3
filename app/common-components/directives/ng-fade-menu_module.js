'use strict';

var fadeMenuDirective = angular.module('ngFadeMenu', [ ] );

fadeMenuDirective.directive( 'ngFadeMenu', function( $timeout, $rootScope ) 
{
	return {
		restrict: 'A',
		link: function( scope, element, attr )
		{
			if ( $rootScope.mobileAndTabletCheck() === false )
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

				// console.log('mobile/tablet?',$rootScope.mobileAndTabletCheck());

				var resetFadeTimeout = function(  )
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