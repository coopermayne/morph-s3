'use strict';

var indexState = angular.module( 'indexState' );

indexState.controller( 'IndexStateController', function( $rootScope, $scope, $state, $stateParams, Project )
{
	console.log( 'IndexStateController active!' );
	$scope.stateName = 'index-state';

	$scope.projects = Project.query();

	$scope.activeChildNav = $state.current.activeChildNav;

	$scope.stateParams = $stateParams;

	$rootScope.$on( '$stateChangeSuccess', function(  )
	{
		$scope.activeChildNav = $state.current.activeChildNav;
	} );
} );
