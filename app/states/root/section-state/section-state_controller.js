'use strict';

var sectionState = angular.module( 'sectionState' );

sectionState.controller( 'SectionStateController', function( $rootScope, $scope, $state, $stateParams, Project, $http )
{
	console.log( 'SectionStateController active!' );

	$scope.stateName = 'section-state';

	$scope.stateParams = $stateParams;

	$scope.sortingType = $stateParams.sortingType;

	var apiUrl = 'https://ancient-peak-41402.herokuapp.com/';

	$rootScope.$on('$locationChangeStart', function( event, next, current )
	{
		var re = /http:\/\/[\w\.\:]*\/(\w*)\/([\w-]*)(\?q=([\w-]*))?/;
		var reArray = next.match( re );

		$scope.stateParams.q = next.split( 'q=' )[ 1 ];
		$scope.stateParams.sortingType = reArray[ 2 ];
		$scope.stateParams.q = reArray[ 4 ];

	} );

	$scope.altIndexSection = function(  )
	{
		if ( 'media, awards, search, research, news'.indexOf( $stateParams.sortingType || $stateParams.section) != -1 )
		{
			return true;
		} else
		{
			return false;
		}
	}


	// Fetch index contents based on section parameter
	switch( $scope.stateParams.section )
	{
		// Morphosis
		case 'about':

			// Populate with different content based on sortingType parameter
			switch( $scope.stateParams.sortingType )
			{
				case 'media':
					$http(
					{
						method: 'GET',
						url: apiUrl + 'media.json'
					} ).then( function( response )
					{
						$scope.indexContents = response.data;
					} );
					break;

				case 'people':
					$http(
					{
						method: 'GET',
						url: apiUrl + 'people.json'
					} ).then( function( response )
					{
						$scope.indexContents = response.data.array;
					} );
					break;

				case 'awards':
					$http(
					{
						method: 'GET',
						url: apiUrl + 'awards.json'
					} ).then( function( response )
					{
						$scope.indexContents = response.data;
					} );
					break;
			}
			break;

		// News
		case 'news':
			$http( 
			{
				method: 'GET',
				url: apiUrl + 'news_items.json'
			} ).then( function( response )
			{
				$scope.indexContents = response.data;
			} );
			break;

		// Search
		case 'search':
			$http( 
			{
				method: 'GET',
				url: apiUrl + 'search',
				params: { q: $scope.stateParams.q }
			} ).then( function( response )
			{
				$scope.indexContents = response.data;
			} );
			break;

		// Projects
		default:
			$scope.indexContents = Project.query();
			break;
	}

	$rootScope.$on( '$stateChangeSuccess', function(  )
	{
		$scope.activeChildNav = $state.current.activeChildNav;
	} );

} );
