'use strict';

var projectState = angular.module( 'projectState' );

projectState.controller( 'ProjectStateController', function( $rootScope, $scope, $state, $stateParams, Project, $interval, $http, screenSize, $timeout )
{

	//helper method
	$scope.printAddress = function(it){
		if(it.address){
			return it.address
		} else {
			var loc_comps = [it.city, it.state, it.country]
			var res = []
			angular.forEach(loc_comps, function(value){
				if(value){
					res.push(value)
				}
			})
			return res.join(", ")
		}
	}

	$scope.pageLoaded = false

	$scope.stateParams = $state.params;

	// Save original index for modal 'close' button purposes
	$scope.$on( '$stateChangeSuccess', function( event, toState, toParams, fromState, fromParams )
	{
		if ( fromState.name === 'root.section-state.sorting-state' || fromParams.section === 'search' )
		{ 
			$rootScope.originalIndex = {
				section: fromParams.section,
				sortingType: fromParams.sortingType,
				q: fromParams.q, 
				s: fromParams.s,
				e: fromParams.e,
				p: fromParams.p,
				m: null
			}
			console.log( 'originalIndex:', $rootScope.originalIndex );
		}
	});

	$scope.mobile = screenSize.on( 'xs', function( match )
	{
		$scope.mobile = match;
	});

	// Zipped-up Morphosis team (project credits)
	$scope.showMorphTeam = false;

	// 'People' or 'Project' layout?
	switch( $scope.stateParams.section )
	{
		case 'search':
		case 'about':
			if( $scope.stateParams.m === "person" )
			{
				$http(
				{
					method: 'GET',
					url: 'https://morphosisapi.herokuapp.com/people/' + $scope.stateParams.projectId + '.json'
				} ).then( function( response )
				{
					$scope.activeItem = response.data;
				} );
			}
			else
			{
				Project.get( { id: $scope.stateParams.projectId } ).$promise.then( function( response )
				{

					$scope.activeItem = response.result;
				} );
			}
		break;

		default:
			$scope.throbberOn = true;
			Project.get( { id: $scope.stateParams.projectId } ).$promise.then( function( response )
			{
				$scope.activeItem = response.result;
				$scope.throbberOn = false;
			} );
		break;
	}

	$scope.stateName = 'section-state.project-state';

	console.log( 'ProjectStateController active!' );

	$scope.closeProject = function(  )
	{
		var originalIndex = $rootScope.originalIndex;
		if ( originalIndex )
		{
			$state.transitionTo( 'root.section-state.sorting-state', originalIndex, { reload: true, inherit: false, notify: true } );

			// Clear originalIndex
			$rootScope.originalIndex = null;
		}
		else
		{
			$state.go( '^' );
		}
	}

  var scrollscroll;
  var vel = 0;
  var theDelay = 10;

  $scope.stopScroll = function(){
    $interval.cancel(scrollscroll)
    vel = 0
  }

  $scope.scrollLeft = function(e){

    var p = e.target.parentNode.parentNode;
    var imageGallery = p.getElementsByClassName( 'image-gallery-section' )[ 0 ];

    scrollscroll = $interval(function(){
      if(vel < 3 ){
        vel = vel + 0.05
      }
      imageGallery.scrollLeft -= vel;
    }, theDelay )
  }

  $scope.scrollRight = function(e){

    var p = e.target.parentNode.parentNode;
    var imageGallery = p.getElementsByClassName( 'image-gallery-section' )[ 0 ];

    scrollscroll = $interval(function(){
      if(vel < 3 ){
        vel = vel + 0.05
      }
      imageGallery.scrollLeft += vel;
    }, theDelay )
  }

	// var isLeft;
	// var velocity;

	// $scope.startScroll = function( event )
	// {		
	// 	var imageGalleryWrapper = document.getElementsByClassName( 'image-gallery-section-wrapper' )[ 0 ];

	// 	var imageWrapperX = imageGalleryWrapper.getBoundingClientRect(  ).left;
	// 	var imageWrapperMiddle = imageGalleryWrapper.offsetWidth / 2;
	// 	var mouseX = event.pageX;
	// 	var posX = mouseX - imageWrapperX;
	// 	var imageGallery = event.currentTarget.getElementsByClassName( 'image-gallery-section' )[ 0 ];

	// 	isLeft = posX < imageWrapperMiddle;

	// 	if ( isLeft )
	// 	{
	// 		velocity = 50 / -2
	// 	}
	// 	else
	// 	{
	// 		velocity = 50 / 2
	// 	}

	// 	$scope.scrollInterval = $interval( function(  )
	// 	{
	// 		imageGallery.scrollLeft += velocity;
	// 	}, 50 );
	// }

	// $scope.updateScroll = function( event )
	// {
	// 	$interval.cancel( $scope.scrollInterval );
	// 	$scope.startScroll( event );
	// }

	// $scope.stopScroll = function(  )
	// {
	// 	$interval.cancel( $scope.scrollInterval );
	// }


} );
