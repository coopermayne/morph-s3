'use strict';

var projectState = angular.module( 'projectState' );

projectState.controller( 'ProjectStateController', function( $rootScope, $scope )
{

	// This is a controller.

	$scope.stateName = 'index-state.project-state';

	console.log( 'ProjectStateController active!' );

} );
