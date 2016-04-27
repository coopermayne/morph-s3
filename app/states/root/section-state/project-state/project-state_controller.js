'use strict';

var projectState = angular.module( 'projectState' );

projectState.controller( 'ProjectStateController', function( $window, $rootScope, $scope, $state, $stateParams, Project, $interval, $http, screenSize, $timeout )
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

	$scope.min = function(arr) {
		return $filter('min')
		($filter('map')(arr, 'year'));
	}

	$scope.pageLoaded = false;

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
				sub: fromParams.sub,
				m: null
			}
		}
	});

	screenSize.rules = {
		superSmall: '(max-width: 500px)',

	};

	$scope.mobile = screenSize.on( 'superSmall', function( match )
	{
		$scope.mobile = match;
	});

	// Zipped-up Morphosis team and consultants(project credits)
	$scope.showMorphTeam = false;
	$scope.showConsultants = false;

	//open background tab for linky things
	$scope.backgroundTab = function(url){
		if (url.length) 
		{
			$window.open(url, '_blank');
		}
	}

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
	var theDelay = 16;

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

	$scope.checkItemLength = function( string, maxChar )
	{
		if ( string.length > maxChar ) { return true; }
		else { return false; }
	}


} );
