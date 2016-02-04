'use strict';

var menuDirective = angular.module( 'menuDirective' );


menuDirective.controller( 'MenuDirectiveController', function( $rootScope, $scope, $state, $stateParams, Menu, screenSize )
{

	$scope.menuItems = Menu.get(  );

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

	// Initialize as false
	// $scope.displaySorting = $stateParams.q;

	// $scope.toggleSort = function( input ) {
	// 	if ( $scope.displaySorting ) {
	// 		$scope.displaySorting = false;
	// 		// $stateParams.q = null;
	// 	} else {
	// 		// $scope.displaySorting = input;
	// 		$stateParams.sortingType = input.toLowerCase();

	// 	}
	// };


	console.log( 'MenuDirectiveController active!' );

} );
