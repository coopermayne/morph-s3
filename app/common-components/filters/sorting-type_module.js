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

				case 'a-z':
					items.forEach( function( item ) {
						if( item.title.charAt( 0 ).toLowerCase(  ) === input ) {
							out.push( item );
						}
					} );
					break;

				case 'type':
					items.forEach( function( item ) {
						var lowerCaseTypes = item.types.map(function( type )
						{
							return type.toLowerCase(  );
						} );

						if ( lowerCaseTypes.indexOf( input ) != -1 ) {
							out.push( item );
						}
					} );
					break;

				case 'year':
					var yearArray = input.split( '-' );
					var startYear = parseInt( yearArray[ 0 ] );
					var endYear = parseInt( yearArray[ 1 ] );
					var projectYear;
					items.forEach( function( item ) {
						if( item.constr_edate || item.design_edate )
						{
							var projectYearString = item.constr_edate ? item.constr_edate : item.design_edate;
							projectYear = parseInt( projectYearString.split( '-' )[ 0 ] );
							if ( projectYear >= startYear && projectYear <= endYear  ) {
								out.push( item );
							};
						};
					} );
					break;

				default:
					return items;
			}

			return out;
		}
		else
		{
			return items;
		}
	};
} );
