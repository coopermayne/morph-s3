'use strict';

var sectionState = angular.module( 'sectionState' );

sectionState.controller( 'SectionStateController', function( $rootScope, $scope, $state, $stateParams, Project )
{
	console.log( 'SectionStateController active!' );

	$scope.stateName = 'section-state';

	// Fetch all projects
	$scope.projects = Project.query();

	$scope.stateParams = $stateParams;

	$scope.sortingType = $stateParams.sortingType;

	$rootScope.$on( '$stateChangeSuccess', function(  )
	{
		$scope.activeChildNav = $state.current.activeChildNav;
	} );

} );
