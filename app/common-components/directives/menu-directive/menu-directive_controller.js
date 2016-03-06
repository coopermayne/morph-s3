'use strict';

var menuDirective = angular.module( 'menuDirective' );


menuDirective.controller( 'MenuDirectiveController', function( $rootScope, $scope, $state, $stateParams, Menu, screenSize )
{

	// Fetch Menu from API and set video slides
	Menu.get(  ).$promise.then( function( response )
	{
		$scope.menuItems = response;

		$scope.homePageSlides = $scope.menuItems.landing.slides;
	} );


	$scope.stateParams = $stateParams;

	$scope.state = $state;

	$scope.mobile = screenSize.on( 'xs, sm', function( match )
	{
		$scope.mobile = match;
	});

	$scope.setMobileMenuVar = function(  )
	{
		switch( $scope.state.current.name )
		{
			case 'root':
			case 'root.section-state':
			$scope.showMobileMenuVar = true;
			break;

			default:
			$scope.showMobileMenuVar = false;
			break;
		}

		if( $scope.stateParams.section === "news" )
		{
			$scope.showMobileMenuVar = false;
		}
	}

	if( $scope.mobile )
	{
		// Set showMobileMenuVar
		$scope.setMobileMenuVar(  );

		// Update mobileMenuVar
		$scope.$on( '$stateChangeSuccess', function(  )
		{
			$scope.setMobileMenuVar(  );
		} )
	}


	$scope.toggleMobileMenu = function(  )
	{
		$scope.showMobileMenuVar = !$scope.showMobileMenuVar;
	};

	$scope.searchText = $stateParams.s;

	// Update route with search query
	$scope.updateSearch = function( text )
	{
		$state.go( 'root.section-state', { section: "search", s: text } );
	}

	console.log( 'MenuDirectiveController active!' );

} );
