'use strict';

var homeState = angular.module( 'homeState' );

homeState.controller( 'HomeStateController', function( $rootScope, $scope, $stateParams )
{
	$scope.stateName = 'home-state';

	$scope.stateParams = $stateParams;

	console.log( 'HomeStateController active!' );

} );
