'use strict';

var root = angular.module( 'root' );

root.controller( 'RootController', function( $rootScope, $scope, $state, $stateParams )
{
	// This is a controller.

	$scope.stateName = 'root';

	console.log('RootController active!');

	$scope.state = $state;
	
	$scope.activeTopNav = $state.current.activeTopNav;

	$rootScope.$on( '$stateChangeSuccess', function( event, to, toParams, from, fromParams )
	{
		$rootScope.previousState = from;
	} );

} );
