'use strict';

var sectionState = angular.module( 'sectionState' );

sectionState.controller( 'SectionStateController', function( $rootScope, $scope, $state, $stateParams, Project, $http)
{

//----------------------------------------  begin map
$scope.center = {
	lat: 52,
	lng: 13,
	zoom: 3
}

$scope.markers = []

var placeMarkers = function(){
	angular.forEach($scope.indexContents, function(item, key){
		if(item.lat){
			$scope.markers.push({
				lat: parseFloat(item.lat),
				lng:parseFloat( item.lon ),
				getMessageScope: function(){return $scope},
				focus: false,
				message: "<div ui-sref='root.section-state.project-state( { projectId: "+ item.id +" } )'><h1>"+item.title+"</h1><div class='map-image' preload-bg-image='http://www.fillmurray.com/1800/600'></div</div>",
				compileMessage: true
			})
		}
	})
}

setTimeout(function(){
	placeMarkers()
}, 2000)

//----------------------------------------  end map
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
				//$scope.markers.push( { lat: 52, lng: 13, })
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
