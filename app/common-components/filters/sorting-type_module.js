'use strict';

var sortingTypeFilter = angular.module( 'sortingTypeFilter', [  ] );

sortingTypeFilter.filter( 'sortingType', function(  )
{
	return function( items, type, input )
	{
		if( input )
		{
			var out = [  ];

			switch( type ) {

				case 'alphabetical':
					items.forEach( function( item ) {
						if( item.title.charAt( 0 ).toLowerCase(  ) == input ) {
							out.push( item );
						}
					} );
					break;

				case 'type':
					var types = [ 'commercial', 'office', 'culture', 'education%20%26%20health', 'residential', 'multi-family', 'private%20residence', 'government' ]
					items.forEach( function( item ) {
						if ( types.indexOf( input ) === item.type ) {
							out.push( item );
						}
					} )
					break;

				case 'year':
					var yearArray = input.split('-');
					var startYear = parseInt(yearArray[0]);
					var endYear = parseInt(yearArray[1]);
					items.forEach( function( item ) {
						var projectYear = parseInt(item.year.split('-')[0]);
						if ( projectYear >= startYear && projectYear <= endYear  ) {
							out.push( item );
						}
					} );
					break;
			}

			return out;

			// if( type === 'alphabetical' ){
			// 	var out = [  ];
			// 		items.forEach( function( item ) {
			// 			if( item.title.charAt( 0 ).toLowerCase(  ) == input ) {
			// 				out.push( item );
			// 			}
			// 		});
			// 	return out;
			// } else {			
			// 	return items.slice(  ).reverse(  );
			// }
		}
		else
		{
			return items;
		}
	};
} );
