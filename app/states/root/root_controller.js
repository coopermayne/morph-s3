'use strict';

var root = angular.module( 'root' );

root.controller( 'RootController', function( $rootScope, $scope, $state )
{
	// This is a controller.

	$scope.stateName = 'root';

	$scope.state = $state;

	$scope.activeTopNav = $state.current.activeTopNav;

	$rootScope.$on( '$stateChangeSuccess', function(  )
	{
		$scope.activeTopNav = $state.current.activeTopNav;
	} );

} );
