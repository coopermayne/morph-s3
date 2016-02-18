'use strict';

var sectionState = angular.module( 'sectionState' );

sectionState.controller( 'SectionStateController', function( $rootScope, $scope, $state, $stateParams, Project, $http )
{
	console.log( 'SectionStateController active!' );

	$scope.stateName = 'section-state';

	$scope.stateParams = $stateParams;

	// Fetch projects
	if ( $scope.stateParams.section !== 'search' )
	{
		$scope.indexContents = Project.query();
	}
	else
	{
		$http( 
		{
			method: 'GET',
			url: 'https://ancient-peak-41402.herokuapp.com/search',
			params: { q: $scope.stateParams.q }
		} ).then( function( response )
		{
			$scope.indexContents = response.data;
		} );
	}

	$scope.sortingType = $stateParams.sortingType;

	$rootScope.$on( '$stateChangeSuccess', function(  )
	{
		$scope.activeChildNav = $state.current.activeChildNav;
	} );

} );
