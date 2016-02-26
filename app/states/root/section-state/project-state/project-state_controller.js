'use strict';

var projectState = angular.module( 'projectState' );

projectState.controller( 'ProjectStateController', function( $rootScope, $scope, $state, $stateParams, Project, $interval )
{

	// This is a controller.
	$scope.stateParams = $stateParams;

	Project.get( { id: $scope.stateParams.projectId } ).$promise.then( function( response )
	{
		$scope.activeProject = response.result;
	} );

	$scope.stateName = 'section-state.project-state';

	console.log( 'ProjectStateController active!' );

	$scope.closeProject = function(  )
	{
		var fromParams = $rootScope.fromParams;

		if ( fromParams.section )
		{
			$state.go( $rootScope.previousState.name, { sortingType: fromParams.sortingType, q: fromParams.q } );
		}
		else
		{
			$state.go( '^' );
		}
	}


} );
