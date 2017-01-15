'use strict';


var menuResource = angular.module( 'menuResource', [] );

menuResource.factory( 'Menu', function( $resource, $rootScope )
{
	return $resource( $rootScope.apiUrl + 'menu' );

} );
