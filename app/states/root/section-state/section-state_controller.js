'use strict';

var sectionState = angular.module( 'sectionState' );

sectionState.controller( 'SectionStateController', function( $rootScope, $scope, $state, $stateParams, Project, $http, $location, $anchorScroll, $timeout, $filter, leafletBoundsHelpers )
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
			console.log($scope.stateParams)
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
		if( $scope.indexContents && $scope.indexContents.length != 0 )
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


//BEGIN MAP------------------------------------------------------


var default_place = {
	zoom: 2,
	lat: 0,
	lng: 0
}

//var place_d = {
	//asia: {
		//zoom: 4,
		//lat: 36,
		//lng: 131
	//}, 
	//europe: {
		//zoom: 4,
		//lat: 49,
		//lng: 16
	//}, 
	//america: {
		//zoom: 4,
		//lat: 29,
		//lng: -84
	//}
//}

$scope.center = $scope.center || angular.copy(default_place)

$scope.defaults = {
	minZoom: 2,
}

var mapStyles =
[
{
	"featureType": "all",
	"elementType": "labels",
	"stylers": [{
		"visibility": "off"
	}, {
		"lightness": "-100"
	}]
}, {
	"featureType": "all",
	"elementType": "labels.text.fill",
	"stylers": [{
		"saturation": 36
	}, {
		"color": "#000000"
	}, {
		"lightness": 40
	}]
}, {
	"featureType": "all",
	"elementType": "labels.text.stroke",
	"stylers": [{
		"visibility": "on"
	}, {
		"color": "#000000"
	}, {
		"lightness": 16
	}]
}, {
	"featureType": "all",
	"elementType": "labels.icon",
	"stylers": [{
		"visibility": "off"
	}]
}, {
	"featureType": "administrative",
	"elementType": "geometry.fill",
	"stylers": [{
		"color": "#000000"
	}, {
		"lightness": 20
	}]
}, {
	"featureType": "administrative",
	"elementType": "geometry.stroke",
	"stylers": [{
		"color": "#000000"
	}, {
		"lightness": 17
	}, {
		"weight": 1.2
	}, {
		"visibility": "off"
	}]
}, {
	"featureType": "administrative",
	"elementType": "labels",
	"stylers": [{
		"visibility": "simplified"
	}, {
		"color": "#ffffff"
	}]
}, {
	"featureType": "administrative.country",
	"elementType": "labels",
	"stylers": [{
		"visibility": "off"
	}]
}, {
	"featureType": "administrative.province",
	"elementType": "labels",
	"stylers": [{
		"visibility": "off"
	}]
}, {
	"featureType": "administrative.locality",
	"elementType": "geometry.stroke",
	"stylers": [{
		"visibility": "off"
	}]
}, {
	"featureType": "administrative.locality",
	"elementType": "labels",
	"stylers": [{
		"visibility": "simplified"
	}, {
		"weight": "1.83"
	}]
}, {
	"featureType": "administrative.locality",
	"elementType": "labels.icon",
	"stylers": [{
		"visibility": "simplified"
	}]
}, {
	"featureType": "administrative.neighborhood",
	"elementType": "labels",
	"stylers": [{
		"visibility": "off"
	}]
}, {
	"featureType": "administrative.land_parcel",
	"elementType": "labels",
	"stylers": [{
		"visibility": "off"
	}]
}, {
	"featureType": "landscape",
	"elementType": "geometry",
	"stylers": [{
		"color": "#000000"
	}, {
		"lightness": "-100"
	}]
}, {
	"featureType": "poi",
	"elementType": "all",
	"stylers": [{
		"visibility": "off"
	}]
}, {
	"featureType": "poi",
	"elementType": "geometry",
	"stylers": [{
		"color": "#000000"
	}, {
		"lightness": 21
	}]
}, {
	"featureType": "road",
	"elementType": "geometry",
	"stylers": [{
		"visibility": "off"
	}]
}, {
	"featureType": "road",
	"elementType": "labels",
	"stylers": [{
		"visibility": "off"
	}]
}, {
	"featureType": "road.highway",
	"elementType": "geometry.fill",
	"stylers": [{
		"color": "#000000"
	}, {
		"lightness": 17
	}]
}, {
	"featureType": "road.highway",
	"elementType": "geometry.stroke",
	"stylers": [{
		"color": "#000000"
	}, {
		"lightness": 29
	}, {
		"weight": 0.2
	}]
}, {
	"featureType": "road.arterial",
	"elementType": "geometry",
	"stylers": [{
		"color": "#000000"
	}, {
		"lightness": 18
	}]
}, {
	"featureType": "road.local",
	"elementType": "geometry",
	"stylers": [{
		"color": "#000000"
	}, {
		"lightness": 16
	}]
}, {
	"featureType": "transit",
	"elementType": "geometry",
	"stylers": [{
		"color": "#000000"
	}, {
		"lightness": 19
	}]
}, {
	"featureType": "road",
	"elementType": "labels",
	"stylers": [{
		"visibility": "off"
	}]
},{
	"featureType": "water",
	"elementType": "geometry",
	"stylers": [{
		"color": "#ffffff"
	}, {
		"lightness": 17
	}]
}
]

var iconSettings = {
	iconUrl: 'images/circle.svg',
	iconAnchor:   [9, 10],
}

$scope.maxBounds = leafletBoundsHelpers.createBoundsFromArray([[-540, -145], [540, 260]]);

$scope.layers = {
	baselayers: {
		googleRoadmap: {
			name: 'Google Streets',
			layerType: 'ROADMAP',
			type: 'google',
			layerOptions: {
				mapOptions:{
					backgroundColor: '#ffffff',
					styles: mapStyles
				}
			}
		}
	},
	overlays: {
		london: {
			layerOptions: {
				showCoverageOnHover: false,
			},
			name: "adf",
			type: "markercluster",
			visible: true
		}
	}
}

$scope.markers = [  ];

var placeMarkers = function(  )
{
	switch( $scope.stateParams.section )
	{
		case 'architecture':
		$scope.mapContents = $filter( 'filter' )( $scope.indexContents, { section: { title: 'architecture' } } );
		break;

		case 'planning':
		$scope.mapContents = $filter( 'filter' )( $scope.indexContents, { section: { title: 'planning' } } );
		break;
	}

	angular.forEach( $scope.mapContents, function( item, key )
	{
		if( item.lat )
		{
			$scope.markers.push(
			{
				layer: 'london',
				icon: iconSettings,
				lat: parseFloat( item.lat ),
				lng:parseFloat( item.lon ),
				getMessageScope: function(  )
				{ 
					return $scope;
				},
				focus: false,
				message: "<div ui-sref='root.section-state.project-state( { projectId: "+ item.id +" } )'><img class='map-image' src='"+item.image.name.mobile.url+"'></img><div class='project-title'>"+item.title+"</div></div>",
				compileMessage: true
			} );
		}
	} );
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
	$scope.getNewsResource = function( params )
	{
				$scope.throbberOn = true;

				$http(
					{
						method: 'GET',
						url: 'http://localhost:3000/' + 'news.json',
						params:
							{
								p: params.p,
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
		$scope.altIndexSection = true;
		$scope.getNewsResource( $scope.stateParams );
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

			case 'news':
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

		if ( $scope.stateParams.section == 'news' )
		{
			$scope.indexContents = [  ];
			$scope.getNewsResource( $scope.stateParams );
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
