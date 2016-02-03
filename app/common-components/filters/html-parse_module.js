'use strict';

var htmlParseFilter = angular.module( 'htmlParseFilter', [  ] );

htmlParseFilter.filter( 'htmlParse', function( $sce )
{
	return function( html )
	{
		return $sce.trustAsHtml( html );
	};
} );
