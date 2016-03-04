'use strict';

var sectionState = angular.module( 'sectionState' );

sectionState.controller( 'SectionStateController', function( $rootScope, $scope, $state, $stateParams, Project, $http, $location, $anchorScroll, $timeout, $filter )
{


	$scope.indexContents = [  ];

	// Default to tile index
	$scope.altIndexSection = false;

	$scope.expandProject = function( id )
	{
		$state.go( 'root.section-state.sorting-state', { e: id } );
	}

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
				case 'now institute':
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
				else if ( $scope.stateParams.section == "search" )
				{
					$scope.subSort = "rank";
					$scope.reverseVar = false;
				}
			}
		}
		else
		{
			$scope.subSort = sort;
			$scope.reverseVar = false;
		}
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
			// Sort items by date on indexContents load
			$scope.switchSubSort( 'date' );
		}
	} );

	// Search project page routing
	$scope.resolveSearchClick = function( item )
	{
		switch( item.searchable_type )
		{
			case 'Person':
			case 'Project':
			$state.go( 'root.section-state.project-state', { projectId: item.searchable_id, m: item.searchable_type.toLowerCase(  ) } );
			break;

			default:
			$state.go( 'root.section-state.sorting-state', { section: item.section, sortingType: item.sorting_type, e: item.uid, s: null, m: null } );
			break;
		}
	}


//BEGIN MAP------------------------------------------------------
	$scope.center = {
		lat: 52,
		lng: 13,
		zoom: 3
	}

	var iconSettings = {
		iconUrl: 'images/circle.svg',
		iconAnchor:   [9, 10],
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

	$scope.layers = {
		baselayers: {
			googleRoadmap: {
				name: 'Google Streets',
				layerType: 'ROADMAP',
				type: 'google',
				layerOptions: {
					mapOptions:{
						styles: mapStyles
					}
				}
			}
		}
	}

	$scope.markers = [  ];

	var placeMarkers = function(  )
	{
		switch( $scope.stateParams.section )
		{
			case 'architecture':
				$scope.indexContents = $filter( 'filter' )( $scope.indexContents, { section: { title: 'architecture' } } );
			break;

			case 'urban':
				$scope.indexContents = $filter( 'filter' )( $scope.indexContents, { section: { title: 'urban' } } );
			break;
		}

		angular.forEach( $scope.indexContents, function( item, key )
		{
			if( item.lat )
			{
				$scope.markers.push(
				{
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

	$timeout( function(  )
	{
		placeMarkers(  )
	}, 2000 );

//------------------------------------------------------------  end map

	console.log( 'SectionStateController active!' );

	$scope.stateName = 'section-state';

	$scope.sortingType = $stateParams.sortingType;

	$scope.stateParams = $state.params;

	$scope.altIndexSection = false;
	$scope.locIndex = false;

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

		if ( 'location'.indexOf( input ) !== -1 )
		{
			$scope.locIndex = true;
		}
		else
		{
			$scope.locIndex = false;
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
			url: apiUrl + 'search.json',
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
		
		if ( $scope.stateParams.section === 'about' && !$scope.stateParams.q && !$scope.stateParams.e )
		{			

			// Clear indexContents
			$scope.indexContents = [  ];

			// Update indexContents
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

		// Update subSort on section and sortingType change
		$scope.switchSubSort( 'date' );
	});

} );
