'use strict';

var menuDirective = angular.module( 'menuDirective' );

menuDirective.controller( 'MenuDirectiveController', function( $rootScope, $scope )
{

	// This is a controller.

	$scope.menuItems = ['Architecture', 'Urban Design', 'Tangents', 'Research', 'Media', 'News'];

	$scope.stateName = 'page-one';

	console.log( 'menuDirective Controller active!' );

} );
