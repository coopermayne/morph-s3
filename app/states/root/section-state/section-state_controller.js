'use strict';

var sectionState = angular.module( 'sectionState' );

sectionState.controller( 'SectionStateController', function( $rootScope, $scope, $state, $stateParams, Project, $http)
{
	console.log( 'SectionStateController active!' );

  $scope.map = {
    center: {
      latitude: 40.1451,
      longitude: -99.6680
    },
    zoom: 4,
    bounds: {},
		gridSize: 60,
		enableRetinaIcons: true,
		doClusterRandomMarkers: true,
		clusteroptions: {
			minimumClusterSize: 2,
			title: 'test title',
			ignoreHidden: true,
			styles: [{
				url: 'images/circle.png',
				textColor: '#FDF955',
				textSize: 40,
				width: 33,
				height: 33,
			}]
		}
  };

	var mapStyles = [
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
			"featureType": "water",
			"elementType": "geometry",
			"stylers": [{
				"color": "#ffffff"
			}, {
				"lightness": 17
			}]
		}
	]

  $scope.options = {
    scrollwheel: false,
    mapTypeControl: false,
    styles: mapStyles
  };

	$scope.markers = [];

	$scope.myEvents= {
		mouseover: function(){
			console.log('hover');
		},
		mouseout: function(){
			console.log('mouseout');
		},
		click: function(e, evnentName, model){
			console.log('click');
			model.show = !model.show
		}
	};

	setTimeout(function(){
		$scope.placeMarkers()
	}, 2000)

	$scope.placeMarker = function(item){
		var m = {
			id: parseInt(item.id),
			title: item.title,
			image: item.image.name.url,
			latitude: parseFloat(item.lat),
			longitude: parseFloat(item.lon),
			icon: "images/circle.svg",
			show: false
		}
		$scope.markers.push(m)
	}

	$scope.placeMarkers = function(){
		angular.forEach($scope.indexContents, function(item){
			if(item.lon && item.lat){
				$scope.placeMarker(item)
			}
		})
	}

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
              $scope.locIndex = false
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
        $scope.getResource( 'media' )
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

               if ( $scope.stateParams.section === 'about' && !$scope.stateParams.q )
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
