'use strict';

var indexState = angular.module( 'indexState' );

indexState.controller( 'IndexStateController', function( $rootScope, $scope, $state )
{
	console.log( 'IndexStateController active!' );
	$scope.stateName = 'index-state';

	$scope.activeChildNav = $state.current.activeChildNav;

	$rootScope.$on( '$stateChangeSuccess', function(  )
	{
		$scope.activeChildNav = $state.current.activeChildNav;
	} );
} );
