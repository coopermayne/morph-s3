'use strict';


var menuResource = angular.module( 'menuResource', [] );

menuResource.factory( 'Menu', function( $resource )
{
	return $resource( 'menu.json' );

} );
