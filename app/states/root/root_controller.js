'use strict';

var root = angular.module( 'root' );

root.controller( 'RootController', function( $rootScope, $scope, $state, $stateParams, $http )
{
	// This is a controller.

	// $scope.stateName = 'root';

	console.log('RootController active!');

	$scope.state = $state;

	$scope.stateParams = $state.params;
	
	$scope.activeTopNav = $state.current.activeTopNav;

	// Get video slides
	$http(
	{
		method: 'GET',
		url: 'https://morphosisapi.herokuapp.com/video_slides.json'
	} ).then( function( response )
	{
		$scope.homePageSlides = response.data;
	} );

	$rootScope.$on( '$stateChangeSuccess', function( event, to, toParams, from, fromParams )
	{
		$rootScope.previousState = from;
	} );

	$rootScope.$on( '$stateChangeStart', function( event, to, toParams, from, fromParams )
	{
		$scope.stateName = to.name;
	} );

} );
