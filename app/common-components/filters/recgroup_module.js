'use strict';

var recGroupFilter = angular.module( 'recGroupFilter', [  ] );

recGroupFilter.filter( 'recGroup', function(  )
{
	return function( items )
	{
		if( items )
		{
			return items.reverse(  );
		}
		else
		{
			return;
		}
	};
} );
