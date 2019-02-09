'use strict';

var sortingTypeFilter = angular.module( 'sortingTypeFilter', [  ] );

sortingTypeFilter.filter( 'sortingType', function(  )
{
	return function( items, type, input )
	{
		if( input && items )
		{
			var out = [  ];

			switch( type )
			{
        //case 'leadership':
					//items.forEach( function( item ) {
            //out.push( item)
          //})
          //break;

				case 'a-z':
					items.forEach( function( item ) {

						var firstChar = item.title.charAt( 0 );

						if ( input === 'num' )
						{
							if( parseInt( firstChar ) )
							{
								out.push( item );
							}
						}
						else
						{
							if( firstChar.toLowerCase(  ) === input )
							{
								out.push( item );
							}
						}
					} );
					break;
					
        case 'people':
          if( input == "leadership"){
            items.forEach( function( item ) {
              if( item.is_leadership ) {
                out.push( item );
              }
            } );
          } else {
            items.forEach( function( item ) {
              if( item.is_associate ) {
                out.push( item );
              }
            } );
          }
          break;

				case 'type':
          items.forEach( function( item){
            if( item.types.map(function(item){return item.toLowerCase()}).indexOf(input) !== -1){
              out.push ( item )
            }
          })

          break;

				case 'media':
					items.forEach( function( item ) {
            out.push( item );
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
