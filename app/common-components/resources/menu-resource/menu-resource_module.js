'use strict';


var menuResource = angular.module( 'menuResource', [] );

menuResource.factory( 'Menu', function( $resource )
{
	return $resource( 'https://morphosisapi.herokuapp.com/menu' );

} );
