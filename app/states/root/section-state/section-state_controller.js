'use strict';

var sectionState = angular.module( 'sectionState' );

sectionState.controller( 'SectionStateController', function( $rootScope, $scope, $state, $stateParams, Project )
{
	console.log( 'SectionStateController active!' );

	$scope.stateName = 'section-state';

	// Fetch all projects
	$scope.projects = Project.query();

	// Set the active project
	$scope.toggleActive = function( project )
	{
		$scope.activeProject = project;
	};

	// $scope.activeChildNav = $state.current.activeChildNav;

	$scope.stateParams = $stateParams;

	console.log( $stateParams );

	$rootScope.$on( '$stateChangeSuccess', function(  )
	{
		$scope.activeChildNav = $state.current.activeChildNav;
	} );

} );
