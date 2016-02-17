'use strict';

var menuDirective = angular.module( 'menuDirective' );


menuDirective.controller( 'MenuDirectiveController', function( $rootScope, $scope, $state, $stateParams, Menu, screenSize )
{

	Menu.get(  ).$promise.then( function( response )
	{
		$scope.menuItems = response;

		$scope.homePageSlides = $scope.menuItems.landing.slides;
	} );


	$scope.stateParams = $stateParams;

	$scope.state = $state;

	$scope.slideShowImage;

	$scope.changeSlideShow = function( url )
	{
		$scope.slideShowImage = url;
	}

	$scope.isMobile = function(  )
	{
		return screenSize.is( 'xs', 'sm' );
	};

	$scope.showMobileMenuVar = false;

	$scope.toggleMobileMenu = function(  )
	{
		$scope.showMobileMenuVar = !$scope.showMobileMenuVar;
	};

	$scope.searchText;

	$scope.updateSearch = function( text )
	{
		$state.go( 'root.section-state', { section: "search", sortingType: '', q: text } );
	}

	console.log( 'MenuDirectiveController active!' );

} );
