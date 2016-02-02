'use strict';

var menuDirective = angular.module( 'menuDirective' );


menuDirective.controller( 'MenuDirectiveController', function( $rootScope, $scope, $state, $stateParams, Menu )
{

	$scope.menuItems = Menu.query();

	$scope.stateParams = $stateParams;

	// Initialize as false
	$scope.displaySorting = $stateParams.q;

	$scope.toggleSort = function( input ) {
		if ( $scope.displaySorting ) {
			$scope.displaySorting = false;
			// $stateParams.q = null;
		} else {
			// $scope.displaySorting = input;
			$stateParams.sortingType = input.toLowerCase();

		}
	};


	console.log( 'MenuDirectiveController active!' );

} );
