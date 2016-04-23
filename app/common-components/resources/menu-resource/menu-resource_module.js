'use strict';


var menuResource = angular.module( 'menuResource', [] );

menuResource.factory( 'Menu', function( $resource )
{
	return $resource( 'https://ancient-peak-41402.herokuapp.com/menu' );

} );
