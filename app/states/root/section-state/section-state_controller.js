'use strict';

var sectionState = angular.module( 'sectionState' );

sectionState.controller( 'SectionStateController', function( $rootScope, $scope, $state, $stateParams, Project, $http, $location, $anchorScroll, $timeout )
{
	console.log( 'SectionStateController active!' );

	$scope.stateName = 'section-state';

	$scope.sortingType = $stateParams.sortingType;

	$scope.stateParams = $state.params;

	$scope.altIndexSection = false;

	$scope.expandedItem = function( itemId )
	{
		return $location.hash(  ) == itemId ? true : false;
	}

	$scope.openItem = function( itemId )
	{	if ( $scope.expandedItem( itemId ) )
		{
			$location.hash( null );
		}
		else
		{
			var el = document.getElementById( itemId )
			console.log( el.scrollTop );
			$location.hash( itemId );
			console.log( el.scrollTop );
		}
	}

	$timeout( function(  )
	{
		var expandable = document.getElementById( $location.hash() );
		var hash = $location.hash(  );
		$anchorScroll( hash );
	}, 500 );

	$scope.setAltIndex = function( input )
	{
		if ( 'media, awards, search, research, news'.indexOf( input ) != -1 )
		{
			$scope.altIndexSection = true;
		}
		else
		{
			$scope.altIndexSection = false;
		}
	}

	var apiUrl = 'https://ancient-peak-41402.herokuapp.com/';

	$scope.getResource = function( sectionTitle )
	{
		$scope.setAltIndex( sectionTitle );

		$http(
		{
			method: 'GET',
			url: apiUrl + sectionTitle + '.json'
		} ).then( function( response )
		{
			$scope.indexContents = response.data;
		} );
	}

	// Fetch index contents on controller load, based on section parameter
	switch( $scope.stateParams.section )
	{
		// Morphosis
		case 'about':

			// Populate with different content based on sortingType parameter
			switch( $scope.stateParams.sortingType )
			{
				case 'media':
				$scope.getResource( 'media' );
				break;

				case 'people':
				$scope.getResource( 'people' );
				break;

				case 'awards':
				$scope.getResource( 'awards' );
				break;
			}
			break;

		// News
		case 'news':
		$scope.getResource( 'news' );
		break;

		// Search
		case 'search':
		$scope.altIndexSection = true;
		$http( 
		{
			method: 'GET',
			url: apiUrl + 'search',
			params: { q: $scope.stateParams.s }
		} ).then( function( response )
		{
			$scope.indexContents = response.data;
		} );
		break;

		// Projects
		default:
		$scope.indexContents = Project.query(  );
		break;
	}

	// Fire API calls for separate 'about' section resources
	$scope.$on('$locationChangeSuccess', function(event)
	{ 
		// Update stateParams
		$scope.stateParams = $state.params;
		
		if ( $scope.stateParams.section === 'about' && !$scope.stateParams.q && !$location.hash() )
		{			

			// Clear indexContents
			$scope.indexContents = [  ];

			switch ( $scope.stateParams.sortingType )
			{
				case 'awards':
				$scope.getResource( 'awards' );
				break;

				case 'people':
				$scope.getResource( 'people' );
				break;

				case 'media':
				$scope.getResource( 'media' );
				break;
			}
		}
	});

} );
