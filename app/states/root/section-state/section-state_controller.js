'use strict';

var sectionState = angular.module( 'sectionState' );

sectionState.controller( 'SectionStateController', function( $rootScope, $scope, $state, $stateParams, Project )
{
	console.log( 'SectionStateController active!' );

	$scope.stateName = 'section-state';

	$scope.stateParams = $stateParams;

	// Fetch projects
	if ( $scope.stateParams.section !== 'news' || '' )
	{
		$scope.indexContents = Project.query();
	};
	// else if ( $scope.stateParams.section = 'news' )
	// {
	// 	// $scope.indexContents = News.query();
	// } else if ( $scope.stateParams.section = '' )
	// {
	// 	if ( $stateParams.sortingType = 'people' )
	// 	{
	// 		// $scope.indexContents = People.query();
	// 	}
	// 	else if ( $stateParams.sortingType = 'awards')
	// 	{
	// 		// $scope.indexContents = Awards.query();
	// 	} else if ( $stateParams.sortingType = 'media' )
	// 	{
	// 		// $scope.indexContents = Media.query();
	// 	}
	// }

	console.log($scope.stateParams);

	$scope.sortingType = $stateParams.sortingType;

	$rootScope.$on( '$stateChangeSuccess', function(  )
	{
		$scope.activeChildNav = $state.current.activeChildNav;
	} );

} );
