'use strict';

var parentState2 = angular.module( 'parentState2' );

parentState2.controller( 'ParentState2Controller', function( $rootScope, $scope )
{

	// This is a controller.

	$scope.isControllerActive = 'yes';

	console.log( 'ParentState2Controller active!' );

} );