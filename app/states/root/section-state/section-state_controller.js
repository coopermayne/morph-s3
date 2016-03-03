'use strict';

var sectionState = angular.module( 'sectionState' );

sectionState.controller( 'SectionStateController', function( $rootScope, $scope, $state, $stateParams, Project, $http, $location, $anchorScroll, $timeout )
{
	console.log( 'SectionStateController active!' );

	$scope.stateName = 'section-state';

	$scope.sortingType = $stateParams.sortingType;

	$scope.stateParams = $state.params;

	$scope.indexContents = [  ];

	// Default to tile index
	$scope.altIndexSection = false;

	// Function for scrolling to expanded item
	$scope.scrollToExpanded = function(  )
	{
		var el = document.getElementById( $scope.stateParams.e );
		var elScr = el.getBoundingClientRect().top;
		document.body.scrollTop = elScr;
	}

	$scope.switchSubSort = function( sort )
	{
		if ( sort == 'date' )
		{
			$scope.reverseVar = true;

			switch( $scope.stateParams.sortingType )
			{
				case 'awards':
				$scope.subSort = 'year';
				break;

				case 'media':
				$scope.subSort = 'pub_date';
				break;

				case 'type':
				case 'year':
				$scope.subSort = 'superdate';
				break;

				case 'a-z':
				$scope.subSort = 'title';
				$scope.reverseVar = false;
				break;

				default:
				if( $scope.stateParams.section == "news" )
				{
					$scope.subSort = "created_at";
				}
			}
		}
		else
		{
			$scope.subSort = sort;
			$scope.reverseVar = false;
		}
		console.log( $scope.subSort );
	}

	// Wait for API response (and DOM to load) before scrolling to expanded item
	$scope.$watchCollection( 'indexContents', function(  )
	{
		if( $scope.indexContents.length != 0 && $scope.stateParams.e )
		{
			$timeout( function(  )
			{
				if( $scope.stateParams.e )
				{
					$scope.scrollToExpanded(  );
				}
			}, 0 );
		}
		else
		{
			$scope.switchSubSort( 'date' );
		}
	} );

	// Check which index layout to load
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

	// Function for fetching non-project resources from API
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
			console.log( $scope.indexContents );
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
		
		if ( $scope.stateParams.section === 'about' && !$scope.stateParams.q && !$scope.stateParams.e )
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

		$scope.switchSubSort( 'date' );
	});

} );
