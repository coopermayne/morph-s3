'use strict';

var sectionState = angular.module( 'sectionState' );

sectionState.controller( 'SectionStateController', function( $rootScope, $scope, $state, $stateParams, Project, $http, $location, $anchorScroll, $timeout, $filter )
{

	$scope.indexContents = [  ];

	// Remove baguetteBox from page on back button click (from project page)
	angular.element(document.querySelectorAll('#baguetteBox-overlay')).remove();

	// Default to tile index
	$scope.altIndexSection = false;

	// Function for scrolling to expanded item
	$scope.scrollToExpanded = function(  )
	{	
		var el = document.getElementById( $scope.stateParams.e );
		var elScr = el.getBoundingClientRect().top;
		document.body.scrollTop = elScr;

	}

	$scope.getPage = function( dir )
	{
		if ( !$scope.stateParams.p )
		{
			$scope.stateParams.p = 0;
		}

		switch( dir )
		{

			case 'prev':
			if( $scope.stateParams.p > 0 )
			{
				$scope.stateParams.p--;
			}
			else
			{
				$scope.stateParams.p = 0;
			}
			$state.go( $state.current.name, $scope.stateParams );
			break;

			case 'next':
			$scope.stateParams.p++;
			$state.go( $state.current.name, $scope.stateParams );
			break;
		}
	}

	$scope.switchSubSort = function( sort )
	{
		if ( sort == 'date' )
		{
			$scope.reverseVar = true;

			switch( $scope.stateParams.sortingType )
			{
				//case 'awards':
				//$scope.subSort = 'year';
				//break;

				case 'media':
				$scope.stateParams.sub = 'pub_date';
				$scope.stateParams.p = null;
				$state.go( $state.current.name, $scope.stateParams );
				break;

				case 'type':
				case 'year':
				case 'now institute':
				$scope.subSort = 'superdate';
				break;

				case 'a-z':
				$scope.subSort = 'title';
				$scope.reverseVar = false;
				break;

				case 'people':
				$scope.subSort = 'last_name';
				$scope.reverseVar = false;

				default:
				if( $scope.stateParams.section == "news" )
				{
					$scope.subSort = "created_at";
				}
				else if ( $scope.stateParams.section == "search" )
				{
					$scope.subSort = "rank";
					$scope.reverseVar = false;
				}
			}
		}
		else if ( sort === 'title' )
		{
			if ( $scope.stateParams.sortingType === 'media' )
			{
				$scope.subSort = null;
				$scope.stateParams.sub = 'title';
				$scope.stateParams.p = null;
				$state.go( $state.current.name, $scope.stateParams );
			}
			else
			{			
				$scope.subSort = sort;
				$scope.reverseVar = false;
			}
		}

		$scope.stateParams.sub = $scope.subSort;
	}

	// Wait for API response (and DOM to load) before scrolling to expanded item
	$scope.$watchCollection( 'indexContents', function(  )
	{
		if( $scope.indexContents.length != 0 )
		{
			placeMarkers();
		}
		else
		{
			if ( $scope.stateParams.sortingType !== 'media' )
			{
				// Sort items by date on indexContents load
				if ( $scope.stateParams.sub )
				{
					$scope.subSort = $scope.stateParams.sub;
				}
				else
				{
					$scope.switchSubSort( 'date' );
				}
			}
		}
	} );

	// Search + Media project page routing
	$scope.resolveClick = function( item )
	{
		switch( item.searchable_type )
		{
			case 'Person':
			case 'Project':
			$state.go( 'root.section-state.project-state', { section: $scope.stateParams.section, projectId: item.searchable_id, m: item.searchable_type.toLowerCase(  ) } );
			break;

			default:
			$state.go( 'root.section-state.sorting-state', { section: item.section, sortingType: item.sorting_type, e: item.searchable_id, s: null, m: null } );
			break;
		}
	}

	// Toggle 'e' parameter on alt index entry click
	$scope.resolveAltIndexClick = function( id )
	{
		if ( $scope.stateParams.e !== id )
		{
			$state.go( $state.current.name, { e: id } );
		}
		else
		{
			$state.go( $state.current.name, { e: null } );
		}
	}


//------------------------------------------------------------  end map

console.log( 'SectionStateController active!' );

$scope.stateName = 'section-state';

$scope.sortingType = $stateParams.sortingType;

$scope.stateParams = $state.params;

$scope.altIndexSection = false;
$scope.locIndex = false;

$scope.setAltIndex = function( input )
{
	if ( 'media, search, research, news'.indexOf( input ) != -1 )
	{
		$scope.altIndexSection = true;
	}
	else
	{
		$scope.altIndexSection = false;
	}

	if ( 'location'.indexOf( input ) !== -1 )
	{
		$scope.locIndex = true;
	}
	else
	{
		$scope.locIndex = false;
	}
}

var apiUrl = 'https://morphosisapi.herokuapp.com/';

	// Function for fetching non-project resources from API
	$scope.getResource = function( sectionTitle )
	{
		$scope.setAltIndex( sectionTitle );

		$scope.throbberOn = true;

		$http(
		{
			method: 'GET',
			url: apiUrl + sectionTitle + '.json'
		} ).then( function( response )
		{
			$scope.indexContents = response.data;
			$timeout( function(  )
			{
				$scope.throbberOn = false;
			}, 500 )
		} );
	}

	$scope.getMediaResource = function( params )
	{
		if(params.q)
			{
				$scope.setAltIndex( params.sortingType );
				$scope.throbberOn = true;

				$http(
					{
						method: 'GET',
						url: apiUrl + 'media.json',
						params:
							{
								p: params.p,
								q: params.q, 
								sub: params.sub
							}
					} ).then( function( response )
					{
						$scope.isPrev = !( response.data.currentPage == 0 );
						$scope.isNext = response.data.totalPages > response.data.currentPage;
						$scope.indexContents = response.data.results;
						$scope.pageArray = [  ];
						for ( var i = 0; i <= response.data.totalPages; i++ )
						{
							$scope.pageArray.push( i );
						}
						$scope.throbberOn = false;

					} );
			}
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
				$scope.getMediaResource( $scope.stateParams );
				$scope.subSort = $scope.stateParams.sub || "pub_date";
				break;

				case 'people':
				$scope.getResource( 'people' );
				break;

				//case 'awards':
				//$scope.getResource( 'awards' );
				//break;
			}
			break;

		// News
		case 'news':
		$scope.getResource( 'news' );
		break;

		// Search
		case 'search':
		$scope.altIndexSection = true;
		$scope.throbberOn = true;
		$http( 
		{
			method: 'GET',
			url: apiUrl + 'search.json',
			params: { q: $scope.stateParams.s }
		} ).then( function( response )
		{
			$scope.indexContents = response.data;
			$scope.throbberOn = false;
		} );
		break;

		// Projects
		default:
		$scope.throbberOn = true;
		$scope.indexContents = Project.query(  );
		$scope.indexContents.$promise.then( function( results )
		{
			$scope.throbberOn = false;
		})
		break;
	}

	// Fire API calls for separate 'about' section resources
	$scope.$on( '$locationChangeSuccess', function( event, newState, oldState )
	{ 

		// Update stateParams to fix 'back' button index bug
		switch( $scope.stateParams.section )
		{
			case 'about':
			$scope.stateParams = $state.params;
			break;

			default:
			$scope.stateParams = $state.params;
			
			$timeout(function()
			{
				$scope.stateParams = $state.params;
				$scope.switchSubSort('date');

			});
		}

	    if ( $scope.stateParams.section === 'about' && !$scope.stateParams.e )
	    {			

			// Clear indexContents
			$scope.indexContents = [  ];

			// Update indexContents
			switch ( $scope.stateParams.sortingType )
			{
				//case 'awards':
				//$scope.getResource( 'awards' );
				//break;

				case 'people':
				$scope.getResource( 'people' );
				break;

				case 'media':
				$scope.getMediaResource( $scope.stateParams );
				$scope.subSort = $scope.stateParams.sub || "pub_date";
				break;
			}
		}

		if ( $scope.stateParams.sortingType !== 'media' )
		{	
			// Update subSort on section and sortingType change
			if ( $scope.stateParams.sub )
			{
				$scope.subSort = $scope.stateParams.sub;
			}
			else
			{
				$scope.switchSubSort( 'date' );
			}
		}
	} );

	$scope.$on( '$stateChangeSuccess', function( event )
	{
		// if ( $scope.previousState.name === 'root.section-state.project-state' && !$scope.toParams.projectId && $rootScope.originalIndex )
		// {
		// 	$state.transitionTo( 'root.section-state.sorting-state', $rootScope.originalIndex, { reload: true, inherit: false, notify: true } );
		// }
	} );

} );
