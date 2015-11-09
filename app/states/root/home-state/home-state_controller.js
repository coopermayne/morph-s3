'use strict';

var homeState = angular.module( 'homeState' );

homeState.controller( 'HomeStateController', function( $rootScope, $scope )
{
	$scope.stateName = 'home-state';

	console.log( 'HomeStateController active!' );

} );
