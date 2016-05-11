"use strict";

var mblDirective = angular.module( 'mblDirective', [  ] );

mblDirective.directive( 'mblDirective', function( $timeout, $parse )
{
	return {
		restrict: 'AC',
		scope: true,
		link: function ( scope, elm, attrs )
		{
			console.log( 'mblDirective active!' );

			$timeout(function()
			{
				var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
				var sequentialVar;

				if ( w < 500 )
				{
					var mobile = true;
				}

				if ( mobile )
				{
					sequentialVar = true;
				}
				else
				{
					sequentialVar = false
				}

				var images = elm[0].querySelectorAll('[data-mbl]')

				if ( images.length )
				{
					var imageload = mbl(images,
					{ 
						sequential: sequentialVar,
						mode: 'background'
					});

					imageload.start();

					var counter = 0;

					imageload.on('success', function()
					{
						counter++

						if ( counter == 1 )
						{
							console.log('counter=', counter, '! invoking controller function from directive!');
							scope.$apply(attrs.ctrlFn);
						}
					});
				}
				else
				{
					scope.$apply(attrs.ctrlFn);
				}
			})
		}
	};
} );
