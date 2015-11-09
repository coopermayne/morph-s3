'use strict';

var projectState = angular.module( 'projectState' );

projectState.controller( 'ProjectStateController', function( $rootScope, $scope, $state, $stateParams )
{

	// This is a controller.
	$scope.stateParams = $stateParams;

	$scope.stateName = 'index-state.project-state';

	console.log( 'ProjectStateController active!' );

} );
